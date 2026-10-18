import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { closeAfterApproval } from '../src/js/window-close-policy.js';

test('failed approved close restores future close protection', async () => {
  let approved = false;
  const failure = new Error('close failed');

  await assert.rejects(
    closeAfterApproval(
      async () => {
        assert.equal(approved, true);
        throw failure;
      },
      (value) => { approved = value; },
    ),
    failure,
  );

  assert.equal(approved, false);
});

test('successful approved close retains the deliberate close-event bypass', async () => {
  let approved = false;

  await closeAfterApproval(
    async () => {
      assert.equal(approved, true);
    },
    (value) => { approved = value; },
  );

  assert.equal(approved, true);
});

test('window close grants the JS destroy that Tauri delegates the native close to', async () => {
  const [capabilitiesText, mainSource] = await Promise.all([
    readFile(new URL('../src-tauri/capabilities/default.json', import.meta.url), 'utf8'),
    readFile(new URL('../src/js/main.js', import.meta.url), 'utf8'),
  ]);
  const capabilities = JSON.parse(capabilitiesText);

  // Tauri prevents the native close as soon as a JS close-requested listener is
  // registered and leaves the actual teardown to the webview, so the approved
  // close finishes through `window.destroy()` inside @tauri-apps/api. When that
  // command is not granted the request is rejected silently and the window can
  // never be closed from the title bar or File > Quit.
  assert.match(mainSource, /getCurrentWindow\(\)\.onCloseRequested\(/);
  assert.match(mainSource, /event\.preventDefault\(\)/);
  assert.ok(
    capabilities.permissions.includes('core:window:allow-destroy'),
    'core:window:allow-destroy is required by onCloseRequested',
  );
});

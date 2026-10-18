# MDViewer+ for Windows

面向 Windows 10/11 的离线 Markdown 查看器与编辑器，基于 Tauri 2、CodeMirror 6，
以及一套 Lite/Full 共用的源码树构建。

[English](README.md) | 简体中文

## 版本（Editions）

**推荐下载 Full 版本。** Lite 版本面向希望安装包最小、且只使用显式选定预览语言的用户。

| 能力 | Lite | Full |
|---|---:|---:|
| 编辑、实时预览、主题、打印 | 是 | 是 |
| 聚焦感知的查找、当前文件夹的快速打开、大纲 | 是 | 是 |
| 可选的只读文件夹导航器 | 是 | 是 |
| 安全的内部 Markdown 链接与原生文件夹刷新 | 是 | 是 |
| 脚注、GitHub 提示块（alerts）、任务列表 | 是 | 是 |
| 图片查看与代码块控制 | 是 | 是 |
| 预览高亮 | 定制 Prism：Bash、CSS、HTML、JavaScript/TypeScript、JSON、Python、Rust、Swift | 懒加载 highlight.js 的广泛语言集 |
| YAML frontmatter 卡片 | 否 | 懒加载，受限的 js-yaml |
| 可平移/缩放的 Mermaid | 否 | 懒加载，完整的离线 Mermaid ESM |

两个版本使用相同的产品标识、可执行文件、安装目录和 Markdown 文件关联。安装或修复其中一个
版本会替换掉另一个。**帮助 > 关于 MDViewer+** 会显示已安装的版本类型和版本号。

## 功能（Features）

- 查看、分栏和编辑三种模式
- 带双向滚动同步的实时预览
- 串行化、脏状态安全的新建/打开/重新加载/导航/内部链接操作
- 当前文件夹内的同级文件导航、快速打开与原生事件刷新
- 可选的、仅在本机运行的文件夹导航器，支持懒展开与定位当前文件
- 从资源管理器拖放：拖入 Markdown 文件会在窗口中打开，拖入文件夹会成为
  文件夹导航器的根目录
- 编辑器 CodeMirror 搜索，以及无依赖的预览搜索
- 可搜索的临时文档大纲，支持重复标题与 Unicode 标题锚点
- GFM 表格、任务列表、提示块与可访问的脚注
- 仅在本机加载栅格图片，支持缩放、平移、适应窗口和原始尺寸查看
- 预览代码标签、精确源码复制、自动换行与有边界的行号
- 系统/浅色/深色外观，配以精选的语义化配色
- 仅 Full 版本提供的懒加载 Mermaid、svg-pan-zoom、highlight.js 和 YAML 元数据

## 文件夹导航器（Folder Navigator）

选择 **文件 > 打开文件夹…** 以授权一个文件夹，然后使用
**查看 > 文件夹导航器**、其工具栏按钮或 `Ctrl+Shift+B`。导航器默认隐藏，会记住
180–420 像素的宽度（默认 240），并且只显示 Markdown 文件（`md`、`markdown`、`mdown`
和 `mkd`）。在树中可使用 Up、Down、Left、Right、Home、End、Enter 和 Space 键。
展开是懒加载的，上限为 12 层、500 个直接子项和 5,000 个已加载节点。该功能只读且完全
离线；打开树中的文件时仍会保留现有的未保存更改确认。

## 安全模型（Security model）

- Marked 的输出在插入预览**之前**先由固定版本的 DOMPurify 净化。
- Mermaid SVG 使用独立的、限制严格的 SVG 净化器。脚本、事件处理器、`foreignObject`、
  导航、外部资源、不安全的 CSS URL、动画和嵌入式内容都会被移除。
- CSP 仅允许自托管脚本；连接、框架、对象、base 导航、表单、Worker 和媒体均被禁用。
- 不使用 CDN、运行时下载、远程图片、`eval` 或内联脚本。
- Tauri 不暴露宽泛的文件系统或 shell 能力。原生命令会校验 Markdown 扩展名、URL
  协议、规范路径、文件类型、资源大小、路径穿越、编码后的路径穿越以及符号链接逃逸。
- 本地图片以有大小上限的栅格字节读取，并通过可撤销的 blob URL 显示。SVG 文件不被
  接受为 Markdown 图片资源。
- 当前文档监视器是非递归的；单独授权后启用的导航器监视器是递归的。两者均带防抖、
  做代数校验，并在其上下文变化或窗口关闭时停止。
- 显式授权的文件夹导航器是只读的。它会排除隐藏项、包目录、符号链接和不支持的条目；
  只加载已展开的文件夹；并限制深度、直接子项数、已加载节点数和原生响应大小。

详细的信任边界见 [docs/security.md](docs/security.md)。

## 键盘快捷键（Keyboard shortcuts）

| 操作 | 快捷键 |
|---|---|
| 新建 | `Ctrl+N` |
| 打开 | `Ctrl+O` |
| 快速打开当前文件夹 | `Ctrl+K` |
| 保存 / 另存为 | `Ctrl+S` / `Ctrl+Shift+S` |
| 重新加载 | `Ctrl+R` |
| 上一个 / 下一个 Markdown 文件 | `Ctrl+Alt+Left` / `Ctrl+Alt+Right` |
| 查找 / 下一个 / 上一个 | `Ctrl+F` / `F3` / `Shift+F3` |
| 文档大纲 | `Ctrl+Shift+O` |
| 切换文件夹导航器 | `Ctrl+Shift+B` |
| 粗体 / 斜体 / 格式化链接 | `Ctrl+B` / `Ctrl+I` / `Ctrl+Shift+K` |
| 切换视图模式 | `Ctrl+E` |
| 打印 | `Ctrl+P` |
| 放大 / 缩小 / 重置 | `Ctrl++` / `Ctrl+-` / `Ctrl+0` |
| 系统 / 浅色 / 深色外观 | `Ctrl+Shift+0` / `Ctrl+Shift+1` / `Ctrl+Shift+2` |
| 帮助 | `F1` |

## 帮助与支持（Help and support）

打开 **帮助 > MDViewer+ 帮助** 查看快捷键与支持信息，或打开
**帮助 > 关于 MDViewer+** 查看已安装的版本类型、版本号和版权信息。

- [网站与文档](https://trsdn.github.io/mdviewerplus-windows/)
- [源码仓库](https://github.com/trsdn/mdviewerplus-windows)
- [报告问题](https://github.com/trsdn/mdviewerplus-windows/issues/new)

Copyright © 2026 Torsten Mahr.

## 安装（Install）

发布产物命名如下：

- `MDViewerPlus-Full-Windows-x64-Setup.exe`
- `MDViewerPlus-Full-Windows-x64.msi`
- `MDViewerPlus-Lite-Windows-x64-Setup.exe`
- `MDViewerPlus-Lite-Windows-x64.msi`
- 每个安装包对应一个 `.sha256` 文件
- 各版本专属的第三方声明

### 未签名安装包声明（Unsigned installer disclosure）

安装包目前是**未签名**的。Windows 可能会显示 SmartScreen 警告。请仅从本仓库的
Releases 页面下载，并核对随附的 SHA-256 文件。本项目不声称使用 Authenticode 签名。

## 构建与测试（Build and test）

依赖要求：Node.js 22.22.2+、稳定的 Rust；在 Windows 上还需要安装了 C++ 工作负载的
Visual Studio Build Tools 2022。

```bash
npm ci
npm test
cargo test --manifest-path src-tauri/Cargo.toml --locked
```

`npm test` 会对两个版本执行干净构建、审计和测试。单独的前端命令为：

```bash
npm run build:frontend:lite
npm run build:frontend:full
npm run audit:artifacts
npm run measure:builds
```

Windows 安装包构建：

```powershell
npm run build:installer:lite
npm run build:installer:full
```

安装包输出使用相互隔离的 `src-tauri/target/{lite,full}/release/bundle/` 目录。

## 依赖构成（Dependency membership）

| 依赖 | 公共 | Lite | Full |
|---|---:|---:|---:|
| CodeMirror、marked、marked-footnote、DOMPurify | 是 | 是 | 是 |
| Prism 核心及项目语法 | 否 | 是 | 否 |
| highlight.js | 否 | 否 | 懒加载 |
| js-yaml | 否 | 否 | 懒加载 |
| Mermaid 官方模块化 ESM | 否 | 否 | 懒加载 |
| svg-pan-zoom | 否 | 否 | Mermaid 渲染成功后加载 |

确切的版本、软件包来源、完整性校验和、许可证以及随附的许可证文本生成于
[`docs/third-party-notices-lite.md`](docs/third-party-notices-lite.md) 和
[`docs/third-party-notices-full.md`](docs/third-party-notices-full.md)。

## 体积与验证（Size and validation）

[`docs/build-metrics.json`](docs/build-metrics.json) 记录了确定性的压缩后 Web 资源测量结果。
定制的 Lite Prism 分块被限制在 10 KiB；尽管有轻量化功能预算，DOMPurify 仍被保留，
因为它是强制性的安全边界。Windows 专属安装包、WebView2 性能、空闲监视器以及跨版本
替换检查列于 [docs/release-validation.md](docs/release-validation.md)，并在可行时由发布
工作流自动执行。

以下测量值是 v2.0.1 引入导航器之前的基线：

| 压缩后产物 | Lite | Full |
|---|---:|---:|
| 初始 JavaScript 入口 | 627.0 KiB | 627.2 KiB |
| 所有可懒加载的 JavaScript | 668.1 KiB | 4,228.3 KiB |
| 全部 Web 资源与声明文件 | 743.8 KiB | 4,385.2 KiB |
| Lite Prism 分块 | 9.9 KiB | 不包含 |

初始入口 0.2 KiB 的差异表明：普通的 Full 文档不会急切加载 Full 专属的渲染器包。

## WinGet 状态（WinGet status）

建议的 `Trsdn.MDViewerPlus` 清单已准备在 `packaging/winget/` 下。仅 Full x64
当前用户 NSIS 安装包符合条件。仓库中签入的 SHA-256 是明确的预发布占位符；经人工批准的
工作流会下载不可变的发布产物，写入其真实哈希，并运行 `winget validate`。该工作流仅将
清单作为构建产物上传，不会提交到 `microsoft/winget-pkgs`。

## 许可证（License）

MIT。

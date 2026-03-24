# frontend/docs 索引

## 目的

`platform/frontend/docs/` 是目前前端工程的實作規範區與過渡文件區。
這裡的文件以繁體中文為主要語言，方便你我共同閱讀、討論與修正。

這裡的內容主要承接：

- `platform/frontend/` 的實際 React 工程規則
- 從 Vue legacy 過渡到 React-first 的整理結果
- 未來成熟後可再升級進 `_VibeCore/` 的工程規範

## 文件索引

### 總覽

- [react-first-architecture.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/react-first-architecture.md)
  - React-first 文件入口與閱讀順序

### 架構總覽

- [architecture-overview.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/architecture-overview.md)
  - 說明平台 > 專案 > 模組 為什麼能承接 React

### Project 與 Module 契約

- [project-and-module-contract.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/project-and-module-contract.md)
  - 專案層、模組層、`index.js` 與 `setup` 的責任邊界

### Store 與資料流

- [store-and-data-flow.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/store-and-data-flow.md)
  - store、props、world 註冊與共享資料規則

### Route 與載入

- [route-and-loading.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/route-and-loading.md)
  - `routes.js` 契約、`meta.nav`、同步 import 與 lazy import

### Layout 與 AppShell

- [layout-and-app-shell.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/layout-and-app-shell.md)
  - project `layout/`、`AppShell.jsx`、`App.jsx` 的責任分工

### React 驗證路線圖

- [react-validation-roadmap.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/react-validation-roadmap.md)
  - 目前建議的 React 規則驗證項目與順序

## 與 `_VibeCore/` 的關係

- `_VibeCore/` 是世界層與工程層的正式規範來源
- `platform/frontend/docs/` 是當前前端實作過程中的整理區

未來若這些文件在新 project 驗證後穩定下來，再將成熟內容升級進 `_VibeCore/`。

## 維護規則

- `frontend/docs/index.md` 是這個目錄的單一入口
- 只要 `docs/` 新增文件，就必須同步掛進本索引
- 若新增文件但未登錄在本索引，視為文件維護未完成

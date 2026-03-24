# React-First 架構文件

## 說明

這份文件是 `platform/frontend/docs/` 的閱讀入口。
它不再承擔所有細節，而是負責指出目前 React-first 工程的主要規則與對應文件。

## 閱讀順序

1. [architecture-overview.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/architecture-overview.md)
   說明平台 > 專案 > 模組 如何承接 React。
2. [project-and-module-contract.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/project-and-module-contract.md)
   說明 project、module、`index.js`、`setup` 的結構與責任。
3. [store-and-data-flow.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/store-and-data-flow.md)
   說明 store、props、world 註冊與共享資料流。
4. [route-and-loading.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/route-and-loading.md)
   說明 route、`meta.nav` 與頁面載入策略。
5. [layout-and-app-shell.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/layout-and-app-shell.md)
   說明 project `layout/`、`AppShell.jsx` 與 runtime `App.jsx` 的關係。
6. [react-validation-roadmap.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/react-validation-roadmap.md)
   說明接下來建議驗證的 React 規則項目。

## 目前核心原則

- 前端 active runtime 以 React 為主
- 平台 > 專案 > 模組 的結構保留，React 接手的是渲染層
- project `layout/` 決定專案首頁、頁面骨架與模組擺放方式
- `App.jsx` 只承擔 runtime 入口，不承擔專案頁面組裝
- route 選單資訊統一使用 `meta.nav`
- 父子元件之外的資料傳遞，優先使用 store

## 維護說明

- 若有新文件加入 `frontend/docs/`，必須同步更新 [index.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/index.md)
- 這裡的內容在成熟後，才考慮升級進 `_VibeCore/`

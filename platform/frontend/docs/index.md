# frontend/docs 索引

## 目的

`platform/frontend/docs/` 用來存放目前前端實作階段的工作文件、收斂中的規格，以及 React-first 過渡文件。

這一層文件的角色是：

- 先服務目前 `platform/frontend/` 的實作與溝通
- 記錄從 Vue 時代過渡到 React-first 的實際經驗
- 承接尚未成熟到可直接上升 `_VibeCore/` 的前端規則與做法

## 文件索引

### 架構與規約

- [react-first-architecture.md](F:/GitHub/moducore_platform_react/platform/frontend/docs/react-first-architecture.md)
  - 記錄目前 React-first 前端架構、project/module 契約、module 可包含檔案，以及 build 輸出規則。

## 與 `_VibeCore/` 的關係

目前原則：

- `_VibeCore/` 是 world、工程治理與正式規範層
- `platform/frontend/docs/` 是前端實作層的工作文件與過渡規格

當我們累積更多新專案經驗，並確認某些前端規則已經穩定、可重複使用後，
應將這裡成熟的內容整理、抽象化，再升級進 `_VibeCore/` 內成為正式工程文件。

換句話說：

- 先在 `platform/frontend/docs/` 試行與收斂
- 穩定後再提升到 `_VibeCore/`

## 升級原則

若一份文件符合以下條件，應考慮升級至 `_VibeCore/`：

- 已不再只屬於單一前端 project
- 可適用於多個 project 或 module
- 規則已經過至少一輪以上的實作驗證
- 內容不只是局部 workaround，而是可成為通用工程契約

## 維護方式

- 新增 `docs/` 文件時，必須同步更新本索引，將新文件掛載進來。
- 本索引應維持為 `frontend/docs/` 的單一入口與目錄總表。
- 若新增文件但未登錄於本索引，視為文件維護未完成。
- 文件應以繁體中文為主要語言。
- 必要的英文只保留在檔名、路徑、程式碼、設定鍵與技術名詞。

# AI 專案入口

## 啟動閱讀順序

請依序閱讀：

1. `_VibeCore/STARTUP_DECLARATION.md`
2. `_VibeCore/RootIndex.md`
3. 相關的 `_VibeCore/**/index.md`
4. `_VibeCore/projects/index.md`
5. `_VibeCore/projects/PROJECT_AUTHORING_STANDARD.md`
6. `_VibeCore/projects/PROJECT_SCAFFOLD_PROTOCOL.md`
7. `_VibeCore/projects/templates/index.md`

之後再進入目前啟用的 project instance，以及對應的前後端程式碼。

## Repository 現況

- `_VibeCore/` 是 world、治理規則與 project authoring 的層。
- `platform/frontend/` 是目前實際運作中的前端實作。
- `platform/backend/` 是後端與 public web root。
- `_workspace/` 是暫存工作區。

重要前提：

- 目前啟用中的前端 runtime 是 React-first。
- `_VibeCore` 舊文件中的 Vue 描述，除非現行程式碼仍依賴它，否則應視為 legacy wording。
- world core 仍以語言中立為主，除非某份文件明確把行為綁定到特定 UI runtime。

## 目前前端入口

處理目前前端時，優先閱讀：

1. `platform/frontend/src/main.js`
2. `platform/frontend/src/react/startReactApp.jsx`
3. `platform/frontend/src/react/reactWorld.js`
4. `platform/frontend/src/react/reactBoot.js`
5. `platform/frontend/src/app/container/`
6. `platform/frontend/projects/loadProject.js`
7. `platform/frontend/projects/modulesRegistry.js`
8. `platform/frontend/projects/<project>/project.config.js`
9. `platform/frontend/projects/<project>/layout/`
10. `platform/frontend/projects/<project>/modules/`

像 `src/world.js`、`src/router/`、`boot.js`、`LayoutRoot.vue` 這類舊描述，不應直接視為目前 React runtime 的正式入口，除非當前 codebase 真的仍在使用。

## 前端 runtime 模型

目前流程如下：

1. `src/main.js` 透過 `VITE_PROJECT` 載入選定 project 的設定。
2. `startReactApp.jsx` 啟動 React runtime。
3. `reactWorld.js` 管理 runtime registration state、route state 與 panel visibility state。
4. `reactBoot.js` 負責發現 project modules，並安裝 stores、routes、panels。
5. `projects/<project>/modules/index.js` 是 project 的 module registry 入口。

## Project 解析方式

- 前端 project 的選擇由 `import.meta.env.VITE_PROJECT` 控制。
- `platform/frontend/projects/loadProject.js` 會載入 `projects/<project>/project.config.js`。
- Vite alias `@project` 會指向 `platform/frontend/projects/${VITE_PROJECT}`。
- build 輸出位置由被選中的 `project.config.js` 決定。

## Module 形狀

每個 module 都應被視為一個自我封裝的業務單位。

建議結構：

- `index.js`
- `store.js`
- `routes.js`
- `service.js`
- `api/`
- `pages/`
- 視需要加入 module-local components 或 hooks

規則：

- `index.js` 是 project registry 看到的 module 邊界。
- `store.js` 擁有 module store 的定義。
- module 的業務邏輯不應散落到無關的全域資料夾。

## Container 與 Store

- 跨 project 的共用 state 留在 platform stores。
- module-specific state 應留在 module 內。
- store 應透過 register facade 註冊，不應在零散檔案中直接隨意改動 container。

## Router 與 Layout

- 在目前的 React runtime 裡，routing 以 route descriptors 與 React route store 表達。
- layout 放在 `projects/<project>/layout/`。
- 舊文件中提到的 `LayoutRoot.vue`，應視為 legacy 描述；當該區塊被碰到時，應遷移成目前的 React layout 結構。

## 遷移原則

當舊文件描述的是 Vue-first 行為時：

- 若 world rule 的結構仍成立，保留該 rule
- 將 Vue-specific wording 標記為 legacy
- 將目前有效的實作指引改寫為 React-first

除非使用者明確要求，否則不要重新把 Vue 帶回主前端路徑。

# React-First 前端架構

## 方向

`platform/frontend` 目前以 React-first 為主。

現行原則：

- 新的前端 runtime 工作以 React 為主。
- 新的 module UI 使用 `.jsx` 或 `.js`，不再新增 `.vue`。
- project 切換由 `VITE_PROJECT` 控制。
- build 輸出位置由各 project 自己的 `project.config.js` 宣告。
- 舊的 Vue 資產或描述視為 legacy；若尚未移除，應先隔離，再逐步遷移。

## Project 契約

每個 project 應至少具備：

- `project.config.js`
- `layout/`
- `modules/`
- `styles/`
- `docs/`

建議的 `project.config.js` 形狀：

```js
export default {
  name: 'react-welcome',
  tenant_id: 'react-welcome',
  uiRuntime: 'react',
  build: {
    outDir: '../backend/public'
  },
  modules: ['hello-panel', 'status-panel']
}
```

規則：

- `uiRuntime` 目前應為 `react`。
- `build.outDir` 是這個 project 自己宣告的 build 輸出位置。
- `vite.config.js` 會先讀 `VITE_PROJECT`，再載入對應的 `project.config.js`，並使用其 `build.outDir`。

## Module 契約

一個 module 應被視為完整的業務單位。

module 自己負責：

- UI
- store
- routes
- service layer
- API access layer
- local pages
- registration entry

建議結構：

```txt
modules/
  hello-panel/
    api/
    pages/
    store.js
    routes.js
    service.js
    index.js
    HelloPanel.jsx
```

module 內可以存在的檔案與資料夾：

- `index.js`：必要；module 入口，負責聚合 module 自己的資料。
- `store.js`：可選但建議；定義 module stores，並匯出 `stores`。
- `routes.js`：可選；定義 module route descriptors。
- `service.js`：可選；定義 module business services。
- `api/`：可選；放 API client 或遠端資料轉接邏輯。
- `pages/`：可選；放這個 module 自己擁有的 route pages。
- `components/`：可選；module-local UI 元件。
- `hooks/`：可選；module-local React hooks。
- `utils/`：可選；module-local helpers。

規則：

- `index.js` 是 project registry 看到的 module 邊界。
- module 的業務邏輯不應散落到無關的全域資料夾。
- module 內可以拆分檔案，但責任仍屬於這個 module 目錄。
- 若存在 store，主要定義應放在 `store.js`，或由 `store.js` 匯總 module-local store 檔案。

## Module Entry 責任

`index.js` 應負責聚合 module 本身，並輸出一個 module definition object。

範例：

```js
import { stores } from './store.js'
import { routes } from './routes.js'
import { HelloPanel } from './HelloPanel.jsx'

export default {
  name: 'hello-panel',
  stores,
  routes,
  panels: [
    {
      name: 'hello-panel',
      title: 'Hello Panel',
      Component: HelloPanel
    }
  ]
}
```

規則：

- 不要把 module registration data 藏在太多無關檔案裡。
- `index.js` 應是 project registry 唯一直接匯入的 module 入口。
- `store.js` 應該承擔真正的 store 定義，不應只是空殼轉發，除非是刻意做 module-local 拆分後再回收。

## React-Only 邊界

目前 frontend active runtime 是 React。

現行 React 入口：

- `platform/frontend/src/main.js`
- `platform/frontend/src/react/startReactApp.jsx`
- `platform/frontend/src/react/reactWorld.js`
- `platform/frontend/src/react/reactBoot.js`

規則：

- 不要再新增 Vue runtime entry。
- 不要為新功能新增 `.vue` 檔案。
- 不要把 Vue-specific dependencies、router pattern、store pattern 再帶回 active frontend path。
- 若 `public/` 或舊靜態資料夾裡還有 Vue 時代遺留資產，先隔離，再在確認用途後移除。

## 遷移原則

從舊結構遷移到 React-first 時，建議順序：

1. 保留 `VITE_PROJECT` 作為 project 選擇入口。
2. 將 project 行為收斂到 `project.config.js`、`layout/`、`modules/`。
3. 將 module 的業務邏輯收回 module 自己的目錄。
4. 把零散的 setup 物件整合回 module `index.js`。
5. 只有真正跨 project 的議題，才留在 platform-level stores。

platform-level stores 適合放：

- auth
- lifecycle
- platformConfig
- 其他真正跨 project 的平台議題

module-level stores 適合放：

- module UI state
- module workflow state
- module-specific business state

補充說明：

- module store 雖然會註冊進 world，但 world 主要提供的是註冊與解析能力，不代表所有 store 都應被理解成全域共享狀態。
- 多數 module store 仍是服務該 module 或該頁面的業務狀態，通常會跟著 module 的 install 或使用流程進入作用範圍。
- 實務上，常見情況是開到那一頁、或該 module 被載入時，對應 store 才開始發揮作用，而不是一開始就把所有表單 state 當成全域常駐狀態。
- 只有明確的跨模組共享需求，才應主動設計成共享 store，並更審慎控制其資料規模與責任邊界。

## Build 輸出規則

build 輸出位置必須由被選中的 `project.config.js` 宣告。

目前流程：

1. `.env` 或 shell 設定 `VITE_PROJECT`
2. `vite.config.js` 載入 `projects/<project>/project.config.js`
3. 使用其中的 `build.outDir` 作為實際輸出目錄

這樣 build 行為的主責任在 project，而不是硬寫死在全域 Vite 設定裡。

## Route 載入與共享資料

在 `routes.js` 中，應區分兩件事：

- page component 的載入時機
- store / service 進入 world 的時機

### route component 直接 import

若 route page 屬於核心頁面、幾乎一定會使用，或希望該頁面元件跟著模組一起進場，
可直接在 `routes.js` 先 `import` 再放入 descriptor。

這代表：

- page component 會跟著模組一起載入
- 適合核心頁面或需要提早到位的頁面元件

### route component lazy import

若 route page 較重、使用機率較低，或只想在真正進入該 route 時才載入頁面，
可使用：

```js
component: () => import('./pages/SomePage.jsx')
```

這代表：

- route 會先註冊
- page component 會延後到實際進頁時才載入

### 重要區分

`routes.js` 的同步 import 或 lazy import，主要控制的是頁面元件的載入時機，  
不是跨模組共享資料的真正控制點。

若希望跨模組功能能提早拿到資料，真正應優先設計的是：

- 共享 store 何時註冊進 world
- 共享 service 何時註冊進 world
- 其他模組何時能 resolve 到它們

也就是說：

- 想讓頁面早點可用：調整 route component 載入方式
- 想讓共享資料早點可用：調整 store / service 的註冊策略

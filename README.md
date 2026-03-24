# ModuCore Platform

ModuCore Platform 是一個以「平台 > 專案 > 模組」為核心結構的前後端整合工程。
目前前端主路徑採用 React-first，並保留原本 world / container / module registry 的組裝哲學。

這個平台的目標，不是只服務單一畫面框架，而是建立一套可延續、可拆分、可切換專案的工程架構。
它可以承接 SaaS、系統型專案，或需要多專案並存的前後台整合場景。

任何時間點，系統只會存在一個可判定的專案狀態。
這個狀態不是單純的畫面切換，而是平台啟動後形成的唯一有效且可運作的專案上下文。

---

## 專案定位

這個專案的重點不是單一畫面框架，而是：

- 平台層提供基礎能力與啟動機制
- 專案層決定目前世界的配置與外框
- 模組層承接實際業務功能

React 在這裡主要負責渲染層，並不推翻原本的平台結構。

---

## 平台 > 專案 > 模組

整體分層如下：

- `platform`
  - 提供共用基礎能力、啟動流程與底層規則
- `project`
  - 決定目前啟動哪個專案、使用哪些模組、採用什麼 layout
- `module`
  - 各自管理自己的 `store.js`、`routes.js`、`service.js`、`api/`、`pages/`、`components/`、`index.js`

這種結構可以讓：

- 專案切換時不需要推翻整個平台
- 模組可以作為完整個體獨立維護
- 畫面框架從 Vue 過渡到 React 時，仍能保留原本的組裝邏輯

---

## 不是頁面切換，而是專案切換

本平台的核心不是單純前端路由，而是專案上下文的切換。

也就是說：

- 每個 Project 都是可獨立啟動的世界
- project 由 `tenant_id` 與設定定義
- 啟動時會決定當前世界的模組集合、layout 與執行上下文

專案切換等同於現有專案狀態的重置或替換。

---

## World / Container / Module Setup

`world` 是註冊與解析的容器，不是單純的全域變數集合。

在這套結構裡：

- module 透過 `index.js` 將自己的能力註冊進 world
- world 負責解析已註冊的 store、route、panel 與其他能力
- container 承接實際的註冊與 resolve 機制

`module/index.js` 的 `setup` 是模組對外公開能力的入口，常見包含：

- `stores`
- `routes`
- `panels`

原則上：

- 模組內部可以直接引用自己模組的檔案
- 跨模組不可直接引用別的模組內部檔案
- 跨模組必須透過 world 取得已註冊能力

---

## Container 是 World 的實作支撐

Container 是 World 背後實際負責註冊與解析能力的機制。

它負責：

- 註冊可解析能力
- 依名稱解析 store / service / 其他能力
- 避免模組之間直接互相硬引用

Container 不是業務主體，而是：

- 狀態與服務的註冊點
- 啟動流程的支撐層
- 專案內能力組裝的基礎設施

---

## 模組透過 setup 對世界輸出能力

模組不是只放畫面檔案，而是完整功能單位。
每個模組都應透過 `index.js` 的 `setup` 將自己對外可用的能力註冊出去。

常見的 `setup` 能力有：

- UI / panel
- routes
- stores
- 其他模組對外服務能力

這代表模組不只是畫面資料夾，而是平台中的一個可組裝單元。

---

## Store：狀態的權威來源

Store 負責專案狀態管理，是專案狀態的單一權威來源。

### 狀態邊界原則

- 任何會影響專案未來行為的資料，必須進入 Store
- 純顯示用、一次性、局部且不影響流程的資料，可留在元件內

### Store 的實作原則

為確保狀態具備單一權威性與可預期行為，
本平台的 Store 不是單純的資料容器，而是建立於：

- 容器註冊機制
- 可控的狀態響應策略

所有會影響專案未來行為的狀態，
必須透過容器註冊後由 Store 統一管理，
並由平台決定其生命週期與作用範圍，
避免狀態被隱性修改或在模組間流竄。

### Store 響應與 React-first

目前前端的 React 響應能力，已包裝進平台自己的 Store 工廠中。

這代表：

- React 的響應訂閱能力由平台內建提供
- 模組在 `store.js` 中直接使用平台提供的 store factory 即可
- Store 會同時承接狀態、actions、subscribe 與 React 響應介面
- 不依賴 Redux、Zustand、Pinia 或其他第三方狀態管理框架

因此，模組層只需要專注在自己的狀態結構與業務邏輯，不需要再額外引入第三方狀態管理方案。

### Store 響應寫法示範

```js
// modules/counter/store.js
import { createStore } from '@/core'

export function createCounterStore() {
  return createStore({
    name: 'counterStore',
    defaultValue: {
      count: 0
    },
    actions: {
      increment(store) {
        const snapshot = store.get()
        store.set({
          ...snapshot,
          count: snapshot.count + 1
        })
      }
    }
  })
}

export const stores = {
  counterStore: createCounterStore
}
```

```jsx
// modules/counter/components/CounterPanel.jsx
export function CounterPanel({ world }) {
  const counterStore = world.store('counterStore')
  const counter = counterStore.useStore()

  return (
    <section>
      <p>Count: {counter.count}</p>
      <button type="button" onClick={() => counterStore.increment()}>
        Count +1
      </button>
    </section>
  )
}
```

上面這種寫法代表：

- store 的 state 與 actions 由平台 store factory 建立
- React 元件透過 `useStore()` 訂閱狀態
- 點擊 `increment()` 後，React 畫面會自動響應更新
- 整個流程不需要額外引入第三方狀態管理套件

### Store 類型

#### 平台級 Store

- 專案層級狀態
- 啟動流程時就需要存在
- 例如 `auth`、`platformConfig`、`lifecycle`

#### 模組級 Store

- 僅服務模組內部狀態
- 承接模組 workflow 與業務狀態
- 必要時再透過 world 以共享能力方式對外提供

### Store 使用原則

- 任何會影響專案後續行為的狀態，應進入 Store
- 父子元件間的直接傳遞使用 `props`
- 超出父子關係的資料傳遞，應使用 Store

---

## Routing：存取控制與頁面入口

Routing Guard 應負責存取控制，不承擔專案規則定義。

Routing 主要處理：

- 使用者是否可以進入當前 route
- route 對應哪個 page
- route metadata 與 route access

目前規則：

- 選單名稱使用 `meta.nav.label`
- 選單排序使用 `meta.nav.order`
- 若 route page 要延後載入，使用 `component: () => import(...)`

---

## Panels / Routes / Stores 的角色

在模組 `setup` 中，這三者的角色不同：

- `stores`
  - 提供模組狀態能力
- `routes`
  - 提供模組頁面入口
- `panels`
  - 提供模組對外公開的跨模組 UI 能力

### `panels`

`panels` 不是單純匯出元件，而是讓其他模組、project layout 或 project-level page 能透過 world 取回並使用的 UI 區塊。

適合用在：

- 首頁卡片
- dashboard 區塊
- 可插拔的摘要元件

使用規則：

- 若寫 `panels`，必須加上註解：`// 提供跨模組能力`
- 每個 panel 都必須標註 `targets`
- 使用方不得直接把 `world.getPanels()` 全部畫出來，必須依 `targets` 過濾

範例：

```js
export default {
  name: 'notification',
  setup: {
    stores,
    routes,
    // 提供跨模組能力
    panels: [
      {
        name: 'notification-bell',
        targets: ['header-right'],
        Component: NotificationBell
      }
    ]
  }
}
```

### `routes`

`routes.js` 負責 route descriptor，並將 route metadata 留在 `routes.js` 中管理。

### `stores`

`store.js` 應承接實際 store 定義與聚合，不應只剩轉手或空殼。
store 雖然可以註冊進 world，但其業務責任仍屬於原本的 module。

---

## 最終結構概念

```txt
Platform
  -> World (Project)
    -> Container
      -> Modules
        -> UI / Store / API / Routes
```

這代表：

- 平台提供世界與啟動規則
- 專案形成當前世界
- 容器承接可解析能力
- 模組提供實際業務能力
- 前端渲染層目前由 React 承接

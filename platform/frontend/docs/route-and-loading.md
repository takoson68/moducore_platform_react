# Route 與載入規則

## Route 契約

`routes.js` 是模組的 route descriptor 集中處。
路由相關資訊應寫在 `routes.js`，包含：

- `path`
- `page`
- `component`
- `meta`

`index.js` 只負責聚合 `routes`，不回寫 route metadata。

目前前端 route 採用 path-based 模式，例如 `/form-draft`，不使用 `#/form-draft` 這種 hash route。

範例：

```js
export const routes = [
  {
    path: '/staff/manager/dashboard',
    page: 'dashboard',
    component: () => import('./pages/DashboardPage.jsx'),
    meta: {
      nav: {
        label: '營運儀表板',
        order: 10
      },
      access: {
        public: true,
        auth: true
      }
    }
  }
]
```

## `meta` 使用原則

`meta.title` 不應拿來承擔選單名稱，也不應拿來塞頁面內文資訊。
如果目前沒有真正使用 document title 或其他標題機制，就不要重複維護 `title`。

目前規則是：

- 選單名稱使用 `meta.nav.label`
- 選單排序使用 `meta.nav.order`
- 路由權限使用 `meta.access`

這樣可以避免同一條 route 同時維護 `title` 與 `nav.label`，增加維護成本卻沒有實際價值。

## route component 的兩種載入方式

### 同步 import

如果某條 route 的頁面元件希望隨模組一起載入，可以直接在 `routes.js` 先 `import` 再指定給 descriptor。

```js
import { DashboardPage } from './pages/DashboardPage.jsx'

export const routes = [
  {
    path: '/dashboard',
    page: 'dashboard',
    Component: DashboardPage
  }
]
```

這代表：

- route 在模組 install 時註冊
- page component 也同步進入執行環境

### lazy import

如果某條 route 的頁面可以等使用者真的進入那條路徑時才載入，就使用：

```js
export const routes = [
  {
    path: '/dashboard',
    page: 'dashboard',
    component: () => import('./pages/DashboardPage.jsx')
  }
]
```

這代表：

- route 仍然在模組 install 時註冊
- page component 延後到實際進入 route 時才載入

## 不要混淆的兩件事

`routes.js` 裡的同步 import 與 lazy import，控制的是頁面元件載入時機，不是 store / service 的註冊時機。

如果你要的是：

- 頁面元件提早可用：選擇同步 import
- 頁面元件延後載入：選擇 lazy import

如果你要的是跨模組共享資料提早可用，真正應該檢查的是：

- 共享 store 何時註冊進 world
- 共享 service 何時註冊進 world
- 其他模組是否能在自己的啟動流程中 resolve 到它

不要把 route component 的載入策略，誤當成共享資料初始化策略。

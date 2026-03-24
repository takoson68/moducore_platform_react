# Layout 與 AppShell 規範

## 核心分工

目前前端結構分成三層：

- runtime `App.jsx`
- project `layout/`
- module `setup`

這三層的責任不能混在一起。

## `App.jsx` 的責任

`App.jsx` 是 React runtime 的入口。
它只負責：

- 取得目前 route
- 解析 project `layout/`
- 解析 module routes
- 決定目前要 render 哪個 page
- 用 `Layout` 包住當前頁面

`App.jsx` 不應處理：

- 專案首頁內容怎麼組
- 選單怎麼生成
- 模組卡片怎麼排列

這些都應該交給 project `layout/`。

## project `layout/` 的責任

project `layout/` 負責專案層級的畫面骨架與頁面組裝。
包含：

- `AppShell.jsx`
- project pages
- 首頁如何顯示 panels
- 專案層級的選單、側欄、外框

也就是說：

- 模組提供能力
- 專案決定如何擺放模組

但要注意：

- project `layout/` 可以有 project-level page
- 如果某個頁面語意上屬於某個 module，本頁面應回到該 module 的 `pages/`
- project `layout/` 不應長期代管某個 module 自己的功能頁

## `AppShell.jsx` 的責任

`AppShell.jsx` 是 project layout 的外框元件。
它應負責：

- 根據 `world.getRoutes()` 產生選單
- 根據 route `meta.nav` 決定選單項目
- 呈現當前專案的骨架與導航
- 包住目前頁面內容

選單規則：

- 選單名稱使用 `meta.nav.label`
- 選單排序使用 `meta.nav.order`
- `meta.nav === false` 的 route 不進選單
- 含參數的 route，例如 `:id`，預設不進選單

## `panels` 與 layout 的關係

`panels` 是 module 主動輸出到 world 的跨模組 UI 能力。
project `layout/` 或 project-level page 可以在需要時透過 `world.getPanels()` 取回並組裝。

但真正 render 前必須先依 `targets` 過濾，不能直接全量渲染。

這代表：

- module 負責公開 panel
- module 需宣告 panel 的可用 target
- project layout 或使用方頁面負責決定要不要使用、如何排列

## module 的責任

module 應只提供：

- `routes`
- `stores`
- `panels`
- 其他 module-local 能力

module 不應決定：

- 專案首頁怎麼排版
- 專案導航長什麼樣
- 哪些 panel 要怎麼被組成首頁

這些應由 project `layout/` 或使用方頁面決定。

## 目前 `react-welcome` 的實作方向

`react-welcome` 目前採用：

- `layout/AppShell.jsx` 作為外框
- `hello-panel/pages/HelloWelcomePage.jsx` 作為 module 自己的首頁頁面
- `HelloWelcomePage` 透過 `world.getPanels()` 取回 panel，並依 `targets: ['hello-welcome']` 過濾
- 各 module 只負責提供自己的 panel 與 route

這樣之後要修改專案外框時，只需要動 project `layout/`；
若要修改某個 module 自己的首頁內容，則回到該 module 內處理。

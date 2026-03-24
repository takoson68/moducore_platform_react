# 工程慣例

本文件記錄目前工程中的實務慣例。  
本文件不覆寫 world authority documents。

## 技術堆疊

- 前端：Vite + React + Sass
- 後端：PHP

補充：

- `_VibeCore` 中較早期的 Vue 描述，除非目前程式仍在使用，否則應視為歷史遺留文字。

## 格式與風格

- JS/TS：2 空白縮排，依照周邊檔案風格維持一致。
- React UI：目前有效前端以 `.jsx` 作為元件檔主體。
- PHP：沿用既有後端規範。

## 命名

- module 資料夾使用 lowercase kebab-case，或沿用該 project 既有規則。
- 避免用多個 `.` 拆解檔名語意。
- module 入口檔維持可預期命名：`index.js`、`store.js`、`routes.js`、`service.js`。

## Project 結構

- project 的選擇由 `VITE_PROJECT` 控制。
- 每個 project 自己擁有 `project.config.js`、`layout/`、`modules/`、`styles/`、`docs/`。
- build 輸出位置由被選中的 `project.config.js` 宣告。

## Module 邊界

- module 是自我封裝的業務單位。
- `index.js` 是 module 對 project registry 暴露的唯一入口。
- `store.js` 管理 module stores。
- `routes.js` 管理 module route descriptors。
- `service.js` 視需要承載 module business services。
- `api/` 視需要承載遠端資料存取邏輯。
- `pages/` 視需要承載 route-level pages。

module 不應：

- 直接操控 platform boot lifecycle
- 直接依賴其他 module 的內部檔案
- 把 module 的業務邏輯散落到無關的全域位置

## Container 與 Store 使用

- 共用能力透過 container 或 world facade 存取。
- module stores 透過 register 流程註冊。
- platform stores 只放真正跨 project 的議題。
- module state 除非真的是 platform-level，否則應留在 module 自己內部。

## Routing

- route descriptors 屬於 module。
- layout 屬於被選中的 project。
- React route state 由目前啟用的 React runtime 管理。

## API 邊界

- platform-level API helpers 只處理 platform-level concern。
- module 的業務 API 程式碼留在該 module 的 `api/`。
- transport 與 business state 要分開。

## 樣式

- shared tokens 可以放在 project 或 platform style layer。
- 除非必要，不要讓 module 行為綁死在特定全域 theme 實作。

## 驗證

- 使用足以證明修改正確的最小驗證。
- 前端結構調整若可執行，應跑 build 驗證。

## 給 AI 的指示

- 先讀 world 與 project 文件，再動手。
- 當 active code 已是 React 時，Vue-specific wording 應視為 legacy。
- 優先修正目前有效的 React path，不要為了保留過時 Vue 假設而扭曲現況。

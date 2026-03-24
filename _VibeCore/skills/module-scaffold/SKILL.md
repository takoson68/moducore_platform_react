---
name: module-scaffold
description: 建立或補齊 frontend project module 骨架，採 React-first 結構：index.js、routes.js、store.js、service.js、api/、pages/，並對齊 _VibeCore/engineering/MODULE_TEMPLATE_CONTRACT.md。
---

# Module Scaffold Skill

## 用途

適用情境：

- 新增一個 module
- 修補不完整的 module 骨架
- 將鬆散 module 整理回目前的 module contract

## 必讀文件

1. `_VibeCore/engineering/MODULE_TEMPLATE_CONTRACT.md`
2. `_VibeCore/engineering/CONVENTIONS.md`
3. 目前 project 的既有 module 範例

## 輸入

- `project_name`
- `module_name`
- `route_path`
- `access`
- `nav`

可選：

- `need_store`
- `need_service`
- `need_api`

## 產出檔案

必備：

- `platform/frontend/projects/<project_name>/modules/<module_name>/index.js`
- `platform/frontend/projects/<project_name>/modules/<module_name>/routes.js`

可選：

- `platform/frontend/projects/<project_name>/modules/<module_name>/store.js`
- `platform/frontend/projects/<project_name>/modules/<module_name>/service.js`
- `platform/frontend/projects/<project_name>/modules/<module_name>/api/*.js`
- `platform/frontend/projects/<project_name>/modules/<module_name>/pages/*.jsx`
- module-local component 檔案，例如 `<ModuleName>Panel.jsx`

## Module Contract

- `index.js` 負責聚合 module 自己的 exports。
- `store.js` 定義 module stores，並匯出 `stores`。
- `routes.js` 定義 route descriptors。
- `service.js` 視需要定義 module business services。
- `api/` 視需要承載遠端資料存取。
- `pages/` 視需要承載 route 所屬頁面。

新的 module 不要產生 `.vue` 檔案。

## 執行步驟

1. 先讀目前 project 的 module registry 與既有 module 風格。
2. 建立 module 目錄結構。
3. 撰寫 `index.js`，作為唯一對 project 暴露的 module 入口。
4. 撰寫 `routes.js`，放入需要的 route descriptors。
5. 若 `need_store=true`，建立 `store.js`，並把真正的 store 定義放在這裡。
6. 若 `need_service=true`，建立 `service.js`。
7. 若 `need_api=true`，建立 `api/` 內檔案。
8. 若 module 擁有 route pages，建立 `pages/*.jsx`。
9. 確認 project module registry 可以發現這個 module。
10. 在可行時執行 frontend build 驗證。

## 驗證

檢查：

- module 可被 `modules/index.js` 發現
- route descriptors 合法
- 沒有 module 檔案直接改動 platform boot logic
- 沒有引入新的 `.vue` 檔案
- frontend build 可通過

## 約束

- 遵守 world 與 project 邊界
- 不可繞過 module entry contract
- 沒有明確理由時，不要 import 無關的 platform internals
- module 的業務邏輯應留在 module 目錄內

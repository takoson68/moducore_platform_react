# Convention
本文件不定義硬性行為邊界。  
它只作為目前工程慣例的引用層。

Title: Engineering Conventions Import
Status: candidate
Scope: platform

## Imported Source

- `_VibeCore/engineering/CONVENTIONS.md`

## Imported Content

# 工程慣例

## 技術堆疊

- 前端：Vite + React + Sass
- 後端：PHP

補充：

- 舊文件中的 Vue wording，除非 active code 仍在使用，否則應視為 legacy。

## 格式與風格

- JS/TS：2 空白縮排，跟隨周邊檔案風格。
- 目前 active frontend 的 UI 使用 `.jsx`。
- PHP 維持既有後端規範。

## Project 結構

- project 選擇使用 `VITE_PROJECT`。
- 每個 project 擁有自己的 `project.config.js`、`layout/`、`modules/`、`styles/`、`docs/`。
- build 輸出位置由被選中的 `project.config.js` 決定。

## Module 邊界

- `index.js` 是 module boundary。
- `store.js` 管理 module store 定義。
- `routes.js` 管理 route descriptors。
- `service.js` 管理 module business services。
- `api/` 管理 remote data access。
- `pages/` 管理 route-level module pages。

## Container 與 Store 使用

- 共用能力透過 container 或 world facade 存取。
- stores 透過 module install flow 註冊。
- platform stores 處理 platform concern，module stores 處理 module concern。

## API 邊界

- platform API helpers 留在 platform 層。
- module business API code 留在 module 內部。

## 給 AI 的指示

- 先讀 world 與 project 文件。
- 不要讓 legacy Vue wording 覆蓋目前有效的 React 實作。
- 優先維護 active React path，而不是維持過時的 Vue 假設。

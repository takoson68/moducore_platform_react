/**
 * Platform Tools Facade
 *
 * 此文件為平台對外公開能力出口。
 * React-only 平台中，模組禁止直接 import app/* 目錄底層實作。
 *
 * 合法用法：
 *   import { createStore } from "@/core"
 */

import { services } from '@/app/container/services/index.js'

export { createStore } from '@/app/stores/_storeFactory.js'
export { resolveWorldVisibility } from './visibility.js'

export const eventBus = services.eventBus

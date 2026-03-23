//- src/app/stores/_storeFactory.js
// React-only 平台的通用 store 建立工廠
import { useSyncExternalStore } from 'react'

function isPlainObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}

function isTypeMatch(value, template) {
  if (Array.isArray(template)) return Array.isArray(value)
  if (isPlainObject(template)) return isPlainObject(value)
  return typeof value === typeof template
}

export function createStore({
  name,
  storageKey = null,
  defaultValue,
  actions = null,
}) {
  if (!name) throw new Error(`❌ createStore 缺少 name`)
  if (defaultValue === undefined) throw new Error(`❌ createStore 缺少 defaultValue`)

  const isObj = isPlainObject(defaultValue)
  const isArray = Array.isArray(defaultValue)
  const isPrimitive = !isObj && !isArray

  let state = structuredClone(defaultValue)
  const listeners = new Set()

  function writeState(value) {
    state = structuredClone(value)
  }

  function emit() {
    listeners.forEach((listener) => listener())
  }

  const store = {
    get state() {
      return state
    },

    get() {
      return state
    },

    getSnapshot() {
      return state
    },

    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },

    useStore(selector = (snapshot) => snapshot) {
      return useSyncExternalStore(
        (listener) => store.subscribe(listener),
        () => selector(store.getSnapshot()),
        () => selector(store.getSnapshot())
      )
    },

    set(value) {
      if (!isTypeMatch(value, defaultValue)) {
        throw new TypeError(`[${name}] set 型態錯誤：接收到 ${JSON.stringify(value)}`)
      }

      writeState(value)
      emit()

      if (storageKey) {
        try {
          const dataToSave = isObj || isArray ? structuredClone(state) : value
          localStorage.setItem(storageKey, JSON.stringify(dataToSave))
        } catch (err) {
          console.warn(`[${name}] 儲存到 localStorage 失敗`, err)
        }
      }
    },

    patch(partial) {
      if (!isObj) {
        throw new TypeError(`[${name}] patch 僅支援 object store`)
      }

      const nextState = typeof partial === 'function'
        ? partial(structuredClone(state))
        : { ...state, ...partial }

      store.set(nextState)
    },

    clear() {
      writeState(structuredClone(defaultValue))
      emit()
      if (storageKey) localStorage.removeItem(storageKey)
    },

    loadFromStorage() {
      if (!storageKey) return
      try {
        const raw = localStorage.getItem(storageKey)
        if (raw !== null) {
          try {
            store.set(JSON.parse(raw))
          } catch {
            store.set(raw)
          }
        }
      } catch (err) {
        console.warn(`[${name}] 讀取 localStorage 失敗`, err)
      }
    }
  }

  if (actions) {
    Object.entries(actions).forEach(([key, fn]) => {
      store[key] = (...args) => fn(store, ...args)
    })
  }

  store.loadFromStorage()
  return store
}

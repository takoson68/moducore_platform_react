//- src/app/stores/_storeFactory.js
// React-only 平台的通用 store 建立工廠

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

  function writeState(value) {
    state = structuredClone(value)
  }

  const store = {
    get state() {
      return state
    },

    get() {
      return state
    },

    set(value) {
      if (!isTypeMatch(value, defaultValue)) {
        throw new TypeError(`[${name}] set 型態錯誤：接收到 ${JSON.stringify(value)}`)
      }

      writeState(value)

      if (storageKey) {
        try {
          const dataToSave = isObj || isArray ? structuredClone(state) : value
          localStorage.setItem(storageKey, JSON.stringify(dataToSave))
        } catch (err) {
          console.warn(`[${name}] 儲存到 localStorage 失敗`, err)
        }
      }
    },

    clear() {
      writeState(structuredClone(defaultValue))
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

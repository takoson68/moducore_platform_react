import { createStore } from '@/core'

export function createWelcomeSharedSignalStore() {
  return createStore({
    name: 'welcomeSharedSignalStore',
    defaultValue: {
      count: 0,
      message: '這是 react-welcome 的共享 store signal',
      source: 'store',
      updatedAt: null
    },
    actions: {
      increment(store) {
        const snapshot = store.get()
        store.set({
          ...snapshot,
          count: snapshot.count + 1,
          message: `共享 store signal 已更新 ${snapshot.count + 1} 次`,
          updatedAt: new Date().toISOString()
        })
      },
      reset(store) {
        store.set({
          count: 0,
          message: '共享 store signal 已重置',
          source: 'store',
          updatedAt: new Date().toISOString()
        })
      },
      setMessage(store, message) {
        store.patch({
          message,
          updatedAt: new Date().toISOString()
        })
      }
    }
  })
}

export const stores = {
  welcomeSharedSignal: createWelcomeSharedSignalStore
}

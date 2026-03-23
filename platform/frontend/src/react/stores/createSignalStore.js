import { createStore } from '@/core'

export function createSignalStore() {
  const store = createStore({
    name: 'reactSignalStore',
    defaultValue: {
      count: 0,
      message: 'React 驗證 world 已啟動'
    }
  })

  return {
    getSnapshot() {
      return store.getSnapshot()
    },

    subscribe(listener) {
      return store.subscribe(listener)
    },

    useStore(selector) {
      return store.useStore(selector)
    },

    increment() {
      const snapshot = store.get()
      store.set({
        count: snapshot.count + 1,
        message: `共享 signal 已更新 ${snapshot.count + 1} 次`
      })
    },

    reset() {
      store.set({
        count: 0,
        message: '共享 signal 已重置'
      })
    },

    setMessage(message) {
      store.patch({ message })
    }
  }
}

import { createObservableStore } from '../runtime/createObservableStore.js'

export function createSignalStore() {
  const store = createObservableStore({
    count: 0,
    message: 'React 驗證 world 已啟動'
  })

  return {
    getSnapshot() {
      return store.getState()
    },

    subscribe(listener) {
      return store.subscribe(listener)
    },

    increment() {
      store.patch((state) => ({
        count: state.count + 1,
        message: `共享 signal 已更新 ${state.count + 1} 次`
      }))
    },

    reset() {
      store.setState({
        count: 0,
        message: '共享 signal 已重置'
      })
    },

    setMessage(message) {
      store.patch({ message })
    }
  }
}

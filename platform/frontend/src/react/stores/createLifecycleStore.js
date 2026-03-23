import { createObservableStore } from '../runtime/createObservableStore.js'

export function createLifecycleStore() {
  const store = createObservableStore({
    events: []
  })

  return {
    getSnapshot() {
      return store.getState()
    },

    subscribe(listener) {
      return store.subscribe(listener)
    },

    record(event) {
      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        event,
        at: new Date().toISOString()
      }

      store.patch((state) => ({
        events: [entry, ...state.events].slice(0, 20)
      }))
    }
  }
}

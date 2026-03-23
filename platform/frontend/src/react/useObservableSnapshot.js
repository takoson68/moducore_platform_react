import { useSyncExternalStore } from 'react'

export function useObservableSnapshot(store) {
  if (typeof store?.useStore === 'function') {
    return store.useStore()
  }

  return useSyncExternalStore(
    (listener) => store.subscribe(listener),
    () => store.getSnapshot(),
    () => store.getSnapshot()
  )
}

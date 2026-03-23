import { useSyncExternalStore } from 'react'

export function useObservableSnapshot(store) {
  return useSyncExternalStore(
    (listener) => store.subscribe(listener),
    () => store.getSnapshot(),
    () => store.getSnapshot()
  )
}

import { createObservableStore } from '../runtime/createObservableStore.js'

function normalizePath(path) {
  if (!path || path === '/') return '/welcome'
  return path.startsWith('/') ? path : `/${path}`
}

export function createRouteStore(initialPath = '/welcome') {
  const store = createObservableStore({
    path: normalizePath(initialPath)
  })

  return {
    getSnapshot() {
      return store.getState()
    },

    subscribe(listener) {
      return store.subscribe(listener)
    },

    navigate(path) {
      const nextPath = normalizePath(path)

      if (typeof window !== 'undefined') {
        const current = normalizePath(window.location.hash.replace(/^#/, '') || '/welcome')
        if (current !== nextPath) {
          window.location.hash = nextPath
          return
        }
      }

      store.setState({ path: nextPath })
    },

    syncFromLocation() {
      if (typeof window === 'undefined') return
      const path = normalizePath(window.location.hash.replace(/^#/, '') || '/welcome')
      store.setState({ path })
    }
  }
}

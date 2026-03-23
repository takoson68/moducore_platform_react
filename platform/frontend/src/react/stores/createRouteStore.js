import { createStore } from '@/core'

function normalizePath(path, fallbackPath = '/welcome') {
  if (!path || path === '/') return fallbackPath
  return path.startsWith('/') ? path : `/${path}`
}

export function createRouteStore(initialPath = '/welcome') {
  const store = createStore({
    name: 'reactRouteStore',
    defaultValue: {
      path: normalizePath(initialPath, initialPath)
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

    navigate(path) {
      const nextPath = normalizePath(path, initialPath)

      if (typeof window !== 'undefined') {
        const current = normalizePath(window.location.hash.replace(/^#/, '') || initialPath, initialPath)
        if (current !== nextPath) {
          window.location.hash = nextPath
          return
        }
      }

      store.set({ path: nextPath })
    },

    syncFromLocation() {
      if (typeof window === 'undefined') return
      const path = normalizePath(window.location.hash.replace(/^#/, '') || initialPath, initialPath)
      store.set({ path })
    }
  }
}

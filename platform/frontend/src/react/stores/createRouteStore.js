import { createStore } from '@/core'

function normalizePath(path, fallbackPath = '/welcome') {
  if (!path || path === '/') return fallbackPath
  return path.startsWith('/') ? path : `/${path}`
}

function resolveBrowserPath(fallbackPath) {
  if (typeof window === 'undefined') {
    return normalizePath(fallbackPath, fallbackPath)
  }

  const hashPath = window.location.hash.replace(/^#/, '')
  if (hashPath) {
    return normalizePath(hashPath, fallbackPath)
  }

  return normalizePath(window.location.pathname, fallbackPath)
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
        const current = resolveBrowserPath(initialPath)
        if (current !== nextPath) {
          window.history.pushState({}, '', nextPath)
        }
      }

      store.set({ path: nextPath })
    },

    syncFromLocation() {
      if (typeof window === 'undefined') return

      const path = resolveBrowserPath(initialPath)

      if (window.location.hash) {
        window.history.replaceState({}, '', path)
      }

      store.set({ path })
    }
  }
}

import { registerStore } from '@/app/container/index.js'
import { container } from '@/app/container/container.js'
import { coreStoreFactories } from '@/app/stores/index.js'
import { createStore } from '@/core'
import { createSignalStore } from './stores/createSignalStore.js'
import { createRouteStore } from './stores/createRouteStore.js'
import { reactBoot } from './reactBoot.js'

function getInitialRoute(projectConfig) {
  const fallbackRoute = projectConfig?.defaultRoute || '/welcome'
  if (typeof window === 'undefined') return fallbackRoute

  const hashPath = window.location.hash.replace(/^#/, '')
  if (hashPath) {
    return hashPath || fallbackRoute
  }

  return window.location.pathname || fallbackRoute
}

class ReactWorld {
  constructor() {
    this.started = false
    this._startPromise = null
    this._runtimeRegistry = {
      panels: new Map(),
      routes: new Map()
    }
    this._runtimeStore = createStore({
      name: 'reactRuntimeStore',
      defaultValue: {
        route: '/welcome',
        panels: [],
        visiblePanels: {},
        discoveredModules: [],
        projectConfig: null
      }
    })
  }

  async start({ projectConfig }) {
    if (this.started) return
    if (this._startPromise) return this._startPromise

    this._startPromise = (async () => {
      for (const [name, factory] of Object.entries(coreStoreFactories)) {
        registerStore(name, factory)
      }

      registerStore('reactSignal', createSignalStore)
      registerStore('reactRoute', () => createRouteStore(getInitialRoute(projectConfig)))

      const platformConfigStore = container.resolve('platformConfig')
      if (typeof platformConfigStore.setConfig === 'function') {
        platformConfigStore.setConfig(projectConfig ?? null)
      }

      const { discoveredModules } = await reactBoot({
        projectConfig,
        runtimeRegistry: this._runtimeRegistry
      })

      const panelNames = [...this._runtimeRegistry.panels.keys()]
      const visiblePanels = Object.fromEntries(panelNames.map((name) => [name, true]))

      this._runtimeStore.set({
        route: getInitialRoute(projectConfig),
        panels: panelNames,
        visiblePanels,
        discoveredModules,
        projectConfig
      })

      const routeStore = this.routeStore()
      routeStore.syncFromLocation()
      this._unsubscribeRoute = routeStore.subscribe(() => {
        this._runtimeStore.patch({ route: routeStore.getSnapshot().path })
      })

      if (typeof window !== 'undefined') {
        this._handlePopState = () => routeStore.syncFromLocation()
        window.addEventListener('popstate', this._handlePopState)
      }
      this.started = true
    })()

    try {
      await this._startPromise
    } finally {
      this._startPromise = null
    }
  }

  subscribe(listener) {
    return this._runtimeStore.subscribe(listener)
  }

  getSnapshot() {
    return this._runtimeStore.getSnapshot()
  }

  routeStore() {
    return container.resolve('reactRoute')
  }

  store(name) {
    return container.resolve(name)
  }

  hasStore(name) {
    return container.list().stores.includes(name)
  }

  signalStore() {
    return container.resolve('reactSignal')
  }

  navigate(path) {
    this.routeStore().navigate(path)
  }

  togglePanel(name) {
    const snapshot = this.getSnapshot()
    this._runtimeStore.patch({
      visiblePanels: {
        ...snapshot.visiblePanels,
        [name]: !snapshot.visiblePanels[name]
      }
    })
  }

  isPanelVisible(name) {
    return Boolean(this.getSnapshot().visiblePanels[name])
  }

  getPanel(name) {
    return this._runtimeRegistry.panels.get(name) || null
  }

  getPanels() {
    return [...this._runtimeRegistry.panels.values()]
  }

  getRouteDescriptor(path) {
    return this._runtimeRegistry.routes.get(path) || null
  }

  getRoutes() {
    return [...this._runtimeRegistry.routes.values()]
  }
}

export const reactWorld = new ReactWorld()

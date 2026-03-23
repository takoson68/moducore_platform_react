import { registerStore } from '@/app/container/index.js'
import { container } from '@/app/container/container.js'
import { coreStoreFactories } from '@/app/stores/index.js'
import { createSignalStore } from './stores/createSignalStore.js'
import { createRouteStore } from './stores/createRouteStore.js'
import { createLifecycleStore } from './stores/createLifecycleStore.js'
import { createObservableStore } from './runtime/createObservableStore.js'
import { reactBoot } from './reactBoot.js'

function getInitialRoute() {
  if (typeof window === 'undefined') return '/welcome'
  const raw = window.location.hash.replace(/^#/, '')
  return raw || '/welcome'
}

class ReactWorld {
  constructor() {
    this.started = false
    this._startPromise = null
    this._runtimeRegistry = {
      panels: new Map(),
      routes: new Map()
    }
    this._runtimeStore = createObservableStore({
      route: '/welcome',
      panels: [],
      visiblePanels: {},
      discoveredModules: [],
      projectConfig: null
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
      registerStore('reactRoute', () => createRouteStore(getInitialRoute()))
      registerStore('reactLifecycle', createLifecycleStore)

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

      this._runtimeStore.setState({
        route: getInitialRoute(),
        panels: panelNames,
        visiblePanels,
        discoveredModules,
        projectConfig
      })

      const routeStore = this.routeStore()
      routeStore.syncFromLocation()
      this._unsubscribeRoute = routeStore.subscribe(() => {
        this._runtimeStore.patch({
          route: routeStore.getSnapshot().path
        })
      })

      if (typeof window !== 'undefined') {
        this._handleHashChange = () => routeStore.syncFromLocation()
        window.addEventListener('hashchange', this._handleHashChange)
      }

      this.lifecycleStore().record('runtime:ready')
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
    return this._runtimeStore.getState()
  }

  routeStore() {
    return container.resolve('reactRoute')
  }

  signalStore() {
    return container.resolve('reactSignal')
  }

  lifecycleStore() {
    return container.resolve('reactLifecycle')
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

  recordLifecycle(event) {
    this.lifecycleStore().record(event)
  }
}

export const reactWorld = new ReactWorld()

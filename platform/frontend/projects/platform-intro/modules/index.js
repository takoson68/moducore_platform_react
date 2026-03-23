const modules = import.meta.glob('./*/index.js')

export const moduleLoaders = Object.fromEntries(
  Object.entries(modules).map(([path, loader]) => {
    const name = path.split('/')[1]
    return [name, loader]
  })
)

const loadedModules = new Map()
const installedModules = new Set()

async function loadModules() {
  for (const [name, loader] of Object.entries(moduleLoaders)) {
    if (loadedModules.has(name)) continue
    if (typeof loader !== 'function') continue

    const imported = await loader()
    loadedModules.set(name, imported?.default || null)
  }

  return loadedModules
}

export function listModules() {
  return Object.keys(moduleLoaders).map((name) => ({
    name,
    meta: {
      access: {
        public: true,
        auth: false
      }
    }
  }))
}

export async function installModules({ register }, { allowList = [] } = {}) {
  const modulesMap = await loadModules()
  const allowSet = Array.isArray(allowList) ? new Set(allowList) : null

  for (const [name, mod] of modulesMap.entries()) {
    if (!mod) continue
    if (allowSet && !allowSet.has(name)) continue
    if (installedModules.has(name)) continue

    const setup = mod.setup || {}
    const { panels, routes } = setup

    if (Array.isArray(panels)) {
      panels.forEach((panel) => register.panel(panel))
    }

    if (Array.isArray(routes)) {
      routes.forEach((route) => register.route(route))
    }

    installedModules.add(name)
  }
}

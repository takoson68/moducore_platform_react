function createDefaultMeta() {
  return {
    access: {
      public: true,
      auth: false
    }
  }
}

function normalizeModuleDefinition(importedModule, fallbackName) {
  const definition = importedModule?.default || importedModule

  if (!definition) {
    return null
  }

  const setup = definition.setup || definition

  return {
    name: definition.name || fallbackName,
    meta: definition.meta || createDefaultMeta(),
    stores: setup.stores || {},
    panels: Array.isArray(setup.panels) ? setup.panels : [],
    routes: Array.isArray(setup.routes) ? setup.routes : [],
    services: setup.services || {}
  }
}

export function createProjectModulesRegistry(modules) {
  const moduleLoaders = Object.fromEntries(
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
      loadedModules.set(name, normalizeModuleDefinition(imported, name))
    }

    return loadedModules
  }

  function listModules() {
    return Object.keys(moduleLoaders).map((name) => ({
      name,
      meta: loadedModules.get(name)?.meta || createDefaultMeta()
    }))
  }

  async function installModules({ register }, { allowList = [] } = {}) {
    const modulesMap = await loadModules()
    const allowSet = Array.isArray(allowList) ? new Set(allowList) : null

    for (const [name, mod] of modulesMap.entries()) {
      if (!mod) continue
      if (allowSet && !allowSet.has(name)) continue
      if (installedModules.has(name)) continue

      for (const [storeName, factory] of Object.entries(mod.stores)) {
        register.store(storeName, factory)
      }

      mod.panels.forEach((panel) => register.panel(panel))
      mod.routes.forEach((route) => register.route(route))

      if (typeof register.service === 'function') {
        for (const [serviceName, service] of Object.entries(mod.services)) {
          register.service(serviceName, service)
        }
      }

      installedModules.add(name)
    }
  }

  return {
    moduleLoaders,
    listModules,
    installModules
  }
}

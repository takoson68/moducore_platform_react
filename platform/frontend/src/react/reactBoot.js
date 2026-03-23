import { discoverModules } from '../../projects/moduleDiscovery.js'
import { getProjectModuleRegistry } from '../../projects/modulesRegistry.js'
import { resolveWorldVisibility } from '@/core'
import { container } from '@/app/container/container.js'
import { createReactRegister } from './createReactRegister.js'

export async function reactBoot({ projectConfig, runtimeRegistry }) {
  const discoveredModules = discoverModules(projectConfig)
  const authStore = container.resolve('auth')
  const userContext = typeof authStore.getUserContext === 'function'
    ? authStore.getUserContext()
    : { isAuthenticated: false }

  const visibleModules = resolveWorldVisibility({
    discovered: discoveredModules,
    platformConfig: projectConfig,
    userContext
  })
  const allowList = visibleModules.map((entry) => entry.name)

  const registry = getProjectModuleRegistry(projectConfig?.name)
  const register = createReactRegister(container, runtimeRegistry)

  if (typeof registry?.installModules === 'function') {
    await registry.installModules({ register, container }, { allowList })
  }

  return {
    discoveredModules,
    allowList
  }
}

import { createProjectModulesRegistry } from '../../moduleRegistryFactory.js'

const modules = import.meta.glob('./*/index.js')
const registry = createProjectModulesRegistry(modules)

export const { moduleLoaders, listModules, installModules } = registry

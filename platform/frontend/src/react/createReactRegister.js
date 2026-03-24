import { lazy } from 'react'

export function createReactRegister(container, runtimeRegistry) {
  return {
    store(name, factory) {
      container.register(name, factory)
    },

    panel(descriptor) {
      if (!descriptor?.name) {
        throw new Error('[ReactRegister] panel descriptor 蝻箏? name')
      }

      runtimeRegistry.panels.set(descriptor.name, descriptor)
    },

    route(descriptor) {
      if (!descriptor?.path) {
        throw new Error('[ReactRegister] route descriptor 蝻箏? path')
      }

      const routeLoader = descriptor.component || descriptor.loadComponent
      const normalizedDescriptor = routeLoader && !descriptor.Component
        ? {
            ...descriptor,
            Component: lazy(async () => {
              const imported = await routeLoader()
              if (imported?.default) {
                return imported
              }

              throw new Error(`[ReactRegister] route "${descriptor.path}" lazy component 缺少 default export`)
            })
          }
        : descriptor

      runtimeRegistry.routes.set(normalizedDescriptor.path, normalizedDescriptor)
    }
  }
}

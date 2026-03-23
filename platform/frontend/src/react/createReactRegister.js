export function createReactRegister(container, runtimeRegistry) {
  return {
    store(name, factory) {
      container.register(name, factory)
    },

    panel(descriptor) {
      if (!descriptor?.name) {
        throw new Error('[ReactRegister] panel descriptor 缺少 name')
      }

      runtimeRegistry.panels.set(descriptor.name, descriptor)
    },

    route(descriptor) {
      if (!descriptor?.path) {
        throw new Error('[ReactRegister] route descriptor 缺少 path')
      }

      runtimeRegistry.routes.set(descriptor.path, descriptor)
    }
  }
}

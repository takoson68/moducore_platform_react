import { createApp } from 'vue'
import App from '../App.vue'
import world from '../world.js'
import '@project/styles/sass/main.sass'

export async function startVueApp({ projectConfig: preloadedProjectConfig = null } = {}) {
  await world.start()
  const projectConfig = preloadedProjectConfig || world.projectConfig()

  if (typeof document !== 'undefined') {
    document.title = projectConfig?.title || 'ModuCore Platform'
    document.documentElement.lang = 'zh-Hant'
  }

  createApp(App, {
    ...world.appProps(),
    projectConfig
  })
    .use(world.router())
    .mount('#app')
}

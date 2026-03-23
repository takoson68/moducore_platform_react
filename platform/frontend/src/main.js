//- src/main.js
async function startReactRuntime() {
  const { loadProjectConfig } = await import('../projects/loadProject.js')
  const projectConfig = await loadProjectConfig()
  const { startReactApp } = await import('./react/startReactApp.jsx')
  await startReactApp({ projectConfig })
}

async function startVueRuntime(projectConfig = null) {
  let config = projectConfig
  if (!config) {
    const { loadProjectConfig } = await import('../projects/loadProject.js')
    config = await loadProjectConfig()
  }
  const { startVueApp } = await import('./vue/startVueApp.js')
  await startVueApp({ projectConfig: config })
}

async function start() {
  const forcedRuntime = import.meta.env.VITE_UI_RUNTIME

  if (forcedRuntime === 'react') {
    await startReactRuntime()
    return
  }

  if (forcedRuntime === 'vue') {
    await startVueRuntime()
    return
  }

  const { loadProjectConfig } = await import('../projects/loadProject.js')
  const projectConfig = await loadProjectConfig()
  const uiRuntime = projectConfig?.uiRuntime || 'vue'

  if (uiRuntime === 'react') {
    const { startReactApp } = await import('./react/startReactApp.jsx')
    await startReactApp({ projectConfig })
    return
  }

  await startVueRuntime(projectConfig)
}

start()

//- src/main.js
async function start() {
  const { loadProjectConfig } = await import('../projects/loadProject.js')
  const projectConfig = await loadProjectConfig()
  const { startReactApp } = await import('./react/startReactApp.jsx')
  await startReactApp({ projectConfig })
}

start()

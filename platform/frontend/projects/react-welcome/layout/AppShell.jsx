function isNavRoute(route) {
  if (!route?.path) return false
  if (route.path.includes(':')) return false
  return route.meta?.nav !== false
}

function buildNavItems(world) {
  return world
    .getRoutes()
    .filter(isNavRoute)
    .sort((left, right) => (left.meta?.nav?.order || 0) - (right.meta?.nav?.order || 0))
    .map((route) => ({
      path: route.path,
      label: route.meta?.nav?.label || route.page || route.path
    }))
}

export function AppShell({ children, world }) {
  const runtime = world.getSnapshot()
  const navItems = buildNavItems(world)
  const projectTitle = runtime.projectConfig?.title || runtime.projectConfig?.name || 'React Project'

  return (
    <div className="react-shell">
      <aside className="react-shell__rail">
        <p className="react-shell__brand">{projectTitle}</p>
        {navItems.map((item) => (
          <button
            key={item.path}
            type="button"
            className={runtime.route === item.path ? 'is-active' : ''}
            onClick={() => world.navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </aside>

      <main className="react-shell__main">{children}</main>
    </div>
  )
}

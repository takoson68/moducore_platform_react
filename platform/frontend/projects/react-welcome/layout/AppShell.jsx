export function AppShell({ children, world }) {
  const currentRoute = world.getSnapshot().route

  return (
    <div className="react-shell">
      <aside className="react-shell__rail">
        <p className="react-shell__brand">React Runtime</p>
        <button
          type="button"
          className={currentRoute === '/welcome' ? 'is-active' : ''}
          onClick={() => world.navigate('/welcome')}
        >
          歡迎頁面
        </button>
        <button
          type="button"
          className={currentRoute === '/lifecycle' ? 'is-active' : ''}
          onClick={() => world.navigate('/lifecycle')}
        >
          Lifecycle 診斷
        </button>
      </aside>

      <main className="react-shell__main">{children}</main>
    </div>
  )
}

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
          className={currentRoute === '/status' ? 'is-active' : ''}
          onClick={() => world.navigate('/status')}
        >
          Status Page
        </button>
        <button
          type="button"
          className={currentRoute === '/todos' ? 'is-active' : ''}
          onClick={() => world.navigate('/todos')}
        >
          Todo List
        </button>
        <button
          type="button"
          className={currentRoute === '/form-draft' ? 'is-active' : ''}
          onClick={() => world.navigate('/form-draft')}
        >
          Form Draft
        </button>
      </aside>

      <main className="react-shell__main">{children}</main>
    </div>
  )
}

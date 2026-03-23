export function AppShell({ children, world }) {
  const currentRoute = world.getSnapshot().route

  const links = [
    { path: '/overview', label: '平台概覽' },
    { path: '/capabilities', label: '核心能力' },
    { path: '/workflow', label: '導入流程' }
  ]

  return (
    <div className="intro-shell">
      <header className="intro-hero">
        <div>
          <p className="intro-hero__eyebrow">ModuCore Platform</p>
          <h1>以世界治理與可插拔工程能力為核心的 React 平台</h1>
          <p className="intro-hero__copy">
            這個 project 用來測試平台切換能力，同時用簡單的三頁內容介紹平台價值、核心能力與導入方式。
          </p>
        </div>
      </header>

      <div className="intro-shell__body">
        <aside className="intro-nav">
          {links.map((link) => (
            <button
              key={link.path}
              type="button"
              className={currentRoute === link.path ? 'is-active' : ''}
              onClick={() => world.navigate(link.path)}
            >
              {link.label}
            </button>
          ))}
        </aside>

        <main className="intro-content">{children}</main>
      </div>
    </div>
  )
}

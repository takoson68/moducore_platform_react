export function StatusPanel({ world }) {
  const signalStore = world.store('welcomeSharedSignal')
  const signal = signalStore.useStore()

  return (
    <article className="react-card">
      <p className="react-eyebrow">status-panel</p>
      <h2>共享 store signal 狀態</h2>
      <dl className="react-status-list">
        <div>
          <dt>Count</dt>
          <dd>{signal.count}</dd>
        </div>
        <div>
          <dt>Message</dt>
          <dd>{signal.message}</dd>
        </div>
        <div>
          <dt>Source</dt>
          <dd>{signal.source}</dd>
        </div>
        <div>
          <dt>Updated At</dt>
          <dd>{signal.updatedAt || '尚未更新'}</dd>
        </div>
      </dl>
      <div className="react-actions">
        <button type="button" onClick={() => signalStore.reset()}>
          重置 signal
        </button>
      </div>
    </article>
  )
}

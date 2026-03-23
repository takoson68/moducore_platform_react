import { useEffect } from 'react'
import { useObservableSnapshot } from '@/react/useObservableSnapshot.js'

export function StatusPanel({ world }) {
  const signal = useObservableSnapshot(world.signalStore())

  useEffect(() => {
    world.recordLifecycle('module:mount:status-panel')
    return () => {
      world.recordLifecycle('module:unmount:status-panel')
    }
  }, [world])

  return (
    <article className="react-card">
      <p className="react-eyebrow">status-panel</p>
      <h2>共享 signal 狀態</h2>
      <dl className="react-status-list">
        <div>
          <dt>Count</dt>
          <dd>{signal.count}</dd>
        </div>
        <div>
          <dt>Message</dt>
          <dd>{signal.message}</dd>
        </div>
      </dl>
      <div className="react-actions">
        <button type="button" onClick={() => world.signalStore().reset()}>
          重置 signal
        </button>
      </div>
    </article>
  )
}

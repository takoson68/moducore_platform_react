import { useEffect } from 'react'

export function HelloPanel({ world }) {
  useEffect(() => {
    world.recordLifecycle('module:mount:hello-panel')
    return () => {
      world.recordLifecycle('module:unmount:hello-panel')
    }
  }, [world])

  return (
    <article className="react-card">
      <p className="react-eyebrow">hello-panel</p>
      <h2>平台核心仍可被 React 接入</h2>
      <p className="react-copy">
        這個模組只做兩件事：更新共享 signal，以及證明模組在 React runtime 下可以獨立掛載。
      </p>
      <div className="react-actions">
        <button type="button" onClick={() => world.signalStore().increment()}>
          +1 signal
        </button>
        <button
          type="button"
          className="react-actions__ghost"
          onClick={() => world.signalStore().setMessage('訊號由 hello-panel 主動更新')}
        >
          改寫訊息
        </button>
      </div>
    </article>
  )
}

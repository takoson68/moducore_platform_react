export function HelloPanel({ world }) {
  const signalStore = world.store('welcomeSharedSignal')
  const signal = signalStore.useStore()

  return (
    <article className="react-card">
      <p className="react-eyebrow">hello-panel</p>
      <h2>平台核心仍可被 React 接入</h2>
      <p className="react-copy">
        這個模組直接操作 `welcomeSharedSignal` store。若按鈕更新後其他區塊同步重渲染，就表示 `_storeFactory.js` 的訂閱能力有成功接上。
      </p>
      <div className="react-signal-strip">
        <span>Store Count：{signal.count}</span>
        <span>{signal.message}</span>
      </div>
      <div className="react-actions">
        <button type="button" onClick={() => signalStore.increment()}>
          +1 signal
        </button>
        <button
          type="button"
          className="react-actions__ghost"
          onClick={() => signalStore.setMessage('訊號由 hello-panel 主動更新')}
        >
          改寫訊息
        </button>
      </div>
    </article>
  )
}

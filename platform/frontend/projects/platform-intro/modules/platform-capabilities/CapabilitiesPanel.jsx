import { useEffect } from 'react'

export function CapabilitiesPanel({ world }) {
  useEffect(() => {
    world.recordLifecycle('module:mount:platform-capabilities')
    return () => {
      world.recordLifecycle('module:unmount:platform-capabilities')
    }
  }, [world])

  return (
    <article className="intro-card">
      <h2>可帶走的核心能力</h2>
      <ul className="intro-list">
        <li>清楚的 world / project / module 分層。</li>
        <li>一致的 project 切換方式。</li>
        <li>可以逐步擴充但不輕易失控的 boot 與 runtime。</li>
      </ul>
    </article>
  )
}

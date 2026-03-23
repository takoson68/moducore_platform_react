import { useEffect } from 'react'

export function StoryPanel({ world }) {
  useEffect(() => {
    world.recordLifecycle('module:mount:platform-story')
    return () => {
      world.recordLifecycle('module:unmount:platform-story')
    }
  }, [world])

  return (
    <article className="intro-card">
      <h2>平台定位</h2>
      <p>
        ModuCore 不只是前端模板，而是把世界治理、工程規章與專案實例拆層管理的平台。這使得專案切換與能力替換都能在同一套結構下進行。
      </p>
    </article>
  )
}

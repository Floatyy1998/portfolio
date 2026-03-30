import { useState, useCallback } from 'react'
import type { WinState } from '../types/desktop'
import type { AppDef } from '../types/desktop'

export function useWindowManager(appDefs: AppDef[], iconRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>) {
  const [windows, setWindows] = useState<Record<string, WinState>>({})
  const [topZ, setTopZ] = useState(10)

  const openWindow = useCallback(
    (id: string) => {
      setWindows(prev => {
        const existing = prev[id]
        const idx = appDefs.findIndex(a => a.id === id)
        const app = appDefs[idx]
        const newZ = topZ + 1
        setTopZ(newZ)
        if (existing?.isOpen && existing.minimized) return { ...prev, [id]: { ...existing, minimized: false, z: newZ } }
        if (existing?.isOpen) return { ...prev, [id]: { ...existing, z: newZ } }
        return {
          ...prev,
          [id]: {
            isOpen: true,
            minimized: false,
            maximized: false,
            z: newZ,
            x: 60 + (idx % 5) * 35,
            y: 50 + (idx % 5) * 30,
            w: app.w,
            h: Math.min(app.h, window.innerHeight - 170),
          },
        }
      })
    },
    [appDefs, topZ],
  )

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], isOpen: false, maximized: false } }))
  }, [])

  const minimizeWindow = useCallback(
    (id: string) => {
      const idx = appDefs.findIndex(a => a.id === id)
      const icon = iconRefs.current[idx]
      let minTarget: { x: number; y: number } | undefined
      if (icon) {
        const r = icon.getBoundingClientRect()
        minTarget = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
      }
      setWindows(prev => ({ ...prev, [id]: { ...prev[id], minimized: true, minTarget } }))
    },
    [appDefs, iconRefs],
  )

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => {
      const s = prev[id]
      if (!s) return prev
      if (s.maximized) return { ...prev, [id]: { ...s, maximized: false, ...(s.preMax || {}) } }
      return { ...prev, [id]: { ...s, maximized: true, preMax: { x: s.x, y: s.y, w: s.w, h: s.h } } }
    })
  }, [])

  const focusWindow = useCallback(
    (id: string) => {
      const z = topZ + 1
      setTopZ(z)
      setWindows(prev => ({ ...prev, [id]: { ...prev[id], z } }))
    },
    [topZ],
  )

  const resizeWindow = useCallback((id: string, w: number, h: number) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], w, h } }))
  }, [])

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], x, y } }))
  }, [])

  const closeAll = useCallback(() => {
    setWindows({})
  }, [])

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    resizeWindow,
    moveWindow,
    closeAll,
  }
}

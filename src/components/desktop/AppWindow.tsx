import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { AppDef, WinState } from '../../types/desktop'

export function AppWindow({
  app,
  state,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onResize,
  onMove,
  zoom = 100,
  fullHeight,
  children,
}: {
  app: AppDef
  state: WinState
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  onResize: (w: number, h: number) => void
  onMove: (x: number, y: number) => void
  zoom?: number
  fullHeight?: boolean
  children: React.ReactNode
}) {
  const winRef = useRef<HTMLDivElement>(null)
  const skipTransition = useRef(false)
  const [visuallyMinimized, setVisuallyMinimized] = useState(false)
  useEffect(() => {
    if (state.minimized) {
      const t = setTimeout(() => setVisuallyMinimized(true), 350)
      return () => clearTimeout(t)
    } else {
      setVisuallyMinimized(false)
    }
  }, [state.minimized])
  const handleDragStart = (e: React.PointerEvent) => {
    if (state.maximized) return
    e.preventDefault()
    const el = winRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const offX = e.clientX - rect.left,
      offY = e.clientY - rect.top
    const clamp = (x: number, y: number) => ({
      x: Math.max(0, Math.min(x, window.innerWidth - w)),
      y: Math.max(44, Math.min(y, window.innerHeight - h - 76)),
    })
    const onPointerMove = (ev: PointerEvent) => {
      const c = clamp(ev.clientX - offX, ev.clientY - offY)
      el.style.left = c.x + 'px'
      el.style.top = c.y + 'px'
    }
    const onPointerUp = (ev: PointerEvent) => {
      const c = clamp(ev.clientX - offX, ev.clientY - offY)
      el.style.left = ''
      el.style.top = ''
      skipTransition.current = true
      onMove(c.x, c.y)
      requestAnimationFrame(() => {
        skipTransition.current = false
      })
      requestAnimationFrame(() => {
        skipTransition.current = false
      })
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }
  const handleResizeStart = (e: React.PointerEvent) => {
    if (state.maximized) return
    e.preventDefault()
    e.stopPropagation()
    const sX = e.clientX,
      sY = e.clientY,
      sW = state.w,
      sH = state.h
    const onPointerMove = (ev: PointerEvent) =>
      onResize(Math.max(app.minW || 300, sW + ev.clientX - sX), Math.max(app.minH || 200, sH + ev.clientY - sY))
    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }
  const w = state.maximized ? window.innerWidth : state.w
  const h = state.maximized ? window.innerHeight - 120 : state.h
  return (
    <motion.div
      ref={winRef}
      onPointerDown={onFocus}
      className="absolute"
      style={{
        zIndex: visuallyMinimized ? -1 : state.z,
        pointerEvents: state.minimized ? 'none' : 'auto',
      }}
      initial={false}
      animate={
        state.minimized
          ? {
              left: state.minTarget ? state.minTarget.x - w / 2 : state.x,
              top: state.minTarget ? state.minTarget.y - h / 2 : state.y,
              scale: 0.1,
              opacity: 0,
              width: w,
              height: h,
              transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
            }
          : {
              left: state.maximized ? 0 : state.x,
              top: state.maximized ? 44 : state.y,
              scale: 1,
              opacity: 1,
              width: w,
              height: h,
              // eslint-disable-next-line react-hooks/refs -- intentional: read ref during render for performance (avoids re-renders)
              transition: skipTransition.current ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 25 },
            }
      }
      exit={{ scale: 0.3, opacity: 0, transition: { duration: 0.2 } }}
    >
      <div
        className="w-full h-full rounded-2xl overflow-hidden flex flex-col border border-white/[0.08]"
        style={{ boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.1)' }}
      >
        <div
          onPointerDown={handleDragStart}
          onDoubleClick={onMaximize}
          className="h-12 flex items-center px-4 bg-surface-light backdrop-blur-xl cursor-grab active:cursor-grabbing select-none shrink-0 border-b border-white/[0.05]"
        >
          <div className="flex gap-2">
            <button
              onClick={e => {
                e.stopPropagation()
                onClose()
              }}
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] hover:brightness-125 transition-all"
            />
            <button
              onClick={e => {
                e.stopPropagation()
                onMinimize()
              }}
              className="w-3.5 h-3.5 rounded-full bg-[#febc2e] hover:brightness-125 transition-all"
            />
            <button
              onClick={e => {
                e.stopPropagation()
                onMaximize()
              }}
              className="w-3.5 h-3.5 rounded-full bg-[#28c840] hover:brightness-125 transition-all"
            />
          </div>
          <div className="flex-1 text-center text-sm text-text-muted font-medium truncate mx-4 flex items-center justify-center gap-1.5">
            <app.icon size={14} /> {app.label}
          </div>
          <div className="w-16" />
        </div>
        <div
          className={`flex-1 overflow-x-hidden overflow-hidden relative bg-bg ${fullHeight ? 'flex flex-col' : 'overflow-y-auto'}`}
        >
          {fullHeight ? (
            children
          ) : (
            <div
              style={
                zoom !== 100
                  ? { transform: `scale(${zoom / 100})`, transformOrigin: 'top left', width: `${10000 / zoom}%` }
                  : undefined
              }
            >
              {children}
            </div>
          )}
        </div>
        {!state.maximized && (
          <div
            onPointerDown={handleResizeStart}
            className="absolute bottom-1 right-1 w-5 h-5 cursor-se-resize z-30 group rounded-bl-xl"
          >
            <svg
              className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 text-white/20 group-hover:text-white/50 transition-colors"
              viewBox="0 0 10 10"
            >
              <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.5" />
              <line x1="10" y1="6" x2="6" y2="10" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  )
}

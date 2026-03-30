import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LuTerminal as Terminal, LuGamepad2 as Gamepad2, LuX as XIcon } from 'react-icons/lu'
import { useLanguage } from '../context/LanguageContext'
import { appDefs } from '../data/portfolio'
import { useWindowManager } from '../hooks/useWindowManager'
import { MatrixRain, MeshGradientWP, StarfieldWP } from './desktop/Wallpapers'
import { AppWindow } from './desktop/AppWindow'
import { Toast } from './desktop/Toast'
import { WindowContents } from './desktop/WindowContents'

const konamiSeq = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function Desktop() {
  const { t, lang, setLang } = useLanguage()
  const desktopRef = useRef<HTMLDivElement>(null)
  const dockRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([])
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    resizeWindow,
    moveWindow,
    closeAll,
  } = useWindowManager(appDefs, iconRefs)
  const [time, setTime] = useState(new Date())
  const [isMobile, setIsMobile] = useState(false)
  const [notifications, setNotifications] = useState<{ id: number; text: string }[]>([])
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null)
  const [wpIdx, setWpIdx] = useState(0)
  const wpNames = ['Mesh', 'Matrix Rain', 'Starfield']
  const [mobileApp, setMobileApp] = useState<string | null>(null)
  const [zoom, setZoom] = useState(() => {
    const saved = localStorage.getItem('kd-zoom')
    return saved ? Number(saved) : 100
  })
  const [, setKonamiBuf] = useState<string[]>([])

  const notify = useCallback((text: string) => {
    const id = Date.now()
    setNotifications(n => [...n, { id, text }])
    setTimeout(() => setNotifications(n => n.filter(x => x.id !== id)), 5000)
  }, [])

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768)
    c()
    window.addEventListener('resize', c)
    return () => window.removeEventListener('resize', c)
  }, [])
  useEffect(() => {
    localStorage.setItem('kd-zoom', String(zoom))
  }, [zoom])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
        e.preventDefault()
        setZoom(z => Math.min(150, z + 10))
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault()
        setZoom(z => Math.max(70, z - 10))
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault()
        setZoom(100)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    const t2 = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(t2)
  }, [])
  const didInit = useRef(false)
  useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    if (!isMobile) {
      setTimeout(() => openWindow('about'), 500)
    }
    setTimeout(
      () =>
        notify(
          lang === 'de'
            ? 'Willkommen bei KD OS! Rechtsklick für Optionen.'
            : 'Welcome to KD OS! Right-click for options.',
        ),
      1500,
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally run only once on mount
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setKonamiBuf(buf => {
        const next = [...buf, e.key].slice(-10)
        if (next.length === 10 && next.every((k, i) => k === konamiSeq[i])) {
          notify('🎮 KONAMI CODE ACTIVATED! You are a true gamer. 🏆')
          setWpIdx(1)
          return []
        }
        return next
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [notify])

  useEffect(() => {
    if (isMobile) return
    const dock = dockRef.current
    if (!dock) return
    const onMove = (e: MouseEvent) => {
      iconRefs.current.forEach(icon => {
        if (!icon) return
        const rect = icon.getBoundingClientRect()
        const dist = Math.abs(e.clientX - (rect.left + rect.width / 2))
        const s = Math.max(1, 1.4 - dist / 110)
        icon.style.transform = `scale(${s}) translateY(${Math.max(0, -(s - 1) * 18)}px)`
      })
    }
    const onLeave = () => {
      iconRefs.current.forEach(icon => {
        if (icon) icon.style.transform = 'scale(1) translateY(0)'
      })
    }
    dock.addEventListener('mousemove', onMove)
    dock.addEventListener('mouseleave', onLeave)
    return () => {
      dock.removeEventListener('mousemove', onMove)
      dock.removeEventListener('mouseleave', onLeave)
    }
  }, [isMobile])

  const activeWin = Object.entries(windows)
    .filter(([, s]) => s.isOpen && !s.minimized)
    .sort(([, a], [, b]) => b.z - a.z)[0]

  const labels: Record<string, string> = {
    about: t.nav.about,
    skills: t.nav.skills,
    experience: t.nav.experience,
    projects: t.nav.projects,
    contact: t.nav.contact,
    terminal: 'Terminal',
    snake: 'Snake',
  }

  if (isMobile) {
    return (
      <div className="h-[100dvh] w-screen overflow-hidden relative bg-bg flex flex-col">
        <div className="absolute inset-0">
          {wpIdx === 0 ? <MeshGradientWP /> : wpIdx === 1 ? <MatrixRain /> : <StarfieldWP />}
        </div>
        <div className="relative z-10 h-10 flex items-center px-4 bg-bg/70 backdrop-blur-2xl border-b border-white/[0.04] shrink-0">
          <span className="font-display font-bold text-base text-primary">
            KD<span className="text-secondary">.</span>
          </span>
          <div className="ml-auto flex items-center gap-4">
            <button onClick={() => setLang(lang === 'en' ? 'de' : 'en')} className="text-xs text-text-muted font-mono">
              {lang === 'en' ? 'DE' : 'EN'}
            </button>
            <span className="text-xs text-text-muted tabular-nums">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        <AnimatePresence>
          {mobileApp ? (
            <motion.div
              key="app"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute inset-0 z-20 flex flex-col bg-bg"
              style={{ top: 40 }}
            >
              <div className="h-12 flex items-center justify-between px-4 shrink-0 border-b border-white/[0.04]">
                <div className="flex items-center gap-2 text-text text-sm font-medium">
                  {(() => {
                    const a = appDefs.find(x => x.id === mobileApp)
                    return a ? (
                      <>
                        <a.icon size={16} className="text-primary" />
                        {labels[mobileApp]}
                      </>
                    ) : null
                  })()}
                </div>
                <button
                  onClick={() => setMobileApp(null)}
                  className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-text-muted"
                >
                  <XIcon size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <WindowContents id={mobileApp} openWindow={openWindow} notify={notify} />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="flex-1 relative z-10 flex flex-col items-center justify-center px-6">
          <div className="text-center mb-12">
            <p className="font-display font-black text-6xl text-text tabular-nums">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-text-muted text-sm mt-1">
              {time.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {appDefs.map(app => (
              <button
                key={app.id}
                onClick={() => setMobileApp(app.id)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-surface/80 backdrop-blur-xl border border-white/[0.06] flex items-center justify-center text-text-muted group-active:scale-90 transition-transform">
                  <app.icon size={28} />
                </div>
                <span className="text-text text-[11px] font-medium">{labels[app.id] || app.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative z-10 h-6 flex items-center justify-center shrink-0">
          <div className="w-32 h-1 rounded-full bg-white/20" />
        </div>

        <div className="fixed top-12 right-3 z-[250] space-y-2">
          <AnimatePresence>
            {notifications.map(n => (
              <Toast key={n.id} text={n.text} onDismiss={() => setNotifications(ns => ns.filter(x => x.id !== n.id))} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={desktopRef}
      className="h-screen w-screen overflow-hidden relative bg-bg select-none"
      onContextMenu={e => {
        e.preventDefault()
        setCtxMenu({ x: e.clientX, y: e.clientY })
      }}
      onClick={() => setCtxMenu(null)}
    >
      <div className="absolute inset-0">
        {wpIdx === 0 ? <MeshGradientWP /> : wpIdx === 1 ? <MatrixRain /> : <StarfieldWP />}
      </div>
      <div className="absolute top-0 left-0 right-0 h-11 z-[200] flex items-center px-5 bg-bg/70 backdrop-blur-2xl border-b border-white/[0.04]">
        <span className="font-display font-bold text-base text-primary cursor-default">
          KD<span className="text-secondary">.</span>
        </span>
        {activeWin && <span className="ml-3 text-xs text-text-muted font-medium">{labels[activeWin[0]] || ''}</span>}
        <div className="ml-auto flex items-center gap-5">
          {zoom !== 100 && <span className="text-xs text-text-muted font-mono">{zoom}%</span>}
          <span className="text-xs text-text-muted">{wpNames[wpIdx]}</span>
          <Link to="/impressum" className="text-xs text-text-muted hover:text-text transition-colors">
            Legal
          </Link>
          <button
            onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
            className="text-xs text-text-muted hover:text-text transition-colors font-mono"
          >
            {lang === 'en' ? 'DE' : 'EN'}
          </button>
          <span className="text-xs text-text-muted tabular-nums">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
      <AnimatePresence>
        {ctxMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed z-[300] bg-surface/95 backdrop-blur-2xl border border-white/[0.08] rounded-xl py-1.5 shadow-2xl min-w-[200px]"
            style={{ left: ctxMenu.x, top: ctxMenu.y }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => {
                notify('KD OS v2.0 — React 19 + TypeScript + Framer Motion\nby Konrad Dinges')
                setCtxMenu(null)
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-text hover:bg-white/[0.05] transition-colors"
            >
              About KD OS
            </button>
            <button
              onClick={() => {
                setWpIdx(w => (w + 1) % wpNames.length)
                setCtxMenu(null)
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-text hover:bg-white/[0.05] transition-colors"
            >
              Wallpaper: {wpNames[(wpIdx + 1) % wpNames.length]}
            </button>
            <div className="border-t border-white/[0.04] my-1" />
            <div className="px-4 py-2 flex items-center justify-between">
              <span className="text-sm text-text">{lang === 'de' ? 'Anzeige' : 'Display'}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoom(z => Math.max(70, z - 10))}
                  className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-text text-sm font-bold transition-colors flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-xs text-text-muted w-10 text-center font-mono">{zoom}%</span>
                <button
                  onClick={() => setZoom(z => Math.min(150, z + 10))}
                  className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-text text-sm font-bold transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
            <div className="border-t border-white/[0.04] my-1" />
            <button
              onClick={() => {
                openWindow('terminal')
                setCtxMenu(null)
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-text hover:bg-white/[0.05] transition-colors flex items-center gap-2"
            >
              <Terminal size={14} />
              Open Terminal
            </button>
            <button
              onClick={() => {
                openWindow('snake')
                setCtxMenu(null)
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-text hover:bg-white/[0.05] transition-colors flex items-center gap-2"
            >
              <Gamepad2 size={14} />
              Play Snake
            </button>
            <div className="border-t border-white/[0.04] my-1" />
            <button
              onClick={() => {
                closeAll()
                setCtxMenu(null)
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-text-muted hover:bg-white/[0.05] transition-colors"
            >
              Close All Windows
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed top-11 right-4 z-[250] space-y-2">
        <AnimatePresence>
          {notifications.map(n => (
            <Toast key={n.id} text={n.text} onDismiss={() => setNotifications(ns => ns.filter(x => x.id !== n.id))} />
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {appDefs.map(app => {
          const s = windows[app.id]
          if (!s?.isOpen) return null
          return (
            <AppWindow
              key={app.id}
              app={{ ...app, label: labels[app.id] || app.label }}
              state={s}
              onClose={() => closeWindow(app.id)}
              onMinimize={() => minimizeWindow(app.id)}
              onMaximize={() => maximizeWindow(app.id)}
              onFocus={() => focusWindow(app.id)}
              onResize={(w, h) => resizeWindow(app.id, w, h)}
              onMove={(x, y) => moveWindow(app.id, x, y)}
              zoom={zoom}
              fullHeight={app.id !== 'about'}
            >
              <WindowContents id={app.id} openWindow={openWindow} notify={notify} />
            </AppWindow>
          )
        })}
      </AnimatePresence>
      <div
        ref={dockRef}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[200] flex items-end gap-1.5 px-4 py-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08]"
      >
        {appDefs.map((app, i) => {
          const ws = windows[app.id]
          const isOpen = !!ws?.isOpen
          const isActive = isOpen && !ws?.minimized
          return (
            <button
              key={app.id}
              ref={el => {
                iconRefs.current[i] = el
              }}
              onClick={() => openWindow(app.id)}
              className="group relative flex flex-col items-center origin-bottom"
              style={{ transition: 'transform 0.15s cubic-bezier(0.33,1,0.68,1)' }}
            >
              <span className="absolute -top-10 px-3 py-1.5 rounded-lg bg-surface border border-white/[0.06] text-text text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {labels[app.id] || app.label}
              </span>
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-200 ${isActive ? 'bg-primary/15 text-primary' : isOpen ? 'bg-primary/8 text-primary/60' : 'bg-surface-light/80 text-text-muted group-hover:text-text'}`}
              >
                <app.icon size={24} />
              </div>
              <div
                className={`w-1.5 h-1.5 rounded-full mt-1 transition-all ${isOpen ? 'bg-primary' : 'bg-transparent'}`}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

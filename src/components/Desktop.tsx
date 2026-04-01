import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LuGamepad2 as Gamepad2, LuMusic, LuTrash2, LuTerminal as Terminal, LuX as XIcon } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { appDefs } from '../data/portfolio'
import { useWindowManager } from '../hooks/useWindowManager'
import { AppWindow } from './desktop/AppWindow'
import { Screensaver } from './desktop/Screensaver'
import { Spotlight } from './desktop/Spotlight'
import { Toast } from './desktop/Toast'
import { MatrixRain, MeshGradientWP, StarfieldWP } from './desktop/Wallpapers'
import { MusicPlayer } from './desktop/MusicPlayer'
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
  const [shake, setShake] = useState(false)
  const [showScreensaver, setShowScreensaver] = useState(false)
  const [showSpotlight, setShowSpotlight] = useState(false)
  const [altTabOpen, setAltTabOpen] = useState(false)
  const [altTabIdx, setAltTabIdx] = useState(0)
  const [forceQuitOpen, setForceQuitOpen] = useState(false)
  const [musicOpen, setMusicOpen] = useState(false)
  const screensaverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [, setKonamiBuf] = useState<string[]>([])
  const [restartPhase, setRestartPhase] = useState<null | 'confirm' | 'shutdown' | 'boot'>(() => {
    const saved = localStorage.getItem('kd-restart-restore')
    if (saved) {
      localStorage.removeItem('kd-restart-restore')
      return 'boot'
    }
    return null
  })
  const [restartReopen, setRestartReopen] = useState(true)

  const notify = useCallback((text: string) => {
    const id = Date.now()
    setNotifications(n => [...n, { id, text }])
    setTimeout(() => setNotifications(n => n.filter(x => x.id !== id)), 5000)
  }, [])

  const handleOpenWindow = useCallback(
    (id: string) => {
      openWindow(id)
    },
    [openWindow],
  )

  const handleCloseWindow = useCallback(
    (id: string) => {
      closeWindow(id)
    },
    [closeWindow],
  )

  const triggerShake = useCallback(() => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }, [])

  const resetScreensaverTimer = useCallback(() => {
    if (screensaverTimer.current) clearTimeout(screensaverTimer.current)
    setShowScreensaver(false)
    screensaverTimer.current = setTimeout(() => setShowScreensaver(true), 60000)
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
    const savedWindows = localStorage.getItem('kd-restart-windows')
    if (savedWindows) {
      localStorage.removeItem('kd-restart-windows')
      const parsed = JSON.parse(savedWindows)
      Object.keys(parsed).forEach(id => {
        setTimeout(() => handleOpenWindow(id), 300)
      })
      setTimeout(() => notify(lang === 'de' ? 'Fenster wiederhergestellt.' : 'Windows restored.'), 1500)
    } else if (!isMobile) {
      setTimeout(() => handleOpenWindow('about'), 500)
    }
    if (!savedWindows) {
      setTimeout(
        () =>
          notify(
            lang === 'de'
              ? 'Willkommen bei KD OS! Rechtsklick für Optionen.'
              : 'Welcome to KD OS! Right-click for options.',
          ),
        1500,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally run only once on mount
  }, [])

  const doRestart = () => {
    if (restartReopen) {
      const openWindows = Object.fromEntries(Object.entries(windows).filter(([, s]) => s.isOpen))
      localStorage.setItem('kd-restart-windows', JSON.stringify(openWindows))
      localStorage.setItem('kd-restart-restore', '1')
    }
    setRestartPhase('shutdown')
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  }

  // Screensaver idle timer
  useEffect(() => {
    resetScreensaverTimer()
    const reset = () => resetScreensaverTimer()
    window.addEventListener('mousemove', reset)
    window.addEventListener('keydown', reset)
    window.addEventListener('mousedown', reset)
    return () => {
      window.removeEventListener('mousemove', reset)
      window.removeEventListener('keydown', reset)
      window.removeEventListener('mousedown', reset)
      if (screensaverTimer.current) clearTimeout(screensaverTimer.current)
    }
  }, [resetScreensaverTimer])

  // Alt+Tab, Cmd+K, Ctrl+Alt+Esc listeners
  useEffect(() => {
    const openWinIds = Object.entries(windows)
      .filter(([, s]) => s.isOpen)
      .sort(([, a], [, b]) => b.z - a.z)
      .map(([id]) => id)

    const onKeyDown = (e: KeyboardEvent) => {
      // Spotlight: Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowSpotlight(s => !s)
        return
      }
      // Force Quit: Ctrl+Shift+Q
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'q') {
        e.preventDefault()
        setForceQuitOpen(f => !f)
        return
      }
      // Window Switcher: ` (backtick/tilde key)
      if (e.key === '`' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const active = document.activeElement?.tagName
        if (active === 'INPUT' || active === 'TEXTAREA') return
        e.preventDefault()
        if (!altTabOpen && openWinIds.length > 0) {
          setAltTabOpen(true)
          setAltTabIdx(0)
        } else if (altTabOpen) {
          setAltTabIdx(i => (i + 1) % openWinIds.length)
        }
        return
      }
      // Escape closes window switcher
      if (e.key === 'Escape' && altTabOpen) {
        setAltTabOpen(false)
        return
      }
      // Enter selects in window switcher
      if (e.key === 'Enter' && altTabOpen) {
        if (openWinIds[altTabIdx]) focusWindow(openWinIds[altTabIdx])
        setAltTabOpen(false)
        return
      }
    }
    const onKeyUp = () => {}
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [windows, altTabOpen, altTabIdx, focusWindow])

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
    notes: 'Notes',
    settings: lang === 'de' ? 'Einstellungen' : 'Settings',
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
                <WindowContents
                  id={mobileApp}
                  openWindow={handleOpenWindow}
                  notify={notify}
                  onShake={triggerShake}
                  zoom={zoom}
                  setZoom={setZoom}
                  wpIdx={wpIdx}
                  setWpIdx={setWpIdx}
                  wpNames={wpNames}
                  setLangProp={setLang}
                  langProp={lang}
                />
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
      className={`h-screen w-screen overflow-hidden relative bg-bg select-none${shake ? ' desktop-shake' : ''}`}
      onContextMenu={e => {
        e.preventDefault()
        setCtxMenu({ x: e.clientX, y: e.clientY })
      }}
      onClick={() => { setCtxMenu(null); setMusicOpen(false) }}
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
          <div className="relative">
            <button
              onClick={e => { e.stopPropagation(); setMusicOpen(m => !m) }}
              className="text-xs text-text-muted hover:text-text transition-colors"
            >
              <LuMusic size={14} />
            </button>
            <MusicPlayer isOpen={musicOpen} onClose={() => setMusicOpen(false)} />
          </div>
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
                handleOpenWindow('terminal')
                setCtxMenu(null)
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-text hover:bg-white/[0.05] transition-colors flex items-center gap-2"
            >
              <Terminal size={14} />
              Open Terminal
            </button>
            <button
              onClick={() => {
                handleOpenWindow('snake')
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
            <button
              onClick={() => {
                setRestartPhase('confirm')
                setCtxMenu(null)
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-text-muted hover:bg-white/[0.05] transition-colors"
            >
              {lang === 'de' ? 'Neustart...' : 'Restart...'}
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
              onClose={() => handleCloseWindow(app.id)}
              onMinimize={() => minimizeWindow(app.id)}
              onMaximize={() => maximizeWindow(app.id)}
              onFocus={() => focusWindow(app.id)}
              onResize={(w, h) => resizeWindow(app.id, w, h)}
              onMove={(x, y) => moveWindow(app.id, x, y)}
              zoom={zoom}
              fullHeight={app.id !== 'about'}
            >
              <WindowContents
                id={app.id}
                openWindow={handleOpenWindow}
                notify={notify}
                onShake={triggerShake}
                zoom={zoom}
                setZoom={setZoom}
                wpIdx={wpIdx}
                setWpIdx={setWpIdx}
                wpNames={wpNames}
                setLangProp={setLang}
                langProp={lang}
              />
            </AppWindow>
          )
        })}
      </AnimatePresence>

      {/* Restart confirm dialog */}
      <AnimatePresence>
        {restartPhase === 'confirm' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setRestartPhase(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-surface border border-white/[0.08] rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-display font-bold text-lg text-text mb-2">
                {lang === 'de' ? 'Neustart' : 'Restart'}
              </h3>
              <p className="text-text-muted text-sm mb-5">
                {lang === 'de'
                  ? 'KD OS wird neu gestartet. Möchtest du deine Fenster nach dem Neustart wiederherstellen?'
                  : 'KD OS will restart. Do you want to reopen your windows after restart?'}
              </p>
              <label className="flex items-center gap-3 mb-6 cursor-pointer group">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${restartReopen ? 'bg-primary border-primary' : 'border-white/20'}`}
                  onClick={() => setRestartReopen(r => !r)}
                >
                  {restartReopen && <span className="text-bg text-xs font-bold">✓</span>}
                </div>
                <span className="text-text text-sm group-hover:text-white transition-colors">
                  {lang === 'de' ? 'Fenster nach Neustart wiederherstellen' : 'Reopen windows after restart'}
                </span>
              </label>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setRestartPhase(null)}
                  className="px-4 py-2 rounded-lg text-text-muted text-sm hover:text-text transition-colors"
                >
                  {lang === 'de' ? 'Abbrechen' : 'Cancel'}
                </button>
                <button
                  onClick={doRestart}
                  className="px-5 py-2 rounded-lg bg-primary text-bg text-sm font-bold hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
                >
                  {lang === 'de' ? 'Neustarten' : 'Restart'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shutdown screen */}
      <AnimatePresence>
        {restartPhase === 'shutdown' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[600] bg-bg flex flex-col items-center justify-center"
          >
            <motion.svg
              viewBox="0 0 120 120"
              className="w-28 h-28 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <text
                x="60"
                y="78"
                textAnchor="middle"
                fontFamily="Syne, sans-serif"
                fontWeight="900"
                fontSize="48"
                fill="#00e5ff"
              >
                KD
              </text>
            </motion.svg>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-text-muted text-xs mt-4 font-mono"
            >
              {lang === 'de' ? 'Wird neu gestartet...' : 'Restarting...'}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Boot screen (after restart) */}
      <AnimatePresence>
        {restartPhase === 'boot' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[600] bg-bg flex flex-col items-center justify-center"
          >
            <svg viewBox="0 0 120 120" className="w-28 h-28 mb-8">
              <text
                x="60"
                y="78"
                textAnchor="middle"
                fontFamily="Syne, sans-serif"
                fontWeight="900"
                fontSize="48"
                fill="#00e5ff"
              >
                KD
              </text>
            </svg>
            <div className="w-32 h-[2px] bg-surface-light rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeOut' }}
                onAnimationComplete={() => setRestartPhase(null)}
              />
            </div>
            <p className="text-text-muted text-xs font-mono">
              {lang === 'de' ? 'Wird gestartet...' : 'Starting up...'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Trash Icon */}
      <div className="absolute bottom-20 right-6 z-[50] flex flex-col items-center gap-1 opacity-40 hover:opacity-60 transition-opacity pointer-events-none">
        <LuTrash2 size={32} className="text-text-muted" />
        <span className="text-[10px] text-text-muted">Trash</span>
      </div>

      {/* Alt+Tab Window Switcher */}
      <AnimatePresence>
        {altTabOpen &&
          (() => {
            const openWinIds = Object.entries(windows)
              .filter(([, s]) => s.isOpen)
              .sort(([, a], [, b]) => b.z - a.z)
              .map(([id]) => id)
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[450] bg-black/40 backdrop-blur-sm flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  className="flex gap-3 px-6 py-5 rounded-2xl bg-surface/90 backdrop-blur-2xl border border-white/[0.08] shadow-2xl"
                >
                  {openWinIds.map((id, i) => {
                    const app = appDefs.find(a => a.id === id)
                    if (!app) return null
                    return (
                      <div
                        key={id}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                          i === altTabIdx ? 'bg-primary/15 ring-2 ring-primary/50' : 'bg-white/[0.03]'
                        }`}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-surface-light flex items-center justify-center">
                          <app.icon size={28} className={i === altTabIdx ? 'text-primary' : 'text-text-muted'} />
                        </div>
                        <span className={`text-xs font-medium ${i === altTabIdx ? 'text-primary' : 'text-text-muted'}`}>
                          {labels[id] || app.label}
                        </span>
                      </div>
                    )
                  })}
                </motion.div>
              </motion.div>
            )
          })()}
      </AnimatePresence>

      {/* Spotlight Search */}
      <AnimatePresence>
        {showSpotlight && (
          <Spotlight apps={appDefs} labels={labels} onOpen={handleOpenWindow} onClose={() => setShowSpotlight(false)} />
        )}
      </AnimatePresence>

      {/* Force Quit Dialog */}
      <AnimatePresence>
        {forceQuitOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setForceQuitOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface border border-white/[0.08] rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-display font-bold text-lg text-text mb-1">
                {lang === 'de' ? 'Sofort beenden' : 'Force Quit Applications'}
              </h3>
              <p className="text-text-muted text-xs mb-4">
                {lang === 'de' ? 'Wähle eine Anwendung zum Beenden.' : 'Select an application to force quit.'}
              </p>
              <div className="bg-bg rounded-xl border border-white/[0.04] divide-y divide-white/[0.04] max-h-[250px] overflow-y-auto mb-4">
                {Object.entries(windows)
                  .filter(([, s]) => s.isOpen)
                  .map(([id]) => {
                    const app = appDefs.find(a => a.id === id)
                    if (!app) return null
                    return (
                      <div key={id} className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                          <app.icon size={16} className="text-text-muted" />
                          <span className="text-sm text-text">{labels[id] || app.label}</span>
                        </div>
                        <button
                          onClick={() => handleCloseWindow(id)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
                        >
                          {lang === 'de' ? 'Beenden' : 'Force Quit'}
                        </button>
                      </div>
                    )
                  })}
                {Object.entries(windows).filter(([, s]) => s.isOpen).length === 0 && (
                  <div className="px-4 py-6 text-center text-text-muted text-sm">
                    {lang === 'de' ? 'Keine offenen Fenster' : 'No open windows'}
                  </div>
                )}
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setForceQuitOpen(false)}
                  className="px-4 py-2 rounded-lg text-text-muted text-sm hover:text-text transition-colors"
                >
                  {lang === 'de' ? 'Abbrechen' : 'Cancel'}
                </button>
                <button
                  onClick={() => {
                    closeAll()
                    setForceQuitOpen(false)
                  }}
                  className="px-4 py-2 rounded-lg bg-red-500/15 text-red-400 text-sm font-medium hover:bg-red-500/25 transition-colors"
                >
                  {lang === 'de' ? 'Alle beenden' : 'Force Quit All'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screensaver */}
      {showScreensaver && <Screensaver onDismiss={() => setShowScreensaver(false)} />}

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
              onClick={() => {
                const ws = windows[app.id]
                if (ws?.isOpen && !ws.minimized) {
                  const isFocused = activeWin && activeWin[0] === app.id
                  if (isFocused) {
                    minimizeWindow(app.id)
                  } else {
                    focusWindow(app.id)
                  }
                } else {
                  handleOpenWindow(app.id)
                }
              }}
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

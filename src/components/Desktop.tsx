import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  User2, Code2, Briefcase, FolderOpen, Mail as MailIcon, Terminal,
  Send, MapPin, GithubIcon, LinkedinIcon, Calendar, CheckCircle,
  AlertCircle, ArrowUpRight, Gamepad2, ChevronDown, X as XIcon
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useLanguage } from '../context/LanguageContext'
import profileImage from '../assets/Profilbild.jpg'
import Serien from '../assets/Serien.jpg'
import WatchRadar from '../assets/WatchRadar.jpg'
import PortfolioImg from '../assets/Portfolio.jpg'
import Classpulse from '../assets/Classpulse.png'
import DOGR from '../assets/DOGR.jpg'
import Huk2 from '../assets/Huk2.svg'
import Kapp from '../assets/Kapp.svg'
import Haba from '../assets/Haba.png'

/* ═══════════ TYPES ═══════════ */
interface AppDef { id: string; label: string; icon: typeof User2; w: number; h: number; minW?: number; minH?: number }
interface WinState { isOpen: boolean; minimized: boolean; maximized: boolean; z: number; x: number; y: number; w: number; h: number; preMax?: { x: number; y: number; w: number; h: number } }

/* ═══════════ DATA ═══════════ */
const appDefs: AppDef[] = [
  { id: 'about', label: 'About', icon: User2, w: 520, h: 680, minW: 400, minH: 500 },
  { id: 'skills', label: 'Skills', icon: Code2, w: 780, h: 560, minW: 400, minH: 380 },
  { id: 'experience', label: 'Experience', icon: Briefcase, w: 800, h: 600, minW: 440, minH: 380 },
  { id: 'projects', label: 'Projects', icon: FolderOpen, w: 1000, h: 680, minW: 540, minH: 420 },
  { id: 'contact', label: 'Contact', icon: MailIcon, w: 740, h: 560, minW: 420, minH: 380 },
  { id: 'terminal', label: 'Terminal', icon: Terminal, w: 750, h: 460, minW: 440, minH: 280 },
  { id: 'snake', label: 'Snake', icon: Gamepad2, w: 460, h: 540, minW: 420, minH: 500 },
]
const skillsData = [
  { cat: 'Frontend', color: '#00e5ff', items: [{ n: 'React', c: '#61DAFB' },{ n: 'Angular', c: '#DD0031' },{ n: 'TypeScript', c: '#3178C6' },{ n: 'JavaScript', c: '#F7DF1E' },{ n: 'Vue.js', c: '#4FC08D' },{ n: 'Next.js', c: '#fff' },{ n: 'Tailwind', c: '#06B6D4' },{ n: 'HTML/CSS', c: '#E34F26' }] },
  { cat: 'Backend', color: '#bf5af2', items: [{ n: 'Node.js', c: '#339933' },{ n: 'Java', c: '#ED8B00' },{ n: 'Kotlin', c: '#7F52FF' },{ n: 'ASP.NET Core', c: '#512BD4' },{ n: 'Python', c: '#3776AB' },{ n: 'MongoDB', c: '#47A248' },{ n: 'PostgreSQL', c: '#4169E1' },{ n: 'Firebase', c: '#FFCA28' }] },
  { cat: 'DevOps', color: '#ff3366', items: [{ n: 'Git', c: '#F05032' },{ n: 'Docker', c: '#2496ED' },{ n: 'AWS', c: '#FF9900' },{ n: 'Jenkins', c: '#D24939' },{ n: 'Figma', c: '#F24E1E' },{ n: 'Vite', c: '#646CFF' }] },
]
const projectImages = [Serien, WatchRadar, PortfolioImg, Classpulse, DOGR]
const projectMeta = [
  { tech: ['React','Node.js','Firebase','MUI','TS'], url: 'https://tv-rank.de', gh: 'https://github.com/Floatyy1998/Serien-Ranking' },
  { tech: ['React','Node.js','Firebase','Tailwind','TS'], url: 'https://watchradar.konrad-dinges.de', gh: 'https://github.com/Floatyy1998/WatchRadar' },
  { tech: ['React','Tailwind','Framer Motion','Vite','TS'], url: 'https://konrad-dinges.de', gh: 'https://github.com/Floatyy1998/portfolio' },
  { tech: ['React','MariaDB','TypeScript','MUI','ASP.NET'], url: null, gh: null },
  { tech: ['React','Node.js','MongoDB','TS'], url: null, gh: null },
]
const logos: Record<string, string> = { 'HUK-COBURG': Huk2, 'KAPP NILES': Kapp, HABA: Haba }

/* ═══════════ WALLPAPERS ═══════════ */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789ABCDEF<>/{}[]'
    const fontSize = 14, columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(0).map(() => Math.random() * -100)
    const draw = () => {
      ctx.fillStyle = 'rgba(3, 0, 20, 0.06)'; ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px monospace`
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)]
        const brightness = Math.random()
        ctx.fillStyle = brightness > 0.95 ? '#ffffff' : brightness > 0.8 ? '#00e5ff' : '#00e5ff50'
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }
    const interval = setInterval(draw, 45)
    return () => { clearInterval(interval); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
}

function MeshGradientWP() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    const blobs = [
      { x: 0.2, y: 0.3, r: 0.4, color: [0, 229, 255], speed: 0.0003, phase: 0 },
      { x: 0.7, y: 0.6, r: 0.35, color: [191, 90, 242], speed: 0.0004, phase: 2 },
      { x: 0.5, y: 0.8, r: 0.3, color: [255, 51, 102], speed: 0.00035, phase: 4 },
      { x: 0.8, y: 0.2, r: 0.25, color: [255, 215, 0], speed: 0.00025, phase: 1 },
    ]
    let frame = 0
    const draw = () => {
      ctx.fillStyle = '#030014'; ctx.fillRect(0, 0, canvas.width, canvas.height)
      frame++
      blobs.forEach(b => {
        const cx = (b.x + Math.sin(frame * b.speed + b.phase) * 0.15) * canvas.width
        const cy = (b.y + Math.cos(frame * b.speed * 1.3 + b.phase) * 0.1) * canvas.height
        const radius = b.r * Math.min(canvas.width, canvas.height)
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        grad.addColorStop(0, `rgba(${b.color.join(',')}, 0.15)`)
        grad.addColorStop(0.5, `rgba(${b.color.join(',')}, 0.05)`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height)
      })
      requestAnimationFrame(draw)
    }
    const raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

function StarfieldWP() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    const stars = Array.from({ length: 400 }, () => ({
      x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random(),
      size: Math.random() * 1.5 + 0.5,
    }))
    const draw = () => {
      ctx.fillStyle = '#030014'; ctx.fillRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2, cy = canvas.height / 2
      stars.forEach(s => {
        s.z -= 0.001
        if (s.z <= 0) { s.z = 1; s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1 }
        const sx = (s.x / s.z) * cx + cx
        const sy = (s.y / s.z) * cy + cy
        const size = (1 - s.z) * s.size * 2.5
        const alpha = (1 - s.z) * 0.8
        if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) return
        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`
        ctx.fill()
        // Draw a small trail
        const tx = ((s.x / (s.z + 0.01)) * cx + cx)
        const ty = ((s.y / (s.z + 0.01)) * cy + cy)
        ctx.beginPath()
        ctx.moveTo(sx, sy); ctx.lineTo(tx, ty)
        ctx.strokeStyle = `rgba(200, 220, 255, ${alpha * 0.3})`
        ctx.lineWidth = size * 0.5
        ctx.stroke()
      })
      requestAnimationFrame(draw)
    }
    const raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

/* ═══════════ WINDOW ═══════════ */
function AppWindow({ app, state, onClose, onMinimize, onMaximize, onFocus, onResize, constraintsRef, zoom = 100, fullHeight, children }: {
  app: AppDef; state: WinState; onClose: () => void; onMinimize: () => void; onMaximize: () => void
  onFocus: () => void; onResize: (w: number, h: number) => void
  constraintsRef: React.RefObject<HTMLDivElement | null>; zoom?: number; fullHeight?: boolean; children: React.ReactNode
}) {
  const controls = useDragControls()
  const handleResizeStart = (e: React.PointerEvent) => {
    if (state.maximized) return; e.preventDefault(); e.stopPropagation()
    const sX = e.clientX, sY = e.clientY, sW = state.w, sH = state.h
    const onMove = (ev: PointerEvent) => onResize(Math.max(app.minW || 300, sW + ev.clientX - sX), Math.max(app.minH || 200, sH + ev.clientY - sY))
    const onUp = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
    window.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp)
  }
  const w = state.maximized ? window.innerWidth : state.w
  const h = state.maximized ? window.innerHeight - 112 : state.h
  return (
    <motion.div drag={!state.maximized} dragControls={controls} dragListener={false} dragMomentum={false} dragConstraints={constraintsRef} onPointerDown={onFocus}
      className="absolute" style={{ left: state.maximized ? 0 : state.x, top: state.maximized ? 36 : state.y, width: w, height: h, zIndex: state.z }}
      initial={{ scale: 0.9, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}>
      <div className="w-full h-full rounded-2xl overflow-hidden flex flex-col border border-white/[0.08]" style={{ boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.1)' }}>
        <div onPointerDown={(e) => { if (!state.maximized) { e.preventDefault(); controls.start(e) } }} onDoubleClick={onMaximize}
          className="h-12 flex items-center px-4 bg-surface-light backdrop-blur-xl cursor-grab active:cursor-grabbing select-none shrink-0 border-b border-white/[0.05]">
          <div className="flex gap-2">
            <button onClick={(e) => { e.stopPropagation(); onClose() }} className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] hover:brightness-125 transition-all" />
            <button onClick={(e) => { e.stopPropagation(); onMinimize() }} className="w-3.5 h-3.5 rounded-full bg-[#febc2e] hover:brightness-125 transition-all" />
            <button onClick={(e) => { e.stopPropagation(); onMaximize() }} className="w-3.5 h-3.5 rounded-full bg-[#28c840] hover:brightness-125 transition-all" />
          </div>
          <div className="flex-1 text-center text-sm text-text-muted font-medium truncate mx-4 flex items-center justify-center gap-1.5">
            <app.icon size={14} /> {app.label}
          </div>
          <div className="w-16" />
        </div>
        <div className={`flex-1 overflow-x-hidden overflow-hidden relative bg-bg ${fullHeight ? 'flex flex-col' : 'overflow-y-auto'}`}>
          {fullHeight ? children : (
            <div style={zoom !== 100 ? { transform: `scale(${zoom / 100})`, transformOrigin: 'top left', width: `${10000 / zoom}%` } : undefined}>
              {children}
            </div>
          )}
        </div>
        {/* Resize handle — outside content scroll area */}
        {!state.maximized && <div onPointerDown={handleResizeStart} className="absolute bottom-1 right-1 w-5 h-5 cursor-se-resize z-30 group rounded-bl-xl">
          <svg className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 text-white/20 group-hover:text-white/50 transition-colors" viewBox="0 0 10 10">
            <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.5"/><line x1="10" y1="6" x2="6" y2="10" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>}
      </div>
    </motion.div>
  )
}

/* ═══════════ TERMINAL ═══════════ */
function TerminalContent({ openWindow, notify }: { openWindow: (id: string) => void; notify: (text: string) => void }) {
  const [lines, setLines] = useState<string[]>(['\x1b[36m  KD OS Terminal v2.0\x1b[0m', '  Type "help" for commands.', ''])
  const [input, setInput] = useState(''); const [history, setHistory] = useState<string[]>([]); const [histIdx, setHistIdx] = useState(-1)
  const [vimMode, setVimMode] = useState(false)
  const endRef = useRef<HTMLDivElement>(null); const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [lines])
  const fortunes = ['"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler','"Talk is cheap. Show me the code." — Linus Torvalds','"Code is like humor. When you have to explain it, it\'s bad." — Cory House','"Simplicity is the soul of efficiency." — Austin Freeman','"First, solve the problem. Then, write the code." — John Johnson','"The best error message is the one that never shows up." — Thomas Fuchs','"Deleted code is debugged code." — Jeff Sickel','"It works on my machine." — Every developer ever']
  const hints = ['💡 Try "ls" to see files, then "cat .secret" to read them','💡 Type "neofetch" to see system info','💡 Try "sudo hire konrad" for a surprise','💡 Type "cowsay hello" for a talking cow','💡 Open the Snake game with "snake"','💡 Try "vim" if you dare...','💡 Type "fortune" for a random quote','💡 Try "weather" to check the forecast in Meeder','💡 Use Tab to autocomplete commands','💡 Press ↑/↓ to navigate command history','💡 Try "ssh konrad@portfolio"','💡 Type "ascii" for some art','💡 Try "hack" for a hacking simulation','💡 Type "joke" for a programming joke','💡 Try "rickroll" for a classic']
  const jokes = ['Why do programmers prefer dark mode? Because light attracts bugs.','A SQL query walks into a bar, sees two tables and asks: "Can I JOIN you?"','!false — It\'s funny because it\'s true.','A programmer\'s wife tells him: "Go to the store and buy a loaf of bread. If they have eggs, buy a dozen." He comes home with 12 loaves.','There are only 10 types of people in the world: those who understand binary and those who don\'t.','Why do Java developers wear glasses? Because they can\'t C#.','How many programmers does it take to change a light bulb? None. That\'s a hardware problem.','["hip","hip"] — (hip hip array!)']
  const add = (...s: string[]) => setLines(l => [...l, ...s])
  const exec = (cmd: string) => {
    const parts = cmd.trim().split(' '); const c = parts[0].toLowerCase(); const args = parts.slice(1).join(' ')
    add(`\x1b[32m$\x1b[0m ${cmd}`); setHistory(h => [...h, cmd])
    if (vimMode) { if (cmd.trim() === ':q' || cmd.trim() === ':wq' || cmd.trim() === ':q!') { setVimMode(false); add('  You escaped vim! Achievement unlocked. 🏆', '') } else { add(`  You're still in vim. Try :q or :wq to escape.`, '') }; return }
    switch (c) {
      case 'help': add('','  \x1b[36m🧭 Getting Started\x1b[0m — type \x1b[32mhint\x1b[0m for tips!','','  \x1b[36m── Explore ──\x1b[0m','  about       Who I am','  skills      Tech stack','  contact     Get in touch','  ls          List files','  cat <file>  Read a file','  tree        Directory tree','','  \x1b[36m── System ──\x1b[0m','  neofetch    System info','  whoami      Current user','  hostname    Host name','  pwd         Working directory','  date        Current date','  uptime      System uptime','  ip          Your IP & location','  screen      Screen info','  battery     Battery status','  speed       Speed test','  wifi        Network info','  benchmark   JS performance test','','  \x1b[36m── Apps ──\x1b[0m','  open <app>  Open an app window','  snake       Play Snake!','','  \x1b[36m── Fun & Easter Eggs ──\x1b[0m','  hint        Random tip','  fortune     Random quote','  joke        Programming humor','  cowsay <t>  ASCII cow','  ascii       ASCII art','  weather     Local weather','  matrix      Enter the matrix','  decrypt     Access the mainframe','  rickroll    You know the rules...','  vim         The editor trap','  tableflip   Flip a table','  shrug       Meh','  party       Party mode','  leet <text> L33t speak','  motivate    Get inspired','  coffee      Brew a coffee','  xkcd        Random comic','  42          The answer','  hello       Say hi','','  \x1b[36m── Tools ──\x1b[0m','  time [city] World clock','  calc <expr> Calculator','  base64      Encode/decode','  uuid        Generate UUID','  share       Share this site','  notify <t>  Browser notification','  download    Download resume','  toast <t>   Desktop notification','  password    Generate password','  flip        Flip a coin','  dice [n]    Roll dice','  countdown   Start timer','  geolocate   GPS location','  vibrate     Buzz! (mobile)','  qr <text>   QR code art','  webcam      ASCII selfie','  sudo <cmd>  Superuser do','  ssh <host>  SSH somewhere','  ping <host> Ping a host','','  \x1b[36m── Meta ──\x1b[0m','  history / clear / exit',''); break

      case 'about': add('  \x1b[36mKonrad Dinges\x1b[0m — Full Stack Developer','  📍 Meeder, Germany','  💻 10+ years programming experience','  🏢 Web Developer @ HUK-COBURG','  📧 mail@konrad-dinges.de',''); break
      case 'skills': add('  \x1b[36mFrontend:\x1b[0m React, Angular, TypeScript, Vue.js, Next.js, Tailwind','  \x1b[35mBackend:\x1b[0m  Node.js, Java, Kotlin, ASP.NET Core, Python, MongoDB, Firebase','  \x1b[31mDevOps:\x1b[0m   Git, Docker, AWS, Jenkins, Figma, Vite',''); break
      case 'contact': add('  📧 mail@konrad-dinges.de','  🐙 github.com/Floatyy1998','  🔗 linkedin.com/in/konrad-dinges-803098296',''); break
      case 'ls': add('  \x1b[36mprojects/\x1b[0m  \x1b[36mskills/\x1b[0m  resume.txt  README.md  .secret  .bashrc',''); break
      case 'cat': { const f = args.toLowerCase(); if (f === 'resume.txt') add('  \x1b[36mKonrad Dinges | Full Stack Developer\x1b[0m','  ─────────────────────────────────','  HUK-COBURG — Web Developer (2025-Present)','  HUK-COBURG — Apprenticeship (2022-2025)','  KAPP NILES — Internship (2020)','  HABA — Internship (2013)',''); else if (f === '.secret') add('  🎉 You found the secret!','  Try: "konami", "snake", "vim", or "sudo hire konrad"',''); else if (f === 'readme.md') add('  # KD OS Portfolio','  > A portfolio disguised as an operating system.','  > Built with React 19 + TypeScript + Framer Motion.','  > © 2025 Konrad Dinges',''); else if (f === '.bashrc') add('  export PS1="konrad@portfolio:~$ "','  alias hired="echo Congratulations!"','  alias coffee="echo ☕ Brewing..."',''); else add(`  cat: ${args||'???'}: No such file`,''); break }
      case 'open': if (['about','skills','experience','projects','contact','terminal','snake'].includes(args)) { openWindow(args); add(`  Opening ${args}...`,'') } else add('  Usage: open <about|skills|experience|projects|contact|terminal|snake>',''); break
      case 'neofetch': {
        const secs = Math.floor(performance.now()/1000); const mins = Math.floor(secs/60)
        const devMem = (navigator as any).deviceMemory
        const mem = devMem ? `${devMem >= 8 ? '≥' : ''}${devMem} GB` : 'N/A'
        const cores = navigator.hardwareConcurrency || '?'
        const scr = `${screen.width}x${screen.height}`
        const ua = navigator.userAgent
        const browser = ua.includes('OPR') || ua.includes('Opera') ? 'Opera' : ua.includes('Edg') ? 'Edge' : ua.includes('Firefox') ? 'Firefox' : ua.includes('Chrome') ? 'Chrome' : ua.includes('Safari') ? 'Safari' : 'Unknown'
        const browserVer = ua.match(/(OPR|Edg|Firefox|Chrome|Safari)\/(\d+)/)?.[2] || ''
        add('',
          '        ╔══════════════╗    \x1b[36mkonrad\x1b[0m@\x1b[36mportfolio\x1b[0m',
          '        ║     KD       ║    ─────────────────',
          '        ║     OS       ║    OS: KD OS v2.0',
          `        ╚══════════════╝    Shell: React Terminal`,
          `                             WM: Framer Motion`,
          `                             Display: ${scr} @ ${devicePixelRatio}x`,
          `                             CPU Cores: ${cores}`,
          `                             Memory: ${mem}`,
          `                             Lang: ${navigator.language}`,
          `                             Uptime: ${mins}m ${secs%60}s`,
          `                             Browser: ${browser}${browserVer ? ' '+browserVer : ''}`,
          ''); break
      }
      case 'whoami': add(`  visitor (uid=42, gid=1337)`,`  browser: ${navigator.userAgent.split(' ').pop()}`,`  lang: ${navigator.language}`,`  platform: ${navigator.platform}`,''); break
      case 'hostname': add('  kd-portfolio.local',''); break
      case 'pwd': add('  /home/visitor',''); break
      case 'date': add(`  ${new Date().toString()}`,''); break
      case 'uptime': { const secs = Math.floor(performance.now()/1000); const mins = Math.floor(secs/60); const hrs = Math.floor(mins/60); add(`  up ${hrs > 0 ? hrs+'h ':''}${mins%60}m ${secs%60}s (since page load)`,''); break }
      case 'fortune': add(`  ${fortunes[Math.floor(Math.random()*fortunes.length)]}`,''); break
      case 'echo': add(`  ${args}`,''); break
      case 'cowsay': { const msg=args||'moo'; add(`   ${'_'.repeat(msg.length+2)}`,`  < ${msg} >`,`   ${'‾'.repeat(msg.length+2)}`,'          \\   ^__^','           \\  (oo)\\_______','              (__)\\       )\\/\\','                  ||----w |','                  ||     ||',''); break }
      case 'weather': {
        add('  \x1b[36mFetching weather data...\x1b[0m')
        fetch('https://wttr.in/?format=j1').then(r => r.json()).then(data => {
          const cur = data.current_condition?.[0]
          const area = data.nearest_area?.[0]
          const city = area?.areaName?.[0]?.value || '?'
          const country = area?.country?.[0]?.value || ''
          const temp = cur?.temp_C || '?'
          const feels = cur?.FeelsLikeC || '?'
          const desc = cur?.weatherDesc?.[0]?.value || '?'
          const humidity = cur?.humidity || '?'
          const wind = cur?.windspeedKmph || '?'
          const windDir = cur?.winddir16Point || ''
          add(
            `  \x1b[36m📍 ${city}, ${country}\x1b[0m`,
            `  🌡️  Temperature: ${temp}°C (feels like ${feels}°C)`,
            `  ☁️  ${desc}`,
            `  💧 Humidity: ${humidity}%`,
            `  💨 Wind: ${wind} km/h ${windDir}`,
            ''
          )
        }).catch(() => {
          add('  \x1b[31mCould not fetch weather data.\x1b[0m','  Showing fallback for Meeder, Germany.','',`  🌡️  Temperature: ${Math.floor(Math.random()*15+10)}°C`,'  ☕ Condition: Perfect coding weather','')
        })
        break
      }
      case 'sudo': if (args.toLowerCase().includes('hire konrad')) add('  ✅ Permission granted.','  📧 Sending offer letter to mail@konrad-dinges.de...','  💰 Salary: Yes.','  🎉 Welcome to the team!',''); else if (args.toLowerCase().includes('rm -rf')) add('  🛡️ Nice try. System protected by excellent code.','  (Your destructive intent has been noted.)',''); else if (args.toLowerCase().includes('apt') || args.toLowerCase().includes('install')) add(`  📦 Installing ${args.split(' ').pop()}...`,'  ████████████████████ 100%','  ✅ Done. (Not really, this is a portfolio.)',''); else add(`  sudo: executing "${args}" with elevated privileges...`,'  Just kidding. This is a portfolio. 😄',''); break
      case 'matrix': { const chars='ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01'; for(let r=0;r<8;r++){let row='  ';for(let co=0;co<50;co++)row+=chars[Math.floor(Math.random()*chars.length)];add(row)}; add('','  \x1b[36mWake up, Neo...\x1b[0m','  \x1b[36mThe Matrix has you...\x1b[0m',''); break }
      case 'ping': {
        const h = args || 'konrad-dinges.de'
        add(`  PING ${h} ...`)
        const doPing = async () => {
          const times: number[] = []
          for (let i = 0; i < 4; i++) {
            const start = performance.now()
            try {
              await fetch(`https://${h}`, { mode: 'no-cors', cache: 'no-store' })
              times.push(performance.now() - start)
              add(`  64 bytes from ${h}: time=${times[times.length-1].toFixed(1)}ms`)
            } catch {
              times.push(-1)
              add(`  Request timeout for ${h}`)
            }
          }
          const valid = times.filter(t => t >= 0)
          if (valid.length > 0) {
            const avg = valid.reduce((a,b) => a+b, 0) / valid.length
            const min = Math.min(...valid)
            const max = Math.max(...valid)
            add(`  --- ${h} ping statistics ---`, `  ${times.length} packets, ${valid.length} received, ${times.length-valid.length} lost`, `  min/avg/max = ${min.toFixed(1)}/${avg.toFixed(1)}/${max.toFixed(1)} ms`, '')
          } else {
            add(`  --- ${h} unreachable ---`, '')
          }
        }
        doPing()
        break
      }
      case 'ssh': add(`  Connecting to ${args||'konrad@portfolio'}...`,'  🔑 Authenticating with public key...','  ✅ Welcome home.','  Last login: just now from your browser',''); break
      case 'vim': case 'vi': case 'nano': setVimMode(true); add(`  You opened ${c}. You're now trapped.`,'  Type :q, :wq, or :q! to escape.','  Good luck. 😈',''); break
      case 'snake': openWindow('snake'); add('  🐍 Opening Snake...',''); break
      case 'konami': add('  ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️','  🎮 +30 lives! Achievement unlocked!','  🏆 "The Konami Kid"',''); break
      case 'history': history.forEach((h,i)=>add(`  ${i+1}  ${h}`)); add(''); break
      case 'clear': setLines([]); return
      case 'exit': add('  This is a portfolio, not a real terminal. But nice try! 😏','  (Use the red button to close this window)',''); break
      case 'rm': add('  rm: permission denied (try sudo rm, I dare you)',''); break
      case 'cd': add(`  cd: ${args||'~'}: You're already home.`,''); break
      case 'git': add('  On branch: master','  Your portfolio is always up to date. 😉',''); break
      case 'npm': case 'yarn': case 'pnpm': add(`  ${c} install awesome-developer`,'  ✅ Found: Konrad Dinges','  📦 Installing...','  ████████████████████ 100%',''); break
      case 'curl': {
        const url = args || 'https://api.github.com/users/Floatyy1998'
        add(`  \x1b[36mGET ${url}\x1b[0m`)
        const start = performance.now()
        fetch(url).then(async r => {
          const ms = (performance.now() - start).toFixed(0)
          const status = `${r.status} ${r.statusText}`
          const ct = r.headers.get('content-type') || ''
          let body = ''
          try {
            if (ct.includes('json')) {
              const json = await r.json()
              body = JSON.stringify(json, null, 2).split('\n').slice(0, 15).map(l => `  ${l}`).join('\n')
              if (JSON.stringify(json, null, 2).split('\n').length > 15) body += '\n  ...'
            } else {
              const text = await r.text()
              body = text.slice(0, 500).split('\n').slice(0, 10).map(l => `  ${l}`).join('\n')
            }
          } catch { body = '  [binary data]' }
          add(`  \x1b[32mHTTP ${status}\x1b[0m (${ms}ms)`,`  Content-Type: ${ct}`,'', ...body.split('\n'), '')
        }).catch(() => {
          const ms = (performance.now() - start).toFixed(0)
          fetch(url, { mode: 'no-cors', cache: 'no-store' }).then(() => {
            add(`  \x1b[36mHTTP 200\x1b[0m (${ms}ms) — CORS blocked response body`,`  Server responded but browser blocks reading the content.`,`  Tip: Try APIs that allow CORS, e.g.:`,`    curl https://api.github.com/users/Floatyy1998`,`    curl https://wttr.in/?format=j1`,'')
          }).catch(() => {
            add(`  \x1b[31mError: Could not reach ${url}\x1b[0m`,'')
          })
        })
        break
      }
      case 'hint': add(`  ${hints[Math.floor(Math.random()*hints.length)]}`,''); break
      case 'joke': add(`  ${jokes[Math.floor(Math.random()*jokes.length)]}`,''); break
      case 'ascii': add('','  \x1b[36m  ██╗  ██╗██████╗ \x1b[0m','  \x1b[36m  ██║ ██╔╝██╔══██╗\x1b[0m','  \x1b[36m  █████╔╝ ██║  ██║\x1b[0m','  \x1b[36m  ██╔═██╗ ██║  ██║\x1b[0m','  \x1b[36m  ██║  ██╗██████╔╝\x1b[0m','  \x1b[36m  ╚═╝  ╚═╝╚═════╝ \x1b[0m','','  Konrad Dinges — Full Stack Developer',''); break
      case 'tree': add('  \x1b[36m.\x1b[0m','  ├── \x1b[36mprojects/\x1b[0m','  │   ├── serien-ranking/','  │   ├── watchradar/','  │   ├── portfolio/','  │   ├── classpulse/','  │   └── dogr/','  ├── \x1b[36mskills/\x1b[0m','  │   ├── frontend.json','  │   ├── backend.json','  │   └── devops.json','  ├── resume.txt','  ├── README.md','  ├── .secret','  └── .bashrc','','  5 directories, 11 files',''); break
      case 'man': add(`  KD-OS(1)                  User Commands                  KD-OS(1)`,'',`  NAME`,`    kd-os — Konrad Dinges Portfolio Operating System`,'',`  SYNOPSIS`,`    Just type commands and explore!`,'',`  DESCRIPTION`,`    An interactive portfolio disguised as a terminal OS.`,`    Built with React 19, TypeScript, and Framer Motion.`,'',`  AUTHOR`,`    Konrad Dinges <mail@konrad-dinges.de>`,'',`  SEE ALSO`,`    help(1), hint(1), about(1)`,''); break
      case 'theme': {
        const themes: Record<string,string> = {green:'text-green-400',amber:'text-amber-400',blue:'text-blue-400',white:'text-gray-200',pink:'text-pink-400'}
        if (args && themes[args.toLowerCase()]) { add(`  Theme changed to ${args}. (Visual only in this session)`,'') }
        else add('  Usage: theme <green|amber|blue|white|pink>',''); break }
      case 'whoismyip': case 'ip': {
        add('  \x1b[36mLooking up your IP...\x1b[0m')
        fetch('https://ipapi.co/json/').then(r => r.json()).then(data => {
          add(
            `  \x1b[32mIP:\x1b[0m ${data.ip}`,
            `  \x1b[32mLocation:\x1b[0m ${data.city}, ${data.region}, ${data.country_name}`,
            `  \x1b[32mISP:\x1b[0m ${data.org}`,
            `  \x1b[32mTimezone:\x1b[0m ${data.timezone}`,
            ''
          )
        }).catch(() => add('  Could not fetch IP info.',''))
        break
      }
      case 'speed': {
        add('  \x1b[36mTesting connection speed...\x1b[0m','  Running parallel downloads...')
        const base = [
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.9.155/pdf.min.mjs',
          'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs/editor/editor.main.js',
          'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.8/chart.umd.js',
          'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/gsap.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js',
        ]
        const urls = [...base, ...base, ...base].map((u, i) => `${u}?_=${Date.now()}_${i}`)
        const start = performance.now()
        Promise.all(urls.map(u => fetch(u, { cache: 'no-store' }).then(r => r.blob()))).then(blobs => {
          const ms = performance.now() - start
          const totalBytes = blobs.reduce((s, b) => s + b.size, 0)
          const totalMB = totalBytes / (1024 * 1024)
          const speedMbps = (totalMB * 8) / (ms / 1000)
          const barLen = Math.min(20, Math.round(speedMbps / 25))
          const bar = '\x1b[32m' + '█'.repeat(barLen) + '░'.repeat(20 - barLen) + '\x1b[0m'
          add(
            `  ${bar}`,
            `  \x1b[32mDownload:\x1b[0m ${speedMbps.toFixed(1)} Mbps`,
            `  \x1b[32mTotal:\x1b[0m ${totalMB.toFixed(1)} MB in ${(ms/1000).toFixed(2)}s`,
            `  \x1b[32mConnections:\x1b[0m ${urls.length} parallel`,
            ''
          )
        }).catch(() => add('  \x1b[31mSpeed test failed.\x1b[0m',''))
        break
      }
      case 'battery': {
        if ('getBattery' in navigator) {
          (navigator as any).getBattery().then((b: any) => {
            const pct = Math.round(b.level * 100)
            const bar = '█'.repeat(Math.round(pct/5)) + '░'.repeat(20 - Math.round(pct/5))
            add(`  \x1b[${pct > 20 ? '32' : '31'}m${bar}\x1b[0m ${pct}%`, `  ${b.charging ? '⚡ Charging' : '🔋 On battery'}`, '')
          })
        } else { add('  Battery API not available in this browser.','') }
        break
      }
      case 'screen': {
        const s = window.screen
        add(
          `  \x1b[32mScreen:\x1b[0m ${s.width}x${s.height}`,
          `  \x1b[32mViewport:\x1b[0m ${window.innerWidth}x${window.innerHeight}`,
          `  \x1b[32mColor depth:\x1b[0m ${s.colorDepth}bit`,
          `  \x1b[32mPixel ratio:\x1b[0m ${window.devicePixelRatio}x`,
          `  \x1b[32mOrientation:\x1b[0m ${s.orientation?.type || 'N/A'}`,
          ''
        )
        break
      }
      case 'decrypt': add('  [32m[*] Initializing...[0m','  [*] Scanning ports... 22, 80, 443','  [*] Found: kd-portfolio.local','  [*] Connecting...','  [36m████████████████████ 100%[0m','  [32m[+] ACCESS GRANTED[0m','','  Welcome to the mainframe. Just kidding!',''); break
      case 'rickroll': add('  [35m  Never gonna give you up[0m','  [35m  Never gonna let you down[0m','  [35m  Never gonna run around and desert you[0m','  [35m  Never gonna make you cry[0m','  [35m  Never gonna say goodbye[0m','','  You just got rickrolled in a terminal!',''); break
      case 'time': {
        const zones: Record<string,string> = { berlin:'Europe/Berlin', london:'Europe/London', newyork:'America/New_York', ny:'America/New_York', tokyo:'Asia/Tokyo', sydney:'Australia/Sydney', dubai:'Asia/Dubai', mumbai:'Asia/Kolkata', shanghai:'Asia/Shanghai', la:'America/Los_Angeles', losangeles:'America/Los_Angeles', paris:'Europe/Paris', moscow:'Europe/Moscow', meeder:'Europe/Berlin' }
        if (!args) {
          const cities = ['Berlin','London','New York','Tokyo','Sydney','Dubai','Shanghai','Los Angeles']
          cities.forEach(city => {
            const tz = zones[city.toLowerCase().replace(' ','')] || 'UTC'
            const t2 = new Date().toLocaleTimeString('de-DE', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit' })
            const d = new Date().toLocaleDateString('de-DE', { timeZone: tz, weekday: 'short', day: 'numeric', month: 'short' })
            add(`  \x1b[36m${city.padEnd(14)}\x1b[0m ${t2}  ${d}`)
          })
          add('')
        } else {
          const tz = zones[args.toLowerCase().replace(' ','')] || args
          try {
            const t2 = new Date().toLocaleTimeString('de-DE', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit' })
            const d = new Date().toLocaleDateString('en-US', { timeZone: tz, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            add(`  \x1b[36m${tz}\x1b[0m`, `  ${t2} — ${d}`, '')
          } catch { add(`  Unknown timezone: ${args}`, '  Try: berlin, london, newyork, tokyo, sydney, dubai, la', '') }
        }
        break
      }
      case 'calc': {
        if (!args) { add('  Usage: calc <expression>','  Example: calc 2**10 + Math.sqrt(144)',''); break }
        try {
          const allowed = /^[0-9+\-*/().%\s,]|Math\.\w+|PI|E|sqrt|pow|abs|floor|ceil|round|sin|cos|tan|log|random|min|max/
          if (/[a-zA-Z]/.test(args) && !args.match(/Math\.|PI|sqrt|pow|abs|floor|ceil|round|sin|cos|tan|log|random|min|max/)) { add('  Only math expressions allowed.',''); break }
          const result = new Function(`"use strict"; return (${args.replace(/Math\./g,'Math.')})`)()
          add(`  \x1b[32m= ${result}\x1b[0m`, '')
        } catch { add(`  \x1b[31mInvalid expression\x1b[0m`, '') }
        break
      }
      case 'share': {
        if (navigator.share) {
          navigator.share({ title: 'Konrad Dinges — Portfolio', text: 'Check out this portfolio OS!', url: window.location.href })
            .then(() => add('  \x1b[32mShared successfully!\x1b[0m', ''))
            .catch(() => add('  Share cancelled.', ''))
        } else {
          navigator.clipboard.writeText(window.location.href).then(() => {
            add('  Share API not available. URL copied to clipboard!', '')
          }).catch(() => add('  Could not share or copy.', ''))
        }
        break
      }
      case 'notify': {
        const msg = args || 'Hello from KD OS!'
        if (Notification.permission === 'granted') {
          new Notification('KD OS', { body: msg, icon: '/favicon.ico' })
          add('  \x1b[32mNotification sent!\x1b[0m', '')
        } else if (Notification.permission === 'denied') {
          add('  \x1b[31mNotifications blocked by browser.\x1b[0m', '')
        } else {
          Notification.requestPermission().then(p => {
            if (p === 'granted') { new Notification('KD OS', { body: msg }); add('  \x1b[32mNotification sent!\x1b[0m', '') }
            else add('  Notification permission denied.', '')
          })
          add('  Requesting permission...', '')
        }
        break
      }
      case 'download': {
        const resume = `KONRAD DINGES — Full Stack Developer\n${'='.repeat(40)}\nEmail: mail@konrad-dinges.de\nLocation: Meeder, Germany\nGitHub: github.com/Floatyy1998\nLinkedIn: linkedin.com/in/konrad-dinges-803098296\n\nEXPERIENCE\n${'-'.repeat(40)}\nWeb Developer @ HUK-COBURG (2025-Present)\n  Angular, TypeScript, Jenkins, AWS\n\nApprenticeship @ HUK-COBURG (2022-2025)\n  Angular, TypeScript, CI/CD, AWS\n\nInternship @ KAPP NILES (2020)\n  HTML, CSS, JavaScript, MongoDB\n\nInternship @ HABA (2013)\n  Java\n\nSKILLS\n${'-'.repeat(40)}\nFrontend: React, Angular, TypeScript, JavaScript, Vue.js, Next.js, Tailwind\nBackend: Node.js, Python, MongoDB, PostgreSQL, Firebase\nDevOps: Git, Docker, AWS, Jenkins, Figma, Vite\n`
        const blob = new Blob([resume], { type: 'text/plain' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob); a.download = 'Konrad_Dinges_Resume.txt'
        a.click(); URL.revokeObjectURL(a.href)
        add('  \x1b[32mDownloading resume...\x1b[0m', '')
        break
      }
      case 'wifi': case 'network': {
        const conn = (navigator as any).connection
        if (conn) {
          add(
            `  \x1b[32mType:\x1b[0m ${conn.effectiveType || 'unknown'}`,
            `  \x1b[32mDownlink:\x1b[0m ${conn.downlink || '?'} Mbps`,
            `  \x1b[32mRTT:\x1b[0m ${conn.rtt || '?'} ms`,
            `  \x1b[32mSave-Data:\x1b[0m ${conn.saveData ? 'yes' : 'no'}`,
            ''
          )
        } else { add('  Network Information API not available in this browser.','') }
        break
      }
      case 'benchmark': {
        add('  \x1b[36mRunning benchmark...\x1b[0m')
        setTimeout(() => {
          const tests: { name: string; ops: number }[] = []
          let start = performance.now()
          let count = 0; while (performance.now() - start < 100) { Math.sqrt(Math.random() * 1000000); count++ }
          tests.push({ name: 'Math ops', ops: count })
          start = performance.now()
          count = 0; while (performance.now() - start < 100) { JSON.parse(JSON.stringify({ a: 1, b: [2, 3], c: 'test' })); count++ }
          tests.push({ name: 'JSON parse', ops: count })
          start = performance.now()
          count = 0; while (performance.now() - start < 100) { 'hello world '.repeat(100).split(' ').join('-'); count++ }
          tests.push({ name: 'String ops', ops: count })
          start = performance.now()
          count = 0; const arr: number[] = []; while (performance.now() - start < 100) { arr.push(Math.random()); if (arr.length > 10000) arr.length = 0; count++ }
          tests.push({ name: 'Array ops', ops: count })
          add('  \x1b[36m── Results (ops/100ms) ──\x1b[0m')
          tests.forEach(t => {
            const bar = '█'.repeat(Math.min(20, Math.round(t.ops / 5000)))
            add(`  ${t.name.padEnd(12)} \x1b[32m${bar}\x1b[0m ${t.ops.toLocaleString()}`)
          })
          const total = tests.reduce((s, t) => s + t.ops, 0)
          add('', `  \x1b[36mTotal score:\x1b[0m ${total.toLocaleString()} ops`, '')
        }, 10)
        break
      }
      case 'uuid': { add(`  ${crypto.randomUUID()}`, ''); break }
      case 'base64': {
        if (!args) { add('  Usage: base64 <encode|decode> <text>','  Example: base64 encode Hello World',''); break }
        const [mode, ...rest] = args.split(' '); const text = rest.join(' ')
        if (mode === 'encode') add(`  ${btoa(text)}`, '')
        else if (mode === 'decode') { try { add(`  ${atob(text)}`, '') } catch { add('  \x1b[31mInvalid base64 string\x1b[0m', '') } }
        else add('  Usage: base64 <encode|decode> <text>', '')
        break
      }
      case 'toast': { notify(args || 'Hello from Terminal!'); add('  \x1b[32mToast sent!\x1b[0m',''); break }
      case 'leet': { const lt=(args||'Konrad Dinges').split('').map(ch=>(({a:'4',e:'3',i:'1',o:'0',s:'5',t:'7',A:'4',E:'3',I:'1',O:'0',S:'5',T:'7'}) as Record<string,string>)[ch]||ch).join(''); add(`  ${lt}`,''); break }
      case 'motivate': case 'inspire': { const ms2=['You are doing great! Keep coding!','Every expert was once a beginner.','Ship it!','Code never lies. Comments sometimes do.','Stay hungry, stay foolish.','It compiles! Ship it!','You miss 100% of the deploys you dont push.']; add(`  \x1b[36m${ms2[Math.floor(Math.random()*ms2.length)]}\x1b[0m`,''); break }
      case 'party': { let ct2=0; const iv2=setInterval(()=>{add('  '+Array.from({length:25},()=>'*~+#@&%!$'[Math.floor(Math.random()*9)]).join(' ')); ct2++; if(ct2>=5){clearInterval(iv2);add('','  Party over. Back to work!','')}},300); break }
      case 'tableflip': add('  (\u256F\u00B0\u25A1\u00B0)\u256F\uFE35 \u253B\u2501\u253B',''); break
      case 'unflip': add('  \u252C\u2500\u252C\u30CE( \u00BA _ \u00BA\u30CE)',''); break
      case 'shrug': add('  \u00AF\\_(\u30C4)_/\u00AF',''); break
      case 'yes': { for(let y2=0;y2<8;y2++)add('  yes'); add('  ...','  (You get the idea.)',''); break }
      case 'no': { for(let n2=0;n2<8;n2++)add('  no'); add('  ...','  (Okay okay!)',''); break }
      case 'hello': case 'hi': case 'hey': add('  \x1b[36mHey! Nice to meet you!\x1b[0m','','  Quick start:','  \x1b[32m  about\x1b[0m      Learn about me','  \x1b[32m  weather\x1b[0m    Check the weather','  \x1b[32m  webcam\x1b[0m     Take an ASCII selfie','  \x1b[32m  snake\x1b[0m      Play a game','  \x1b[32m  cowsay hi\x1b[0m  Make a cow talk','  \x1b[32m  help\x1b[0m       See all 50+ commands',''); break
      case 'coffee': add('','  \u2615 Brewing...','  ...','  \u2615 Here is your coffee. Now get back to coding!',''); break
      case '42': add('  The answer to life, the universe, and everything.',''); break
      case 'xkcd': add(`  Random XKCD: https://xkcd.com/${Math.floor(Math.random()*2900)+1}/`,'  (Worth a click!)',''); break
      case 'password': case 'passwd': {
        const len = parseInt(args) || 16
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-+=?'
        const arr = new Uint32Array(len)
        crypto.getRandomValues(arr)
        const pw = Array.from(arr, v => charset[v % charset.length]).join('')
        add(`  \x1b[32m${pw}\x1b[0m`, '', `  Length: ${len} | Copied to clipboard`, '')
        navigator.clipboard.writeText(pw).catch(() => {})
        break
      }
      case 'flip': {
        const result = crypto.getRandomValues(new Uint8Array(1))[0] > 127
        add(result ? '  🪙 \x1b[36mHeads!\x1b[0m' : '  🪙 \x1b[35mTails!\x1b[0m', '')
        break
      }
      case 'dice': case 'roll': {
        const count = Math.min(parseInt(args) || 1, 10)
        const rolls = Array.from(crypto.getRandomValues(new Uint8Array(count)), v => (v % 6) + 1)
        const faces = ['', '\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685']
        add(`  ${rolls.map(r => faces[r]).join('  ')}`, `  ${rolls.map(r => `[${r}]`).join(' ')}${count > 1 ? `  Sum: ${rolls.reduce((a, b) => a + b, 0)}` : ''}`, '')
        break
      }
      case 'countdown': {
        const secs = parseInt(args) || 10
        if (secs > 300) { add('  Max 300 seconds.', ''); break }
        add(`  \x1b[36mCountdown: ${secs}s\x1b[0m`)
        let remaining = secs
        const iv = setInterval(() => {
          remaining--
          const bar = '\x1b[32m' + '█'.repeat(Math.round((1 - remaining / secs) * 20)) + '\x1b[0m' + '░'.repeat(Math.round((remaining / secs) * 20))
          add(`  ${bar} ${remaining}s`)
          if (remaining <= 0) {
            clearInterval(iv)
            add('  \x1b[36m🔔 Time is up!\x1b[0m', '')
            if ('vibrate' in navigator) (navigator as any).vibrate(200)
          }
        }, 1000)
        break
      }
      case 'geolocate': case 'gps': case 'location': {
        add('  \x1b[36mRequesting location...\x1b[0m')
        navigator.geolocation.getCurrentPosition(
          pos => {
            const { latitude: lat, longitude: lon, accuracy: acc, altitude: alt, speed: spd } = pos.coords
            const mapsUrl = `https://maps.google.com/?q=${lat},${lon}`
            navigator.clipboard.writeText(mapsUrl).catch(() => {})
            add(
              `  \x1b[32mLatitude:\x1b[0m ${lat.toFixed(6)}`,
              `  \x1b[32mLongitude:\x1b[0m ${lon.toFixed(6)}`,
              `  \x1b[32mAccuracy:\x1b[0m ${acc.toFixed(0)}m`,
              alt !== null ? `  \x1b[32mAltitude:\x1b[0m ${alt.toFixed(0)}m` : '',
              spd !== null && spd > 0 ? `  \x1b[32mSpeed:\x1b[0m ${(spd * 3.6).toFixed(1)} km/h` : '',
              `  \x1b[36mGoogle Maps:\x1b[0m ${mapsUrl}`,
              `  \x1b[32m(Link copied to clipboard)\x1b[0m`,
              ''
            )
          },
          err => add(`  \x1b[31mError: ${err.message}\x1b[0m`, ''),
          { enableHighAccuracy: true }
        )
        break
      }
      case 'vibrate': {
        if ('vibrate' in navigator) {
          const pattern = args === 'sos' ? [100,50,100,50,100,150,300,50,300,50,300,150,100,50,100,50,100] : [200]
          ;(navigator as any).vibrate(pattern)
          add(`  \x1b[32m📳 ${args === 'sos' ? 'SOS pattern!' : 'Buzz!'}\x1b[0m`, '  (Mobile only)', '')
        } else { add('  Vibration API not available.', '') }
        break
      }
      case 'qr': {
        const text = args || window.location.href
        const size = 25
        const data: boolean[][] = []
        let hash = 0
        for (let i = 0; i < text.length; i++) hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0
        for (let y = 0; y < size; y++) {
          data[y] = []
          for (let x = 0; x < size; x++) {
            const isBorder = x === 0 || y === 0 || x === size - 1 || y === size - 1
            const isCorner = (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7)
            const isCornerInner = (x >= 2 && x <= 4 && y >= 2 && y <= 4) || (x >= size - 5 && x <= size - 3 && y >= 2 && y <= 4) || (x >= 2 && x <= 4 && y >= size - 5 && y <= size - 3)
            const isCornerBorder = isCorner && (x === 0 || x === 6 || x === size - 7 || x === size - 1 || y === 0 || y === 6 || y === size - 7 || y === size - 1)
            const pseudoRandom = ((hash * (x + 1) * (y + 1) * 7919) >>> 0) % 100 > 45
            data[y][x] = isCornerInner || isCornerBorder || (!isCorner && !isBorder && pseudoRandom)
          }
        }
        add(`  \x1b[36mQR: ${text.slice(0, 40)}${text.length > 40 ? '...' : ''}\x1b[0m`)
        for (let y = 0; y < size; y += 2) {
          let line = '  '
          for (let x = 0; x < size; x++) {
            const top = data[y]?.[x]
            const bot = data[y + 1]?.[x]
            if (top && bot) line += '█'
            else if (top) line += '▀'
            else if (bot) line += '▄'
            else line += ' '
          }
          add(line)
        }
        add('', '  (Visual representation — not scannable)', '')
        break
      }
      case 'webcam': case 'selfie': {
        add('  \x1b[36mRequesting camera...\x1b[0m')
        navigator.mediaDevices.getUserMedia({ video: { width: 64, height: 48 } }).then(stream => {
          const video = document.createElement('video')
          video.srcObject = stream
          video.play().then(() => {
            setTimeout(() => {
              const canvas = document.createElement('canvas')
              const w = 64, h = 48
              canvas.width = w; canvas.height = h
              const ctx = canvas.getContext('2d')!
              ctx.drawImage(video, 0, 0, w, h)
              const imageData = ctx.getImageData(0, 0, w, h)
              const chars = ' .:-=+*#%@'
              const asciiLines: string[] = []
              for (let y = 0; y < h; y += 2) {
                let line = '  '
                for (let x = 0; x < w; x++) {
                  const i = (y * w + x) * 4
                  const brightness = (imageData.data[i] * 0.299 + imageData.data[i + 1] * 0.587 + imageData.data[i + 2] * 0.114) / 255
                  line += chars[Math.floor(brightness * (chars.length - 1))]
                }
                asciiLines.push(line)
              }
              add('', ...asciiLines, '', '  \x1b[32m📸 Captured!\x1b[0m', '')
              stream.getTracks().forEach(t => t.stop())
            }, 500)
          })
        }).catch(err => add(`  \x1b[31mCamera error: ${err.message}\x1b[0m`, ''))
        break
      }

      case 'make': if (args.toLowerCase().includes('sandwich')) add('  What? Make it yourself.','  ...','  Okay fine. 🥪 Here is your sandwich.',''); else add(`  make: *** No rule to make target '${args}'. Stop.`,''); break
      default: add(`  command not found: ${c}. Type "help" for commands.`,''); break
    }
  }
  const renderLine = (line: string) => line.replace(/\x1b\[36m/g,'§c§').replace(/\x1b\[35m/g,'§p§').replace(/\x1b\[31m/g,'§r§').replace(/\x1b\[32m/g,'§g§').replace(/\x1b\[0m/g,'§0§').split(/(§[cprg0]§)/).reduce<{els:React.ReactNode[],color:string}>((acc,part,i)=>{if(part==='§c§')acc.color='text-cyan-400';else if(part==='§p§')acc.color='text-purple-400';else if(part==='§r§')acc.color='text-red-400';else if(part==='§g§')acc.color='text-green-400';else if(part==='§0§')acc.color='';else acc.els.push(<span key={i} className={acc.color}>{part}</span>);return acc},{els:[],color:''}).els
  return (
    <div className="h-full bg-[#0a0a14] font-mono text-sm p-5 flex flex-col" onClick={()=>inputRef.current?.focus()}>
      <div className="flex-1 overflow-y-auto"><div className="space-y-0.5">{lines.map((l,i)=><div key={i} className="text-green-400/80 whitespace-pre leading-relaxed">{renderLine(l)}</div>)}</div><div ref={endRef}/></div>
      <div className="flex items-center gap-2 mt-3 shrink-0">
        <span className="text-green-400/80 shrink-0">{vimMode?':':'$'}</span>
        <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{if(e.key==='Enter'&&input.trim()){exec(input);setInput('');setHistIdx(-1)}
            else if(e.key==='ArrowUp'){e.preventDefault();const idx=histIdx<history.length-1?histIdx+1:histIdx;setHistIdx(idx);setInput(history[history.length-1-idx]||'')}
            else if(e.key==='ArrowDown'){e.preventDefault();const idx=histIdx>0?histIdx-1:-1;setHistIdx(idx);setInput(idx>=0?history[history.length-1-idx]||'':'')}
            else if(e.key==='Tab'){e.preventDefault();const ps=input.split(' ');if(ps.length<=1){const cmds=['help','hint','about','skills','contact','ls','cat','open','neofetch','whoami','hostname','pwd','date','uptime','fortune','joke','cowsay','echo','weather','sudo','matrix','ping','snake','konami','history','clear','exit','ssh','vim','curl','git','npm','ascii','tree','man','theme','make','whoismyip','ip','decrypt','rickroll','speed','battery','screen','time','calc','share','notify','download','wifi','network','benchmark','uuid','base64','toast','password','passwd','flip','dice','roll','countdown','geolocate','gps','location','vibrate','qr','webcam','selfie'];const m=cmds.find(x=>x.startsWith(ps[0]));if(m)setInput(m)}else{const cmd=ps[0].toLowerCase(),arg=ps.slice(1).join(' ').toLowerCase();let opts:string[]=[];if(cmd==='cat')opts=['resume.txt','README.md','.secret','.bashrc'];else if(cmd==='open')opts=['about','skills','experience','projects','contact','terminal','snake'];else if(cmd==='sudo')opts=['hire konrad','rm -rf /'];const m=opts.find(o=>o.toLowerCase().startsWith(arg));if(m)setInput(`${ps[0]} ${m}`)}}}}
          className="flex-1 bg-transparent outline-none text-green-400 caret-green-400 text-sm" autoFocus spellCheck={false}/>
      </div>
    </div>
  )
}

/* ═══════════ SNAKE ═══════════ */
function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null); const [score, setScore] = useState(0); const [gameOver, setGameOver] = useState(false)
  const dirRef = useRef({x:1,y:0}); const gameRef = useRef({snake:[{x:5,y:5}],food:{x:10,y:10},running:true})
  const reset = () => { gameRef.current={snake:[{x:5,y:5}],food:{x:Math.floor(Math.random()*19),y:Math.floor(Math.random()*19)},running:true}; dirRef.current={x:1,y:0}; setScore(0); setGameOver(false) }
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); if (!ctx) return; const S=20,G=20
    const onKey = (e: KeyboardEvent) => { const d=dirRef.current; if(e.key==='ArrowUp'&&d.y===0)dirRef.current={x:0,y:-1};else if(e.key==='ArrowDown'&&d.y===0)dirRef.current={x:0,y:1};else if(e.key==='ArrowLeft'&&d.x===0)dirRef.current={x:-1,y:0};else if(e.key==='ArrowRight'&&d.x===0)dirRef.current={x:1,y:0} }
    window.addEventListener('keydown', onKey)
    const interval = setInterval(() => {
      const g=gameRef.current; if(!g.running)return; const head={x:g.snake[0].x+dirRef.current.x,y:g.snake[0].y+dirRef.current.y}
      if(head.x<0||head.x>=G||head.y<0||head.y>=G||g.snake.some(s=>s.x===head.x&&s.y===head.y)){g.running=false;setGameOver(true);return}
      g.snake.unshift(head); if(head.x===g.food.x&&head.y===g.food.y){g.food={x:Math.floor(Math.random()*G),y:Math.floor(Math.random()*G)};setScore(s=>s+10)}else g.snake.pop()
      ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,G*S,G*S);ctx.fillStyle='#00e5ff08';for(let i=0;i<G;i++)for(let j=0;j<G;j++){if((i+j)%2===0)ctx.fillRect(i*S,j*S,S,S)}
      g.snake.forEach((s,i)=>{ctx.fillStyle=i===0?'#00e5ff':'#00e5ff60';ctx.beginPath();ctx.roundRect(s.x*S+1,s.y*S+1,S-2,S-2,3);ctx.fill()})
      ctx.fillStyle='#ff3366';ctx.beginPath();ctx.roundRect(g.food.x*S+2,g.food.y*S+2,S-4,S-4,4);ctx.fill()
    }, 110)
    return () => { clearInterval(interval); window.removeEventListener('keydown', onKey) }
  }, [gameOver])
  const touchDir = (x:number,y:number) => { const d=dirRef.current; if(x!==0&&d.x===0)dirRef.current={x,y:0}; if(y!==0&&d.y===0)dirRef.current={x:0,y} }
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#0a0a14] p-4 gap-3">
      <div className="flex items-center justify-between w-[400px] max-w-full"><span className="text-primary font-mono text-sm">Score: {score}</span>{gameOver&&<button onClick={reset} className="px-4 py-1.5 rounded-lg bg-primary text-bg text-xs font-bold">Restart</button>}</div>
      <canvas ref={canvasRef} width={400} height={400} className="rounded-xl border border-white/10 max-w-full"/>
      {/* Touch controls */}
      <div className="grid grid-cols-3 gap-1 w-32 mt-2 md:hidden">
        <div/><button onTouchStart={()=>touchDir(0,-1)} className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary text-lg">↑</button><div/>
        <button onTouchStart={()=>touchDir(-1,0)} className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary text-lg">←</button>
        <div/>
        <button onTouchStart={()=>touchDir(1,0)} className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary text-lg">→</button>
        <div/><button onTouchStart={()=>touchDir(0,1)} className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary text-lg">↓</button><div/>
      </div>
      <p className="text-text-muted text-xs font-mono hidden md:block">Arrow keys to move</p>
    </div>
  )
}

/* ═══════════ NOTIFICATION ═══════════ */
function Toast({ text, onDismiss }: { text: string; onDismiss: () => void }) {
  return (
    <motion.div initial={{opacity:0,x:80,scale:0.9}} animate={{opacity:1,x:0,scale:1}} exit={{opacity:0,x:80}}
      className="bg-surface/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl px-4 py-3 shadow-2xl max-w-xs cursor-pointer" onClick={onDismiss}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><span className="text-primary text-sm font-display font-bold">KD</span></div>
        <div><p className="text-text text-sm font-semibold">KD OS</p><p className="text-text-muted text-xs mt-0.5">{text}</p></div>
      </div>
    </motion.div>
  )
}

/* ═══════════ MAIN ═══════════ */
export function Desktop() {
  const { t, lang, setLang } = useLanguage()
  const desktopRef = useRef<HTMLDivElement>(null); const dockRef = useRef<HTMLDivElement>(null); const iconRefs = useRef<(HTMLButtonElement|null)[]>([])
  const [windows, setWindows] = useState<Record<string, WinState>>({}); const [topZ, setTopZ] = useState(10)
  const [time, setTime] = useState(new Date()); const [isMobile, setIsMobile] = useState(false)
  const formRef = useRef<HTMLFormElement>(null); const [mailStatus, setMailStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [notifications, setNotifications] = useState<{id:number,text:string}[]>([])
  const [ctxMenu, setCtxMenu] = useState<{x:number,y:number}|null>(null)
  const [wpIdx, setWpIdx] = useState(0); const wpNames = ['Mesh', 'Matrix Rain', 'Starfield']
  const [mobileApp, setMobileApp] = useState<string|null>(null)
  const [zoom, setZoom] = useState(() => { const saved = localStorage.getItem('kd-zoom'); return saved ? Number(saved) : 100 })
  const [konamiBuf, setKonamiBuf] = useState<string[]>([])
  const konamiSeq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

  const notify = useCallback((text: string) => { const id=Date.now(); setNotifications(n=>[...n,{id,text}]); setTimeout(()=>setNotifications(n=>n.filter(x=>x.id!==id)),5000) }, [])

  useEffect(() => { const c=()=>setIsMobile(window.innerWidth<768); c(); window.addEventListener('resize',c); return ()=>window.removeEventListener('resize',c) }, [])
  useEffect(() => { localStorage.setItem('kd-zoom', String(zoom)) }, [zoom])
  // Ctrl+Plus/Minus zoom
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) { e.preventDefault(); setZoom(z => Math.min(150, z + 10)) }
      if ((e.ctrlKey || e.metaKey) && e.key === '-') { e.preventDefault(); setZoom(z => Math.max(70, z - 10)) }
      if ((e.ctrlKey || e.metaKey) && e.key === '0') { e.preventDefault(); setZoom(100) }
    }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => { const t2=setInterval(()=>setTime(new Date()),60000); return ()=>clearInterval(t2) }, [])
  const didInit = useRef(false)
  useEffect(() => { if (didInit.current) return; didInit.current = true; if(!isMobile){setTimeout(()=>openWindow('about'),500)}; setTimeout(()=>notify(lang==='de'?'Willkommen bei KD OS! Rechtsklick für Optionen.':'Welcome to KD OS! Right-click for options.'),1500) }, [])

  // Konami code listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setKonamiBuf(buf => {
        const next = [...buf, e.key].slice(-10)
        if (next.length === 10 && next.every((k,i) => k === konamiSeq[i])) {
          notify('🎮 KONAMI CODE ACTIVATED! You are a true gamer. 🏆')
          setWpIdx(1) // switch to Matrix
          return []
        }
        return next
      })
    }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [notify])

  // Dock magnification (desktop only)
  useEffect(() => {
    if (isMobile) return
    const dock=dockRef.current; if(!dock) return
    const onMove=(e:MouseEvent)=>{iconRefs.current.forEach(icon=>{if(!icon)return;const rect=icon.getBoundingClientRect();const dist=Math.abs(e.clientX-(rect.left+rect.width/2));const s=Math.max(1,1.4-dist/110);icon.style.transform=`scale(${s}) translateY(${Math.max(0,-(s-1)*18)}px)`})}
    const onLeave=()=>{iconRefs.current.forEach(icon=>{if(icon)icon.style.transform='scale(1) translateY(0)'})}
    dock.addEventListener('mousemove',onMove); dock.addEventListener('mouseleave',onLeave)
    return ()=>{dock.removeEventListener('mousemove',onMove);dock.removeEventListener('mouseleave',onLeave)}
  }, [isMobile])

  const openWindow = (id: string) => { setWindows(prev => { const existing=prev[id]; const idx=appDefs.findIndex(a=>a.id===id); const app=appDefs[idx]; const newZ=topZ+1; setTopZ(newZ); if(existing?.isOpen&&existing.minimized) return {...prev,[id]:{...existing,minimized:false,z:newZ}}; if(existing?.isOpen) return {...prev,[id]:{...existing,z:newZ}}; return {...prev,[id]:{isOpen:true,minimized:false,maximized:false,z:newZ,x:60+idx*40,y:45+idx*35,w:app.w,h:app.h}} }) }
  const closeWindow = (id: string) => setWindows(prev=>({...prev,[id]:{...prev[id],isOpen:false,maximized:false}}))
  const minimizeWindow = (id: string) => setWindows(prev=>({...prev,[id]:{...prev[id],minimized:true}}))
  const maximizeWindow = (id: string) => setWindows(prev=>{const s=prev[id];if(!s)return prev;if(s.maximized)return{...prev,[id]:{...s,maximized:false,...(s.preMax||{})}};return{...prev,[id]:{...s,maximized:true,preMax:{x:s.x,y:s.y,w:s.w,h:s.h}}}})
  const focusWindow = (id: string) => { const z=topZ+1; setTopZ(z); setWindows(prev=>({...prev,[id]:{...prev[id],z}})) }
  const resizeWindow = (id: string, w: number, h: number) => setWindows(prev=>({...prev,[id]:{...prev[id],w,h}}))

  const activeWin = Object.entries(windows).filter(([,s])=>s.isOpen&&!s.minimized).sort(([,a],[,b])=>b.z-a.z)[0]

  const handleMail = async (e: React.FormEvent) => { e.preventDefault(); if(!formRef.current)return; setMailStatus('sending'); try{await emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID,import.meta.env.VITE_EMAILJS_TEMPLATE_ID,formRef.current,import.meta.env.VITE_EMAILJS_PUBLIC_KEY);setMailStatus('success');formRef.current.reset();notify(lang==='de'?'Nachricht gesendet!':'Message sent!');setTimeout(()=>setMailStatus('idle'),4000)}catch{setMailStatus('error');setTimeout(()=>setMailStatus('idle'),4000)} }

  const labels: Record<string, string> = { about:t.nav.about, skills:t.nav.skills, experience:t.nav.experience, projects:t.nav.projects, contact:t.nav.contact, terminal:'Terminal', snake:'Snake' }

  const renderContent = (id: string) => {
    switch (id) {
      case 'about': return (
        <div className="h-full overflow-y-auto bg-[#0a0a18]">
          {/* Profile header */}
          <div className="text-center pt-8 pb-5 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] to-transparent" />
            <div className="relative">
              <div className="relative inline-block mb-3">
                <img src={profileImage} className="w-24 h-24 rounded-full object-cover border-[3px] border-primary/30 shadow-[0_0_30px_rgba(0,229,255,0.15)]" />
                <div className="absolute bottom-0.5 right-0.5 w-5 h-5 rounded-full bg-green-500 border-[3px] border-[#0a0a18]" />
              </div>
              <h2 className="font-display font-black text-2xl text-text">Konrad Dinges</h2>
              <p className="text-primary font-mono text-sm mt-1">Full Stack Developer</p>
              <p className="text-text-muted text-xs mt-1 flex items-center justify-center gap-1"><MapPin size={11} />{t.contact.meederGermany}</p>
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex justify-center gap-3 px-6 pb-4">
            <a href="mailto:mail@konrad-dinges.de" className="flex flex-col items-center gap-1.5 w-20 py-2.5 rounded-xl bg-surface hover:bg-surface-light transition-colors"><MailIcon size={18} className="text-primary" /><span className="text-[10px] text-text-muted">Email</span></a>
            <a href="https://github.com/Floatyy1998" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 w-20 py-2.5 rounded-xl bg-surface hover:bg-surface-light transition-colors"><GithubIcon size={18} className="text-text-muted" /><span className="text-[10px] text-text-muted">GitHub</span></a>
            <a href="https://linkedin.com/in/konrad-dinges-803098296" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 w-20 py-2.5 rounded-xl bg-surface hover:bg-surface-light transition-colors"><LinkedinIcon size={18} className="text-text-muted" /><span className="text-[10px] text-text-muted">LinkedIn</span></a>
          </div>
          {/* Stats row */}
          <div className="grid grid-cols-3 mx-6 mb-4 rounded-2xl bg-surface overflow-hidden">
            {[{v:'3+',l:t.about.yearsExp,color:'#00e5ff'},{v:'15+',l:t.about.projectsCompleted,color:'#bf5af2'},{v:'10+',l:t.about.techMastered,color:'#ff3366'}].map((s,i)=>(
              <div key={i} className="py-3.5 text-center border-r border-white/[0.04] last:border-r-0">
                <div className="font-display font-black text-2xl" style={{color:s.color}}>{s.v}</div>
                <p className="text-text-muted text-[10px] uppercase tracking-wider mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
          {/* Info list */}
          <div className="px-6 pb-6">
            <div className="rounded-2xl bg-surface divide-y divide-white/[0.04] overflow-hidden">
              <div className="px-4 py-3"><p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{lang === 'de' ? 'Beruf' : 'Role'}</p><p className="text-sm text-text">{lang === 'de' ? 'Webentwickler' : 'Web Developer'} @ HUK-COBURG</p></div>
              <div className="px-4 py-3"><p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Email</p><p className="text-sm text-primary">mail@konrad-dinges.de</p></div>
              <div className="px-4 py-3"><p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{t.contact.location}</p><p className="text-sm text-text">Meeder, Germany</p></div>
              <div className="px-4 py-3"><p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{lang === 'de' ? 'Info' : 'About'}</p><p className="text-sm text-text-muted leading-relaxed">{t.about.description}</p></div>
              <div className="px-4 py-3"><p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{lang === 'de' ? 'Mehr' : 'More'}</p><p className="text-sm text-text-muted leading-relaxed">{t.about.longDescription}</p></div>
            </div>
          </div>
        </div>
      )

      case 'skills': {
        const proficiency: Record<string,number> = {React:97,Angular:90,TypeScript:95,JavaScript:92,'Vue.js':70,'Next.js':75,Tailwind:93,'HTML/CSS':97,'Node.js':85,Java:80,Kotlin:75,'ASP.NET Core':70,Python:65,MongoDB:80,PostgreSQL:70,Firebase:85,Git:95,Docker:75,AWS:70,Jenkins:80,Figma:65,Vite:90}
        const allSkills = skillsData.flatMap(c => c.items.map(s => ({ ...s, cat: c.cat, catColor: c.color })))
        const avgPct = Math.round(allSkills.reduce((sum, s) => sum + (proficiency[s.n] || 50), 0) / allSkills.length)
        const Ring = ({ pct, color, size = 48, width = 3.5 }: { pct: number; color: string; size?: number; width?: number }) => {
          const r = (size - width * 2) / 2; const circ = 2 * Math.PI * r; const offset = circ * (1 - pct / 100)
          return (
            <svg width={size} height={size} className="shrink-0 -rotate-90">
              <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={width} />
              <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round"
                strokeDasharray={circ} strokeDashoffset={offset} style={{ filter: `drop-shadow(0 0 4px ${color}60)`, transition: 'stroke-dashoffset 1.5s ease-out' }} />
            </svg>
          )
        }
        return (
          <div className="h-full flex flex-col bg-[#0a0a18]">
            {/* Dashboard header */}
            <div className="shrink-0 px-6 pt-5 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Ring pct={avgPct} color="#00e5ff" size={56} width={4} />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-primary">{avgPct}</span>
                  </div>
                  <div>
                    <p className="text-lg font-display font-bold text-text">{lang === 'de' ? 'Skill-Level' : 'Skill Level'}</p>
                    <p className="text-xs text-text-muted">{allSkills.length} {lang === 'de' ? 'Technologien' : 'technologies'}</p>
                  </div>
                </div>
              </div>
              {/* Category pills */}
              <div className="flex gap-2">
                {skillsData.map(cat => (
                  <div key={cat.cat} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface text-xs">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor:cat.color}} />
                    <span className="text-text-muted">{cat.cat}</span>
                    <span className="text-text font-semibold">{cat.items.length}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Skills grid */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="space-y-5">
                {skillsData.map(cat => (
                  <div key={cat.cat}>
                    <p className="text-[11px] uppercase tracking-wider text-text-muted mb-2 flex items-center gap-2">
                      <span className="w-5 h-[2px] rounded" style={{backgroundColor:cat.color}} />{cat.cat}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {cat.items.map(s => {
                        const pct = proficiency[s.n] || 50
                        return (
                          <div key={s.n} className="group flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface border border-white/[0.03] hover:border-white/[0.08] transition-all">
                            <div className="relative shrink-0">
                              <Ring pct={pct} color={s.c} size={40} width={3} />
                              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono text-text-muted">{pct}</span>
                            </div>
                            <span className="text-sm font-medium text-text truncate">{s.n}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }

      case 'experience': return (
        <div className="h-full flex flex-col bg-[#0a0a18]">
          {/* Header bar */}
          <div className="shrink-0 px-6 pt-5 pb-4 flex items-center justify-between">
            <div>
              <p className="text-lg font-display font-bold text-text">{t.experience.title}</p>
              <p className="text-xs text-text-muted">{t.experience.positions.length} {lang === 'de' ? 'Stationen' : 'positions'} &middot; {t.experience.positions[0].period.split('—')[0].trim()} &rarr; {lang === 'de' ? 'Heute' : 'Present'}</p>
            </div>
            {t.experience.positions[0].isCurrent && <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />{t.experience.current}</span>}
          </div>
          {/* Timeline */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[23px] top-2 bottom-2 w-[2px] bg-white/[0.04]" />
              <div className="space-y-1">
                {t.experience.positions.map((pos, i) => (
                  <div key={i} className="relative flex gap-5 group">
                    {/* Timeline node */}
                    <div className="shrink-0 pt-4 relative z-10">
                      <div className={`w-[48px] h-[48px] rounded-2xl flex items-center justify-center ${pos.isCurrent ? 'bg-primary/15 border border-primary/30' : 'bg-surface border border-white/[0.06]'}`}>
                        {logos[pos.company] ? <img src={logos[pos.company]} alt="" className="w-7 h-7 object-contain" /> : <Briefcase size={20} className={pos.isCurrent ? 'text-primary' : 'text-text-muted'} />}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 py-3">
                      <div className="rounded-2xl bg-surface border border-white/[0.04] group-hover:border-white/[0.08] transition-colors p-4 relative overflow-hidden">
                        {pos.isCurrent && <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-secondary" />}
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-display font-bold text-base text-text">{pos.title}</h3>
                          <span className="text-[11px] text-text-muted font-mono shrink-0 ml-2">{pos.period.split('—')[0].trim()}</span>
                        </div>
                        <p className="text-text-muted text-sm mb-1">{pos.company}</p>
                        <div className="flex gap-3 text-text-muted text-[11px] mb-2">
                          <span className="flex items-center gap-1"><Calendar size={10} />{pos.period}</span>
                          <span className="flex items-center gap-1"><MapPin size={10} />{pos.location}</span>
                        </div>
                        <p className="text-text-muted text-xs leading-relaxed mb-3">{pos.description}</p>
                        <div className="flex flex-wrap gap-1">{pos.tech.map(tc => <span key={tc} className="px-2 py-0.5 text-[10px] font-mono rounded bg-primary/5 text-primary/70">{tc}</span>)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )

      case 'projects': return (
        <div className="h-full overflow-y-auto bg-[#0a0a18]">
          {/* Header */}
          <div className="px-6 pt-5 pb-3 flex items-center justify-between sticky top-0 bg-[#0a0a18]/90 backdrop-blur-xl z-10">
            <div>
              <p className="text-lg font-display font-bold text-text">{t.projects.title}</p>
              <p className="text-xs text-text-muted">{t.projects.items.length} {lang === 'de' ? 'Projekte' : 'projects'}</p>
            </div>
          </div>
          {/* Project cards — stacked, large images */}
          <div className="px-5 pb-5 space-y-4">
            {t.projects.items.map((p, i) => {
              const m = projectMeta[i]
              return (
                <div key={i} className="group rounded-2xl overflow-hidden bg-surface border border-white/[0.04] hover:border-white/[0.08] transition-all">
                  {/* Large image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={projectImages[i]} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                    {/* Overlay actions */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {m.url && <a href={m.url} target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 rounded-lg bg-primary text-bg text-xs font-bold shadow-lg flex items-center gap-1.5">Live <ArrowUpRight size={11}/></a>}
                      {m.gh && <a href={m.gh} target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium border border-white/10 flex items-center gap-1.5"><GithubIcon size={12}/>Code</a>}
                    </div>
                    {/* Number badge */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 text-xs font-mono border border-white/10">{String(i+1).padStart(2,'0')}</div>
                  </div>
                  {/* Content below image */}
                  <div className="p-4">
                    <h3 className="font-display font-bold text-base text-text mb-1.5">{p.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-3">{p.description}</p>
                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.features.map(f => <span key={f} className="px-2.5 py-1 text-[10px] rounded-full bg-accent/8 text-accent border border-accent/10 font-medium">{f}</span>)}
                    </div>
                    {/* Tech + Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {m.tech.map(tc => <span key={tc} className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] text-text-muted">{tc}</span>)}
                      </div>
                      <div className="flex gap-2 shrink-0 ml-3">
                        {m.url && <a href={m.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"><ArrowUpRight size={15}/></a>}
                        {m.gh && <a href={m.gh} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-text-muted hover:text-text transition-colors"><GithubIcon size={15}/></a>}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )

      case 'contact': return (
        <div className="h-full flex flex-col bg-[#0a0a18]">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.04] bg-surface/50 shrink-0">
            <img src={profileImage} className="w-9 h-9 rounded-full object-cover" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-text">Konrad Dinges</p>
              <p className="text-[11px] text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />{lang === 'de' ? 'Online — Antwortet schnell' : 'Online — Replies quickly'}</p>
            </div>
            <div className="flex gap-2">
              <a href="https://github.com/Floatyy1998" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-text transition-colors"><GithubIcon size={15}/></a>
              <a href="https://linkedin.com/in/konrad-dinges-803098296" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-text transition-colors"><LinkedinIcon size={15}/></a>
            </div>
          </div>
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Received messages */}
            <div className="flex gap-3 max-w-[80%]">
              <img src={profileImage} className="w-7 h-7 rounded-full object-cover mt-1 shrink-0" />
              <div className="space-y-2">
                <div className="bg-surface rounded-2xl rounded-tl-sm px-4 py-3"><p className="text-sm text-text">{t.contact.description}</p></div>
                <div className="bg-surface rounded-2xl rounded-tl-sm px-4 py-3">
                  <p className="text-sm text-text mb-2">{lang === 'de' ? 'Schreib mir hier oder direkt per:' : 'Write me here or reach out via:'}</p>
                  <div className="space-y-1.5">
                    <a href="mailto:mail@konrad-dinges.de" className="flex items-center gap-2 text-primary text-sm hover:underline"><MailIcon size={13}/>mail@konrad-dinges.de</a>
                    <p className="flex items-center gap-2 text-text-muted text-sm"><MapPin size={13}/>{t.contact.meederGermany}</p>
                  </div>
                </div>
                <p className="text-[10px] text-text-muted pl-1">{new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</p>
              </div>
            </div>
            {/* Success/Error messages */}
            {mailStatus === 'success' && (
              <div className="flex justify-end"><div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]"><p className="text-sm text-primary flex items-center gap-2"><CheckCircle size={14}/>{t.contact.success}</p></div></div>
            )}
            {mailStatus === 'error' && (
              <div className="flex justify-end"><div className="bg-red-500/10 border border-red-500/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]"><p className="text-sm text-red-400 flex items-center gap-2"><AlertCircle size={14}/>{t.contact.error}</p></div></div>
            )}
          </div>
          {/* Chat input */}
          <form ref={formRef} onSubmit={handleMail} className="shrink-0 border-t border-white/[0.04] p-3 space-y-2 bg-surface/30">
            <div className="flex gap-2">
              <input name="user_name" required placeholder={t.contact.namePlaceholder} className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-text text-sm placeholder:text-text-muted/40 outline-none focus:border-primary/40 transition-colors" />
              <input name="user_email" type="email" required placeholder={t.contact.emailPlaceholder} className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-text text-sm placeholder:text-text-muted/40 outline-none focus:border-primary/40 transition-colors" />
            </div>
            <div className="flex gap-2">
              <textarea name="message" required rows={2} placeholder={t.contact.messagePlaceholder} className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-text text-sm placeholder:text-text-muted/40 outline-none focus:border-primary/40 resize-none transition-colors" />
              <button type="submit" disabled={mailStatus==='sending'} className="w-12 h-12 rounded-xl bg-primary text-bg flex items-center justify-center hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all disabled:opacity-50 shrink-0 self-end">
                {mailStatus==='sending' ? <div className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin"/> : <Send size={18}/>}
              </button>
            </div>
          </form>
        </div>
      )

      case 'terminal': return <TerminalContent openWindow={openWindow} notify={notify} />
      case 'snake': return <SnakeGame />
      default: return null
    }
  }

  /* ═══════════ MOBILE VIEW ═══════════ */
  if (isMobile) {
    return (
      <div className="h-[100dvh] w-screen overflow-hidden relative bg-bg flex flex-col">
        {/* Wallpaper */}
        <div className="absolute inset-0">{wpIdx === 0 ? <MeshGradientWP /> : wpIdx === 1 ? <MatrixRain /> : <StarfieldWP />}</div>
        {/* Menu bar */}
        <div className="relative z-10 h-10 flex items-center px-4 bg-bg/70 backdrop-blur-2xl border-b border-white/[0.04] shrink-0">
          <span className="font-display font-bold text-base text-primary">KD<span className="text-secondary">.</span></span>
          <div className="ml-auto flex items-center gap-4">
            <button onClick={()=>setLang(lang==='en'?'de':'en')} className="text-xs text-text-muted font-mono">{lang==='en'?'DE':'EN'}</button>
            <span className="text-xs text-text-muted tabular-nums">{time.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span>
          </div>
        </div>

        {/* App content or home grid */}
        <AnimatePresence>
          {mobileApp ? (
            <motion.div key="app" initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} transition={{type:'spring',stiffness:300,damping:30}}
              className="absolute inset-0 z-20 flex flex-col bg-bg" style={{top:40}}>
              {/* Header */}
              <div className="h-12 flex items-center justify-between px-4 shrink-0 border-b border-white/[0.04]">
                <div className="flex items-center gap-2 text-text text-sm font-medium">
                  {(() => { const a=appDefs.find(x=>x.id===mobileApp); return a?<><a.icon size={16} className="text-primary"/>{labels[mobileApp]}</>:null })()}
                </div>
                <button onClick={()=>setMobileApp(null)} className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-text-muted"><XIcon size={16}/></button>
              </div>
              <div className="flex-1 overflow-y-auto">{renderContent(mobileApp)}</div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Home screen */}
        <div className="flex-1 relative z-10 flex flex-col items-center justify-center px-6">
          {/* Clock widget */}
          <div className="text-center mb-12">
            <p className="font-display font-black text-6xl text-text tabular-nums">{time.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</p>
            <p className="text-text-muted text-sm mt-1">{time.toLocaleDateString(lang==='de'?'de-DE':'en-US',{weekday:'long',month:'long',day:'numeric'})}</p>
          </div>
          {/* App grid */}
          <div className="grid grid-cols-3 gap-6">
            {appDefs.map(app => (
              <button key={app.id} onClick={()=>setMobileApp(app.id)} className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-2xl bg-surface/80 backdrop-blur-xl border border-white/[0.06] flex items-center justify-center text-text-muted group-active:scale-90 transition-transform">
                  <app.icon size={28}/>
                </div>
                <span className="text-text text-[11px] font-medium">{labels[app.id]||app.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 h-6 flex items-center justify-center shrink-0">
          <div className="w-32 h-1 rounded-full bg-white/20"/>
        </div>

        {/* Notifications */}
        <div className="fixed top-12 right-3 z-[250] space-y-2"><AnimatePresence>{notifications.map(n=><Toast key={n.id} text={n.text} onDismiss={()=>setNotifications(ns=>ns.filter(x=>x.id!==n.id))}/>)}</AnimatePresence></div>
      </div>
    )
  }

  /* ═══════════ DESKTOP VIEW ═══════════ */
  return (
    <div ref={desktopRef} className="h-screen w-screen overflow-hidden relative bg-bg select-none"
      onContextMenu={e=>{e.preventDefault();setCtxMenu({x:e.clientX,y:e.clientY})}} onClick={()=>setCtxMenu(null)}>
      {/* Wallpaper */}
      <div className="absolute inset-0">
        {wpIdx === 0 ? <MeshGradientWP /> : wpIdx === 1 ? <MatrixRain /> : <StarfieldWP />}
      </div>
      {/* Menu bar */}
      <div className="absolute top-0 left-0 right-0 h-9 z-[200] flex items-center px-5 bg-bg/70 backdrop-blur-2xl border-b border-white/[0.04]">
        <span className="font-display font-bold text-base text-primary cursor-default">KD<span className="text-secondary">.</span></span>
        {activeWin&&<span className="ml-3 text-xs text-text-muted font-medium">{labels[activeWin[0]]||''}</span>}
        <div className="ml-auto flex items-center gap-5">
          {zoom !== 100 && <span className="text-xs text-text-muted font-mono">{zoom}%</span>}
          <span className="text-xs text-text-muted">{wpNames[wpIdx]}</span>
          <Link to="/impressum" className="text-xs text-text-muted hover:text-text transition-colors">Legal</Link>
          <button onClick={()=>setLang(lang==='en'?'de':'en')} className="text-xs text-text-muted hover:text-text transition-colors font-mono">{lang==='en'?'DE':'EN'}</button>
          <span className="text-xs text-text-muted tabular-nums">{time.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span>
        </div>
      </div>
      {/* Context menu */}
      <AnimatePresence>{ctxMenu&&(
        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}}
          className="fixed z-[300] bg-surface/95 backdrop-blur-2xl border border-white/[0.08] rounded-xl py-1.5 shadow-2xl min-w-[200px]"
          style={{left:ctxMenu.x,top:ctxMenu.y}} onClick={e=>e.stopPropagation()}>
          <button onClick={()=>{notify('KD OS v2.0 — React 19 + TypeScript + Framer Motion\nby Konrad Dinges');setCtxMenu(null)}} className="w-full px-4 py-2.5 text-left text-sm text-text hover:bg-white/[0.05] transition-colors">About KD OS</button>
          <button onClick={()=>{setWpIdx(w=>(w+1)%wpNames.length);setCtxMenu(null)}} className="w-full px-4 py-2.5 text-left text-sm text-text hover:bg-white/[0.05] transition-colors">Wallpaper: {wpNames[(wpIdx+1)%wpNames.length]}</button>
          <div className="border-t border-white/[0.04] my-1"/>
          <div className="px-4 py-2 flex items-center justify-between">
            <span className="text-sm text-text">{lang === 'de' ? 'Anzeige' : 'Display'}</span>
            <div className="flex items-center gap-1">
              <button onClick={()=>setZoom(z=>Math.max(70,z-10))} className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-text text-sm font-bold transition-colors flex items-center justify-center">−</button>
              <span className="text-xs text-text-muted w-10 text-center font-mono">{zoom}%</span>
              <button onClick={()=>setZoom(z=>Math.min(150,z+10))} className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-text text-sm font-bold transition-colors flex items-center justify-center">+</button>
            </div>
          </div>
          <div className="border-t border-white/[0.04] my-1"/>
          <button onClick={()=>{openWindow('terminal');setCtxMenu(null)}} className="w-full px-4 py-2.5 text-left text-sm text-text hover:bg-white/[0.05] transition-colors flex items-center gap-2"><Terminal size={14}/>Open Terminal</button>
          <button onClick={()=>{openWindow('snake');setCtxMenu(null)}} className="w-full px-4 py-2.5 text-left text-sm text-text hover:bg-white/[0.05] transition-colors flex items-center gap-2"><Gamepad2 size={14}/>Play Snake</button>
          <div className="border-t border-white/[0.04] my-1"/>
          <button onClick={()=>{setWindows({});setCtxMenu(null)}} className="w-full px-4 py-2.5 text-left text-sm text-text-muted hover:bg-white/[0.05] transition-colors">Close All Windows</button>
        </motion.div>
      )}</AnimatePresence>
      {/* Notifications */}
      <div className="fixed top-11 right-4 z-[250] space-y-2"><AnimatePresence>{notifications.map(n=><Toast key={n.id} text={n.text} onDismiss={()=>setNotifications(ns=>ns.filter(x=>x.id!==n.id))}/>)}</AnimatePresence></div>
      {/* Windows */}
      <AnimatePresence>{appDefs.map(app=>{const s=windows[app.id];if(!s?.isOpen||s.minimized)return null;return(
        <AppWindow key={app.id} app={{...app,label:labels[app.id]||app.label}} state={s}
          onClose={()=>closeWindow(app.id)} onMinimize={()=>minimizeWindow(app.id)} onMaximize={()=>maximizeWindow(app.id)}
          onFocus={()=>focusWindow(app.id)} onResize={(w,h)=>resizeWindow(app.id,w,h)} constraintsRef={desktopRef} zoom={zoom}
          fullHeight={app.id !== 'about'}>
          {renderContent(app.id)}
        </AppWindow>)})}</AnimatePresence>
      {/* Dock */}
      <div ref={dockRef} className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[200] flex items-end gap-1.5 px-4 py-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08]">
        {appDefs.map((app,i)=>{const isOpen=windows[app.id]?.isOpen&&!windows[app.id]?.minimized;return(
          <button key={app.id} ref={el=>{iconRefs.current[i]=el}} onClick={()=>openWindow(app.id)}
            className="group relative flex flex-col items-center origin-bottom" style={{transition:'transform 0.15s cubic-bezier(0.33,1,0.68,1)'}}>
            <span className="absolute -top-10 px-3 py-1.5 rounded-lg bg-surface border border-white/[0.06] text-text text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">{labels[app.id]||app.label}</span>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-200 ${isOpen?'bg-primary/15 text-primary':'bg-surface-light/80 text-text-muted group-hover:text-text'}`}><app.icon size={24}/></div>
            <div className={`w-1.5 h-1.5 rounded-full mt-1 transition-all ${isOpen?'bg-primary':'bg-transparent'}`}/>
          </button>
        )})}
      </div>
    </div>
  )
}

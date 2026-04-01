import { useState, useRef, useEffect } from 'react'

export function TerminalContent({
  openWindow,
  notify,
  lang,
  onShake,
}: {
  openWindow: (id: string) => void
  notify: (text: string) => void
  lang: string
  onShake?: () => void
}) {
  const [lines, setLines] = useState<string[]>([
    '\x1b[36m  KD OS Terminal v2.0\x1b[0m',
    '  Type "help" for commands.',
    '',
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const [vimMode, setVimMode] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])
  const fortunes = [
    '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
    '"Talk is cheap. Show me the code." — Linus Torvalds',
    '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
    '"Simplicity is the soul of efficiency." — Austin Freeman',
    '"First, solve the problem. Then, write the code." — John Johnson',
    '"The best error message is the one that never shows up." — Thomas Fuchs',
    '"Deleted code is debugged code." — Jeff Sickel',
    '"It works on my machine." — Every developer ever',
  ]
  const hints = [
    '💡 Try "ls" to see files, then "cat .secret" to read them',
    '💡 Type "neofetch" to see system info',
    '💡 Try "sudo hire konrad" for a surprise',
    '💡 Type "cowsay hello" for a talking cow',
    '💡 Open the Snake game with "snake"',
    '💡 Try "vim" if you dare...',
    '💡 Type "fortune" for a random quote',
    '💡 Try "weather" to check the forecast in Meeder',
    '💡 Use Tab to autocomplete commands',
    '💡 Press ↑/↓ to navigate command history',
    '💡 Try "ssh konrad@portfolio"',
    '💡 Type "ascii" for some art',
    '💡 Try "hack" for a hacking simulation',
    '💡 Type "joke" for a programming joke',
    '💡 Try "rickroll" for a classic',
  ]
  const jokes = [
    'Why do programmers prefer dark mode? Because light attracts bugs.',
    'A SQL query walks into a bar, sees two tables and asks: "Can I JOIN you?"',
    "!false — It's funny because it's true.",
    'A programmer\'s wife tells him: "Go to the store and buy a loaf of bread. If they have eggs, buy a dozen." He comes home with 12 loaves.',
    "There are only 10 types of people in the world: those who understand binary and those who don't.",
    "Why do Java developers wear glasses? Because they can't C#.",
    "How many programmers does it take to change a light bulb? None. That's a hardware problem.",
    '["hip","hip"] — (hip hip array!)',
  ]
  const add = (...s: string[]) => setLines(l => [...l, ...s])
  const exec = (cmd: string) => {
    const parts = cmd.trim().split(' ')
    const c = parts[0].toLowerCase()
    const args = parts.slice(1).join(' ')
    add(`\x1b[32m$\x1b[0m ${cmd}`)
    setHistory(h => [...h, cmd])
    if (vimMode) {
      if (cmd.trim() === ':q' || cmd.trim() === ':wq' || cmd.trim() === ':q!') {
        setVimMode(false)
        add('  You escaped vim! Achievement unlocked. 🏆', '')
      } else {
        add(`  You're still in vim. Try :q or :wq to escape.`, '')
      }
      return
    }
    switch (c) {
      case 'help':
        add(
          '',
          '  \x1b[36m🧭 Getting Started\x1b[0m — type \x1b[32mhint\x1b[0m for tips!',
          '',
          '  \x1b[36m── Explore ──\x1b[0m',
          '  about       Who I am',
          '  skills      Tech stack',
          '  contact     Get in touch',
          '  ls          List files',
          '  cat <file>  Read a file',
          '  tree        Directory tree',
          '',
          '  \x1b[36m── System ──\x1b[0m',
          '  neofetch    System info',
          '  whoami      Current user',
          '  hostname    Host name',
          '  pwd         Working directory',
          '  date        Current date',
          '  uptime      System uptime',
          '  ip          Your IP & location',
          '  screen      Screen info',
          '  battery     Battery status',
          '  speed       Speed test',
          '  wifi        Network info',
          '  benchmark   JS performance test',
          '',
          '  \x1b[36m── Apps ──\x1b[0m',
          '  open <app>  Open an app window',
          '  snake       Play Snake!',
          '',
          '  \x1b[36m── Fun & Easter Eggs ──\x1b[0m',
          '  hint        Random tip',
          '  fortune     Random quote',
          '  joke        Programming humor',
          '  cowsay <t>  ASCII cow',
          '  ascii       ASCII art',
          '  weather     Local weather',
          '  matrix      Enter the matrix',
          '  decrypt     Access the mainframe',
          '  rickroll    You know the rules...',
          '  vim         The editor trap',
          '  tableflip   Flip a table',
          '  shrug       Meh',
          '  party       Party mode',
          '  leet <text> L33t speak',
          '  motivate    Get inspired',
          '  coffee      Brew a coffee',
          '  xkcd        Random comic',
          '  42          The answer',
          '  hello       Say hi',
          '',
          '  \x1b[36m── Tools ──\x1b[0m',
          '  time [city] World clock',
          '  calc <expr> Calculator',
          '  base64      Encode/decode',
          '  uuid        Generate UUID',
          '  share       Share this site',
          '  notify <t>  Browser notification',
          '  download    Download resume',
          '  toast <t>   Desktop notification',
          '  password    Generate password',
          '  flip        Flip a coin',
          '  dice [n]    Roll dice',
          '  countdown   Start timer',
          '  geolocate   GPS location',
          '  vibrate     Buzz! (mobile)',
          '  qr <text>   QR code art',
          '  webcam      ASCII selfie',
          '  sudo <cmd>  Superuser do',
          '  ssh <host>  SSH somewhere',
          '  ping <host> Ping a host',
          '',
          '  \x1b[36m── Meta ──\x1b[0m',
          '  history / clear / exit',
          '',
        )
        break

      case 'about':
        add(
          '  \x1b[36mKonrad Dinges\x1b[0m — Full Stack Developer',
          '  📍 Meeder, Germany',
          '  💻 10+ years programming experience',
          '  🏢 Web Developer @ HUK-COBURG',
          '  📧 mail@konrad-dinges.de',
          '',
        )
        break
      case 'skills':
        add(
          '  \x1b[36mFrontend:\x1b[0m React, Angular, TypeScript, Vue.js, Next.js, Tailwind',
          '  \x1b[35mBackend:\x1b[0m  Node.js, Java, Kotlin, ASP.NET Core, Python, MongoDB, Firebase',
          '  \x1b[31mDevOps:\x1b[0m   Git, Docker, AWS, Jenkins, Figma, Vite',
          '',
        )
        break
      case 'contact':
        add(
          '  📧 mail@konrad-dinges.de',
          '  🐙 github.com/Floatyy1998',
          '  🔗 linkedin.com/in/konrad-dinges-803098296',
          '',
        )
        break
      case 'ls':
        add(
          `  \x1b[36mprojects/\x1b[0m  \x1b[36mskills/\x1b[0m  ${lang === 'de' ? 'lebenslauf' : 'cv'}.pdf  README.md  .secret  .bashrc`,
          '',
        )
        break
      case 'cat': {
        const f = args.toLowerCase()
        if (['lebenslauf.pdf', 'cv.pdf', 'resume', 'resume.txt', 'lebenslauf', 'cv'].includes(f)) {
          const de = lang === 'de'
          const w = 50
          const pad = (s: string) => {
            // eslint-disable-next-line no-control-regex
            const v = s.replace(/\x1b\[[0-9;]*m/g, '')
            return s + ' '.repeat(Math.max(0, w - v.length))
          }
          const ln = (s: string) => `  \x1b[36m|\x1b[0m ${pad(s)} \x1b[36m|\x1b[0m`
          const hr = `  \x1b[36m+${'-'.repeat(w + 2)}+\x1b[0m`
          add(
            '',
            hr,
            ln('\x1b[36mKONRAD DINGES\x1b[0m'),
            ln(de ? 'Webentwickler' : 'Web Developer'),
            hr,
            ln('mail@konrad-dinges.de'),
            ln('Meeder, Germany'),
            ln('github.com/Floatyy1998'),
            hr,
            ln(de ? '\x1b[36mBERUFSERFAHRUNG\x1b[0m' : '\x1b[36mEXPERIENCE\x1b[0m'),
            ln(''),
            ln(
              `\x1b[32m>\x1b[0m \x1b[36m${de ? 'Webentwickler' : 'Web Developer'}\x1b[0m          \x1b[35m07/2025 - ${de ? 'heute' : 'present'}\x1b[0m`,
            ),
            ln('  HUK-COBURG'),
            ln('  Angular, TypeScript, Jenkins, AWS'),
            ln(''),
            ln(
              `  \x1b[36m${de ? 'Fachinformatiker AE' : 'Software Dev Apprentice'}\x1b[0m  \x1b[35m09/2022 - 06/2025\x1b[0m`,
            ),
            ln('  HUK-COBURG'),
            ln('  Angular, TypeScript, CI/CD, AWS'),
            ln(''),
            ln(`  \x1b[36m${de ? 'Praktikum' : 'Internship'}\x1b[0m              \x1b[35m04/2020 - 07/2020\x1b[0m`),
            ln('  KAPP NILES, Web-Frontend'),
            hr,
            ln(de ? '\x1b[36mKENNTNISSE\x1b[0m' : '\x1b[36mSKILLS\x1b[0m'),
            ln(''),
            ln('\x1b[32mFrontend\x1b[0m  React, Angular, TypeScript, Vue.js'),
            ln('          Next.js, Tailwind, HTML/CSS'),
            ln('\x1b[35mBackend\x1b[0m   Node.js, Java, Kotlin, ASP.NET Core'),
            ln('          Python, MongoDB, PostgreSQL, Firebase'),
            ln('\x1b[31mDevOps\x1b[0m    Git, Docker, AWS, Jenkins, Figma'),
            hr,
            ln(de ? '\x1b[36mBILDUNG\x1b[0m' : '\x1b[36mEDUCATION\x1b[0m'),
            ln(de ? 'Fachinformatiker AE, HUK-COBURG    2022-2025' : 'Software Dev Apprentice, HUK-COBURG 2022-2025'),
            ln(de ? 'Informatik, HS Coburg              2016-2020' : 'Computer Science, HS Coburg         2016-2020'),
            ln(de ? 'Abitur, Gymnasium Ernestinum       2008-2016' : 'Abitur, Gymnasium Ernestinum        2008-2016'),
            hr,
            ln(
              de
                ? '\x1b[36mSPRACHEN\x1b[0m   Deutsch (Mutter), Englisch'
                : '\x1b[36mLANGUAGES\x1b[0m  German (native), English (fluent)',
            ),
            ln(
              de
                ? '\x1b[36mINTERESSEN\x1b[0m Tischtennis, Tennis, Coding'
                : '\x1b[36mINTERESTS\x1b[0m  Table Tennis, Tennis, Coding',
            ),
            hr,
            '',
            `  \x1b[32m-> Type "download" to save as PDF\x1b[0m`,
            '',
          )
        } else if (f === '.secret')
          add('  🎉 You found the secret!', '  Try: "konami", "snake", "vim", or "sudo hire konrad"', '')
        else if (f === 'readme.md')
          add(
            '  # KD OS Portfolio',
            '  > A portfolio disguised as an operating system.',
            '  > Built with React 19 + TypeScript + Framer Motion.',
            '  > © 2025 Konrad Dinges',
            '',
          )
        else if (f === '.bashrc')
          add(
            '  export PS1="konrad@portfolio:~$ "',
            '  alias hired="echo Congratulations!"',
            '  alias coffee="echo ☕ Brewing..."',
            '',
          )
        else add(`  cat: ${args || '???'}: No such file`, '')
        break
      }
      case 'open':
        if (['about', 'skills', 'experience', 'projects', 'contact', 'terminal', 'snake'].includes(args)) {
          openWindow(args)
          add(`  Opening ${args}...`, '')
        } else add('  Usage: open <about|skills|experience|projects|contact|terminal|snake>', '')
        break
      case 'neofetch': {
        const secs = Math.floor(performance.now() / 1000)
        const mins = Math.floor(secs / 60)
        const devMem = (navigator as any).deviceMemory
        const mem = devMem ? `${devMem >= 8 ? '≥' : ''}${devMem} GB` : 'N/A'
        const cores = navigator.hardwareConcurrency || '?'
        const scr = `${screen.width}x${screen.height}`
        const ua = navigator.userAgent
        const browser =
          ua.includes('OPR') || ua.includes('Opera')
            ? 'Opera'
            : ua.includes('Edg')
              ? 'Edge'
              : ua.includes('Firefox')
                ? 'Firefox'
                : ua.includes('Chrome')
                  ? 'Chrome'
                  : ua.includes('Safari')
                    ? 'Safari'
                    : 'Unknown'
        const browserVer = ua.match(/(OPR|Edg|Firefox|Chrome|Safari)\/(\d+)/)?.[2] || ''
        add(
          '',
          '        ╔══════════════╗    \x1b[36mkonrad\x1b[0m@\x1b[36mportfolio\x1b[0m',
          '        ║     KD       ║    ─────────────────',
          '        ║     OS       ║    OS: KD OS v2.0',
          `        ╚══════════════╝    Shell: React Terminal`,
          `                             WM: Framer Motion`,
          `                             Display: ${scr} @ ${devicePixelRatio}x`,
          `                             CPU Cores: ${cores}`,
          `                             Memory: ${mem}`,
          `                             Lang: ${navigator.language}`,
          `                             Uptime: ${mins}m ${secs % 60}s`,
          `                             Browser: ${browser}${browserVer ? ' ' + browserVer : ''}`,
          '',
        )
        break
      }
      case 'whoami': {
        const ua = navigator.userAgent
        const br = ua.includes('OPR')
          ? 'Opera'
          : ua.includes('Edg')
            ? 'Edge'
            : ua.includes('Firefox')
              ? 'Firefox'
              : ua.includes('Chrome')
                ? 'Chrome'
                : ua.includes('Safari')
                  ? 'Safari'
                  : 'Unknown'
        const os = (navigator as any).userAgentData?.platform || 'N/A'
        add(`  visitor (uid=42, gid=1337)`, `  browser: ${br}`, `  lang: ${navigator.language}`, `  os: ${os}`, '')
        break
      }
      case 'hostname':
        add('  kd-portfolio.local', '')
        break
      case 'pwd':
        add('  /home/visitor', '')
        break
      case 'date':
        add(`  ${new Date().toString()}`, '')
        break
      case 'uptime': {
        const secs = Math.floor(performance.now() / 1000)
        const mins = Math.floor(secs / 60)
        const hrs = Math.floor(mins / 60)
        add(`  up ${hrs > 0 ? hrs + 'h ' : ''}${mins % 60}m ${secs % 60}s (since page load)`, '')
        break
      }
      case 'fortune':
        add(`  ${fortunes[Math.floor(Math.random() * fortunes.length)]}`, '')
        break
      case 'echo':
        add(`  ${args}`, '')
        break
      case 'cowsay': {
        const msg = args || 'moo'
        add(
          `   ${'_'.repeat(msg.length + 2)}`,
          `  < ${msg} >`,
          `   ${'‾'.repeat(msg.length + 2)}`,
          '          \\   ^__^',
          '           \\  (oo)\\_______',
          '              (__)\\       )\\/\\',
          '                  ||----w |',
          '                  ||     ||',
          '',
        )
        break
      }
      case 'weather': {
        add('  \x1b[36mFetching weather data...\x1b[0m')
        fetch('https://wttr.in/?format=j1')
          .then(r => r.json())
          .then(data => {
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
              '',
            )
          })
          .catch(() => {
            add(
              '  \x1b[31mCould not fetch weather data.\x1b[0m',
              '  Showing fallback for Meeder, Germany.',
              '',
              `  🌡️  Temperature: ${Math.floor(Math.random() * 15 + 10)}°C`,
              '  ☕ Condition: Perfect coding weather',
              '',
            )
          })
        break
      }
      case 'sudo':
        if (args.toLowerCase().includes('hire konrad'))
          add(
            '  ✅ Permission granted.',
            '  📧 Sending offer letter to mail@konrad-dinges.de...',
            '  💰 Salary: Yes.',
            '  🎉 Welcome to the team!',
            '',
          )
        else if (args.toLowerCase().includes('rm -rf')) {
          add('  🛡️ Nice try. System protected by excellent code.', '  (Your destructive intent has been noted.)', '')
          onShake?.()
        }
        else if (args.toLowerCase().includes('apt') || args.toLowerCase().includes('install'))
          add(
            `  📦 Installing ${args.split(' ').pop()}...`,
            '  ████████████████████ 100%',
            '  ✅ Done. (Not really, this is a portfolio.)',
            '',
          )
        else
          add(`  sudo: executing "${args}" with elevated privileges...`, '  Just kidding. This is a portfolio. 😄', '')
        break
      case 'matrix': {
        const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01'
        for (let r = 0; r < 8; r++) {
          let row = '  '
          for (let co = 0; co < 50; co++) row += chars[Math.floor(Math.random() * chars.length)]
          add(row)
        }
        add('', '  \x1b[36mWake up, Neo...\x1b[0m', '  \x1b[36mThe Matrix has you...\x1b[0m', '')
        break
      }
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
              add(`  64 bytes from ${h}: time=${times[times.length - 1].toFixed(1)}ms`)
            } catch {
              times.push(-1)
              add(`  Request timeout for ${h}`)
            }
          }
          const valid = times.filter(t => t >= 0)
          if (valid.length > 0) {
            const avg = valid.reduce((a, b) => a + b, 0) / valid.length
            const min = Math.min(...valid)
            const max = Math.max(...valid)
            add(
              `  --- ${h} ping statistics ---`,
              `  ${times.length} packets, ${valid.length} received, ${times.length - valid.length} lost`,
              `  min/avg/max = ${min.toFixed(1)}/${avg.toFixed(1)}/${max.toFixed(1)} ms`,
              '',
            )
          } else {
            add(`  --- ${h} unreachable ---`, '')
          }
        }
        doPing()
        break
      }
      case 'ssh':
        add(
          `  Connecting to ${args || 'konrad@portfolio'}...`,
          '  🔑 Authenticating with public key...',
          '  ✅ Welcome home.',
          '  Last login: just now from your browser',
          '',
        )
        break
      case 'vim':
      case 'vi':
      case 'nano':
        setVimMode(true)
        add(`  You opened ${c}. You're now trapped.`, '  Type :q, :wq, or :q! to escape.', '  Good luck. 😈', '')
        break
      case 'snake':
        openWindow('snake')
        add('  🐍 Opening Snake...', '')
        break
      case 'konami':
        add('  ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️', '  🎮 +30 lives! Achievement unlocked!', '  🏆 "The Konami Kid"', '')
        break
      case 'history':
        history.forEach((h, i) => add(`  ${i + 1}  ${h}`))
        add('')
        break
      case 'clear':
        setLines([])
        return
      case 'exit':
        add(
          '  This is a portfolio, not a real terminal. But nice try! 😏',
          '  (Use the red button to close this window)',
          '',
        )
        break
      case 'rm':
        add('  rm: permission denied (try sudo rm, I dare you)', '')
        break
      case 'cd':
        add(`  cd: ${args || '~'}: You're already home.`, '')
        break
      case 'git':
        add('  On branch: master', '  Your portfolio is always up to date. 😉', '')
        break
      case 'npm':
      case 'yarn':
      case 'pnpm':
        add(
          `  ${c} install awesome-developer`,
          '  ✅ Found: Konrad Dinges',
          '  📦 Installing...',
          '  ████████████████████ 100%',
          '',
        )
        break
      case 'curl': {
        const url = args || 'https://api.github.com/users/Floatyy1998'
        add(`  \x1b[36mGET ${url}\x1b[0m`)
        const start = performance.now()
        fetch(url)
          .then(async r => {
            const ms = (performance.now() - start).toFixed(0)
            const status = `${r.status} ${r.statusText}`
            const ct = r.headers.get('content-type') || ''
            // eslint-disable-next-line no-useless-assignment
            let body = ''
            try {
              if (ct.includes('json')) {
                const json = await r.json()
                body = JSON.stringify(json, null, 2)
                  .split('\n')
                  .slice(0, 15)
                  .map(l => `  ${l}`)
                  .join('\n')
                if (JSON.stringify(json, null, 2).split('\n').length > 15) body += '\n  ...'
              } else {
                const text = await r.text()
                body = text
                  .slice(0, 500)
                  .split('\n')
                  .slice(0, 10)
                  .map(l => `  ${l}`)
                  .join('\n')
              }
            } catch {
              body = '  [binary data]'
            }
            add(`  \x1b[32mHTTP ${status}\x1b[0m (${ms}ms)`, `  Content-Type: ${ct}`, '', ...body.split('\n'), '')
          })
          .catch(() => {
            const ms = (performance.now() - start).toFixed(0)
            fetch(url, { mode: 'no-cors', cache: 'no-store' })
              .then(() => {
                add(
                  `  \x1b[36mHTTP 200\x1b[0m (${ms}ms) — CORS blocked response body`,
                  `  Server responded but browser blocks reading the content.`,
                  `  Tip: Try APIs that allow CORS, e.g.:`,
                  `    curl https://api.github.com/users/Floatyy1998`,
                  `    curl https://wttr.in/?format=j1`,
                  '',
                )
              })
              .catch(() => {
                add(`  \x1b[31mError: Could not reach ${url}\x1b[0m`, '')
              })
          })
        break
      }
      case 'hint':
        add(`  ${hints[Math.floor(Math.random() * hints.length)]}`, '')
        break
      case 'joke':
        add(`  ${jokes[Math.floor(Math.random() * jokes.length)]}`, '')
        break
      case 'ascii':
        add(
          '',
          '  \x1b[36m  ██╗  ██╗██████╗ \x1b[0m',
          '  \x1b[36m  ██║ ██╔╝██╔══██╗\x1b[0m',
          '  \x1b[36m  █████╔╝ ██║  ██║\x1b[0m',
          '  \x1b[36m  ██╔═██╗ ██║  ██║\x1b[0m',
          '  \x1b[36m  ██║  ██╗██████╔╝\x1b[0m',
          '  \x1b[36m  ╚═╝  ╚═╝╚═════╝ \x1b[0m',
          '',
          '  Konrad Dinges — Full Stack Developer',
          '',
        )
        break
      case 'tree':
        add(
          '  \x1b[36m.\x1b[0m',
          '  ├── \x1b[36mprojects/\x1b[0m',
          '  │   ├── serien-ranking/',
          '  │   ├── watchradar/',
          '  │   ├── portfolio/',
          '  │   ├── classpulse/',
          '  │   └── dogr/',
          '  ├── \x1b[36mskills/\x1b[0m',
          '  │   ├── frontend.json',
          '  │   ├── backend.json',
          '  │   └── devops.json',
          '  ├── resume.txt',
          '  ├── README.md',
          '  ├── .secret',
          '  └── .bashrc',
          '',
          '  5 directories, 11 files',
          '',
        )
        break
      case 'man':
        add(
          `  KD-OS(1)                  User Commands                  KD-OS(1)`,
          '',
          `  NAME`,
          `    kd-os — Konrad Dinges Portfolio Operating System`,
          '',
          `  SYNOPSIS`,
          `    Just type commands and explore!`,
          '',
          `  DESCRIPTION`,
          `    An interactive portfolio disguised as a terminal OS.`,
          `    Built with React 19, TypeScript, and Framer Motion.`,
          '',
          `  AUTHOR`,
          `    Konrad Dinges <mail@konrad-dinges.de>`,
          '',
          `  SEE ALSO`,
          `    help(1), hint(1), about(1)`,
          '',
        )
        break
      case 'theme': {
        const themes: Record<string, string> = {
          green: 'text-green-400',
          amber: 'text-amber-400',
          blue: 'text-blue-400',
          white: 'text-gray-200',
          pink: 'text-pink-400',
        }
        if (args && themes[args.toLowerCase()]) {
          add(`  Theme changed to ${args}. (Visual only in this session)`, '')
        } else add('  Usage: theme <green|amber|blue|white|pink>', '')
        break
      }
      case 'whoismyip':
      case 'ip': {
        add('  \x1b[36mLooking up your IP...\x1b[0m')
        fetch('https://ipapi.co/json/')
          .then(r => r.json())
          .then(data => {
            add(
              `  \x1b[32mIP:\x1b[0m ${data.ip}`,
              `  \x1b[32mLocation:\x1b[0m ${data.city}, ${data.region}, ${data.country_name}`,
              `  \x1b[32mISP:\x1b[0m ${data.org}`,
              `  \x1b[32mTimezone:\x1b[0m ${data.timezone}`,
              '',
            )
          })
          .catch(() => add('  Could not fetch IP info.', ''))
        break
      }
      case 'speed': {
        add('  \x1b[36mTesting connection speed...\x1b[0m', '  Running parallel downloads...')
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
        Promise.all(urls.map(u => fetch(u, { cache: 'no-store' }).then(r => r.blob())))
          .then(blobs => {
            const ms = performance.now() - start
            const totalBytes = blobs.reduce((s, b) => s + b.size, 0)
            const totalMB = totalBytes / (1024 * 1024)
            const speedMbps = (totalMB * 8) / (ms / 1000)
            const barLen = Math.min(20, Math.round(speedMbps / 25))
            const bar = '\x1b[32m' + '█'.repeat(barLen) + '░'.repeat(20 - barLen) + '\x1b[0m'
            add(
              `  ${bar}`,
              `  \x1b[32mDownload:\x1b[0m ${speedMbps.toFixed(1)} Mbps`,
              `  \x1b[32mTotal:\x1b[0m ${totalMB.toFixed(1)} MB in ${(ms / 1000).toFixed(2)}s`,
              `  \x1b[32mConnections:\x1b[0m ${urls.length} parallel`,
              '',
            )
          })
          .catch(() => add('  \x1b[31mSpeed test failed.\x1b[0m', ''))
        break
      }
      case 'battery': {
        if ('getBattery' in navigator) {
          ;(navigator as any).getBattery().then((b: any) => {
            const pct = Math.round(b.level * 100)
            const bar = '█'.repeat(Math.round(pct / 5)) + '░'.repeat(20 - Math.round(pct / 5))
            add(
              `  \x1b[${pct > 20 ? '32' : '31'}m${bar}\x1b[0m ${pct}%`,
              `  ${b.charging ? '⚡ Charging' : '🔋 On battery'}`,
              '',
            )
          })
        } else {
          add('  Battery API not available in this browser.', '')
        }
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
          '',
        )
        break
      }
      case 'decrypt':
        add(
          '  [32m[*] Initializing...[0m',
          '  [*] Scanning ports... 22, 80, 443',
          '  [*] Found: kd-portfolio.local',
          '  [*] Connecting...',
          '  [36m████████████████████ 100%[0m',
          '  [32m[+] ACCESS GRANTED[0m',
          '',
          '  Welcome to the mainframe. Just kidding!',
          '',
        )
        break
      case 'rickroll':
        add(
          '  [35m  Never gonna give you up[0m',
          '  [35m  Never gonna let you down[0m',
          '  [35m  Never gonna run around and desert you[0m',
          '  [35m  Never gonna make you cry[0m',
          '  [35m  Never gonna say goodbye[0m',
          '',
          '  You just got rickrolled in a terminal!',
          '',
        )
        break
      case 'time': {
        const zones: Record<string, string> = {
          berlin: 'Europe/Berlin',
          london: 'Europe/London',
          newyork: 'America/New_York',
          ny: 'America/New_York',
          tokyo: 'Asia/Tokyo',
          sydney: 'Australia/Sydney',
          dubai: 'Asia/Dubai',
          mumbai: 'Asia/Kolkata',
          shanghai: 'Asia/Shanghai',
          la: 'America/Los_Angeles',
          losangeles: 'America/Los_Angeles',
          paris: 'Europe/Paris',
          moscow: 'Europe/Moscow',
          meeder: 'Europe/Berlin',
        }
        if (!args) {
          const cities = ['Berlin', 'London', 'New York', 'Tokyo', 'Sydney', 'Dubai', 'Shanghai', 'Los Angeles']
          cities.forEach(city => {
            const tz = zones[city.toLowerCase().replace(' ', '')] || 'UTC'
            const t2 = new Date().toLocaleTimeString('de-DE', {
              timeZone: tz,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
            const d = new Date().toLocaleDateString('de-DE', {
              timeZone: tz,
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            })
            add(`  \x1b[36m${city.padEnd(14)}\x1b[0m ${t2}  ${d}`)
          })
          add('')
        } else {
          const tz = zones[args.toLowerCase().replace(' ', '')] || args
          try {
            const t2 = new Date().toLocaleTimeString('de-DE', {
              timeZone: tz,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
            const d = new Date().toLocaleDateString('en-US', {
              timeZone: tz,
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            add(`  \x1b[36m${tz}\x1b[0m`, `  ${t2} — ${d}`, '')
          } catch {
            add(`  Unknown timezone: ${args}`, '  Try: berlin, london, newyork, tokyo, sydney, dubai, la', '')
          }
        }
        break
      }
      case 'calc': {
        if (!args) {
          add('  Usage: calc <expression>', '  Example: calc 2**10 + Math.sqrt(144)', '')
          break
        }
        try {
          if (
            /[a-zA-Z]/.test(args) &&
            !args.match(/Math\.|PI|sqrt|pow|abs|floor|ceil|round|sin|cos|tan|log|random|min|max/)
          ) {
            add('  Only math expressions allowed.', '')
            break
          }
          const result = new Function(`"use strict"; return (${args.replace(/Math\./g, 'Math.')})`)()
          add(`  \x1b[32m= ${result}\x1b[0m`, '')
        } catch {
          add(`  \x1b[31mInvalid expression\x1b[0m`, '')
        }
        break
      }
      case 'share': {
        if (navigator.share) {
          navigator
            .share({
              title: 'Konrad Dinges — Portfolio',
              text: 'Check out this portfolio OS!',
              url: window.location.href,
            })
            .then(() => add('  \x1b[32mShared successfully!\x1b[0m', ''))
            .catch(() => add('  Share cancelled.', ''))
        } else {
          navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
              add('  Share API not available. URL copied to clipboard!', '')
            })
            .catch(() => add('  Could not share or copy.', ''))
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
            if (p === 'granted') {
              new Notification('KD OS', { body: msg })
              add('  \x1b[32mNotification sent!\x1b[0m', '')
            } else add('  Notification permission denied.', '')
          })
          add('  Requesting permission...', '')
        }
        break
      }
      case 'download':
      case 'resume':
      case 'cv':
      case 'lebenslauf': {
        window.open('/resume', '_blank')
        add(
          `  \x1b[32m${lang === 'de' ? 'Lebenslauf wird geöffnet...' : 'Opening resume...'}\x1b[0m`,
          `  ${lang === 'de' ? 'Drücke Strg+P um als PDF zu speichern.' : 'Press Ctrl+P to save as PDF.'}`,
          '',
        )
        break
      }
      case 'wifi':
      case 'network': {
        const conn = (navigator as any).connection
        if (conn) {
          add(
            `  \x1b[32mType:\x1b[0m ${conn.effectiveType || 'unknown'}`,
            `  \x1b[32mDownlink:\x1b[0m ${conn.downlink || '?'} Mbps`,
            `  \x1b[32mRTT:\x1b[0m ${conn.rtt || '?'} ms`,
            `  \x1b[32mSave-Data:\x1b[0m ${conn.saveData ? 'yes' : 'no'}`,
            '',
          )
        } else {
          add('  Network Information API not available in this browser.', '')
        }
        break
      }
      case 'benchmark': {
        add('  \x1b[36mRunning benchmark...\x1b[0m')
        setTimeout(() => {
          const tests: { name: string; ops: number }[] = []
          let start = performance.now()
          let count = 0
          while (performance.now() - start < 100) {
            Math.sqrt(Math.random() * 1000000)
            count++
          }
          tests.push({ name: 'Math ops', ops: count })
          start = performance.now()
          count = 0
          while (performance.now() - start < 100) {
            JSON.parse(JSON.stringify({ a: 1, b: [2, 3], c: 'test' }))
            count++
          }
          tests.push({ name: 'JSON parse', ops: count })
          start = performance.now()
          count = 0
          while (performance.now() - start < 100) {
            'hello world '.repeat(100).split(' ').join('-')
            count++
          }
          tests.push({ name: 'String ops', ops: count })
          start = performance.now()
          count = 0
          const arr: number[] = []
          while (performance.now() - start < 100) {
            arr.push(Math.random())
            if (arr.length > 10000) arr.length = 0
            count++
          }
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
      case 'uuid': {
        add(`  ${crypto.randomUUID()}`, '')
        break
      }
      case 'base64': {
        if (!args) {
          add('  Usage: base64 <encode|decode> <text>', '  Example: base64 encode Hello World', '')
          break
        }
        const [mode, ...rest] = args.split(' ')
        const text = rest.join(' ')
        if (mode === 'encode') add(`  ${btoa(text)}`, '')
        else if (mode === 'decode') {
          try {
            add(`  ${atob(text)}`, '')
          } catch {
            add('  \x1b[31mInvalid base64 string\x1b[0m', '')
          }
        } else add('  Usage: base64 <encode|decode> <text>', '')
        break
      }
      case 'toast': {
        notify(args || 'Hello from Terminal!')
        add('  \x1b[32mToast sent!\x1b[0m', '')
        break
      }
      case 'leet': {
        const lt = (args || 'Konrad Dinges')
          .split('')
          .map(
            ch =>
              (
                ({
                  a: '4',
                  e: '3',
                  i: '1',
                  o: '0',
                  s: '5',
                  t: '7',
                  A: '4',
                  E: '3',
                  I: '1',
                  O: '0',
                  S: '5',
                  T: '7',
                }) as Record<string, string>
              )[ch] || ch,
          )
          .join('')
        add(`  ${lt}`, '')
        break
      }
      case 'motivate':
      case 'inspire': {
        const ms2 = [
          'You are doing great! Keep coding!',
          'Every expert was once a beginner.',
          'Ship it!',
          'Code never lies. Comments sometimes do.',
          'Stay hungry, stay foolish.',
          'It compiles! Ship it!',
          'You miss 100% of the deploys you dont push.',
        ]
        add(`  \x1b[36m${ms2[Math.floor(Math.random() * ms2.length)]}\x1b[0m`, '')
        break
      }
      case 'party': {
        let ct2 = 0
        const iv2 = setInterval(() => {
          add('  ' + Array.from({ length: 25 }, () => '*~+#@&%!$'[Math.floor(Math.random() * 9)]).join(' '))
          ct2++
          if (ct2 >= 5) {
            clearInterval(iv2)
            add('', '  Party over. Back to work!', '')
          }
        }, 300)
        break
      }
      case 'tableflip':
        add('  (\u256F\u00B0\u25A1\u00B0)\u256F\uFE35 \u253B\u2501\u253B', '')
        break
      case 'unflip':
        add('  \u252C\u2500\u252C\u30CE( \u00BA _ \u00BA\u30CE)', '')
        break
      case 'shrug':
        add('  \u00AF\\_(\u30C4)_/\u00AF', '')
        break
      case 'yes': {
        for (let y2 = 0; y2 < 8; y2++) add('  yes')
        add('  ...', '  (You get the idea.)', '')
        break
      }
      case 'no': {
        for (let n2 = 0; n2 < 8; n2++) add('  no')
        add('  ...', '  (Okay okay!)', '')
        break
      }
      case 'hello':
      case 'hi':
      case 'hey':
        add(
          '  \x1b[36mHey! Nice to meet you!\x1b[0m',
          '',
          '  Quick start:',
          '  \x1b[32m  about\x1b[0m      Learn about me',
          '  \x1b[32m  weather\x1b[0m    Check the weather',
          '  \x1b[32m  webcam\x1b[0m     Take an ASCII selfie',
          '  \x1b[32m  snake\x1b[0m      Play a game',
          '  \x1b[32m  cowsay hi\x1b[0m  Make a cow talk',
          '  \x1b[32m  help\x1b[0m       See all 50+ commands',
          '',
        )
        break
      case 'coffee':
        add('', '  \u2615 Brewing...', '  ...', '  \u2615 Here is your coffee. Now get back to coding!', '')
        break
      case '42':
        add('  The answer to life, the universe, and everything.', '')
        break
      case 'xkcd':
        add(`  Random XKCD: https://xkcd.com/${Math.floor(Math.random() * 2900) + 1}/`, '  (Worth a click!)', '')
        break
      case 'password':
      case 'passwd': {
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
      case 'dice':
      case 'roll': {
        const count = Math.min(parseInt(args) || 1, 10)
        const rolls = Array.from(crypto.getRandomValues(new Uint8Array(count)), v => (v % 6) + 1)
        const faces = ['', '\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685']
        add(
          `  ${rolls.map(r => faces[r]).join('  ')}`,
          `  ${rolls.map(r => `[${r}]`).join(' ')}${count > 1 ? `  Sum: ${rolls.reduce((a, b) => a + b, 0)}` : ''}`,
          '',
        )
        break
      }
      case 'countdown': {
        const secs = parseInt(args) || 10
        if (secs > 300) {
          add('  Max 300 seconds.', '')
          break
        }
        add(`  \x1b[36mCountdown: ${secs}s\x1b[0m`)
        let remaining = secs
        const iv = setInterval(() => {
          remaining--
          const bar =
            '\x1b[32m' +
            '█'.repeat(Math.round((1 - remaining / secs) * 20)) +
            '\x1b[0m' +
            '░'.repeat(Math.round((remaining / secs) * 20))
          add(`  ${bar} ${remaining}s`)
          if (remaining <= 0) {
            clearInterval(iv)
            add('  \x1b[36m🔔 Time is up!\x1b[0m', '')
            if ('vibrate' in navigator) (navigator as any).vibrate(200)
          }
        }, 1000)
        break
      }
      case 'geolocate':
      case 'gps':
      case 'location': {
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
              '',
            )
          },
          err => add(`  \x1b[31mError: ${err.message}\x1b[0m`, ''),
          { enableHighAccuracy: true },
        )
        break
      }
      case 'vibrate': {
        if ('vibrate' in navigator) {
          const pattern =
            args === 'sos' ? [100, 50, 100, 50, 100, 150, 300, 50, 300, 50, 300, 150, 100, 50, 100, 50, 100] : [200]
          ;(navigator as any).vibrate(pattern)
          add(`  \x1b[32m📳 ${args === 'sos' ? 'SOS pattern!' : 'Buzz!'}\x1b[0m`, '  (Mobile only)', '')
        } else {
          add(
            '  Vibration API not available.',
            '  Requires Android + Chrome over HTTPS.',
            '  (iOS/Safari does not support vibration)',
            '',
          )
        }
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
            const isCornerInner =
              (x >= 2 && x <= 4 && y >= 2 && y <= 4) ||
              (x >= size - 5 && x <= size - 3 && y >= 2 && y <= 4) ||
              (x >= 2 && x <= 4 && y >= size - 5 && y <= size - 3)
            const isCornerBorder =
              isCorner &&
              (x === 0 ||
                x === 6 ||
                x === size - 7 ||
                x === size - 1 ||
                y === 0 ||
                y === 6 ||
                y === size - 7 ||
                y === size - 1)
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
      case 'webcam':
      case 'selfie': {
        add('  \x1b[36mRequesting camera...\x1b[0m')
        navigator.mediaDevices
          .getUserMedia({ video: { width: 64, height: 48 } })
          .then(stream => {
            const video = document.createElement('video')
            video.srcObject = stream
            video.play().then(() => {
              setTimeout(() => {
                const canvas = document.createElement('canvas')
                const w = 64,
                  h = 48
                canvas.width = w
                canvas.height = h
                const ctx = canvas.getContext('2d')!
                ctx.drawImage(video, 0, 0, w, h)
                const imageData = ctx.getImageData(0, 0, w, h)
                const chars = ' .:-=+*#%@'
                const asciiLines: string[] = []
                for (let y = 0; y < h; y += 2) {
                  let line = '  '
                  for (let x = 0; x < w; x++) {
                    const i = (y * w + x) * 4
                    const brightness =
                      (imageData.data[i] * 0.299 + imageData.data[i + 1] * 0.587 + imageData.data[i + 2] * 0.114) / 255
                    line += chars[Math.floor(brightness * (chars.length - 1))]
                  }
                  asciiLines.push(line)
                }
                add('', ...asciiLines, '', '  \x1b[32m📸 Captured!\x1b[0m', '')
                stream.getTracks().forEach(t => t.stop())
              }, 500)
            })
          })
          .catch(err => add(`  \x1b[31mCamera error: ${err.message}\x1b[0m`, ''))
        break
      }

      case 'make':
        if (args.toLowerCase().includes('sandwich'))
          add('  What? Make it yourself.', '  ...', '  Okay fine. 🥪 Here is your sandwich.', '')
        else add(`  make: *** No rule to make target '${args}'. Stop.`, '')
        break
      default:
        add(`  command not found: ${c}. Type "help" for commands.`, '')
        break
    }
  }
  const renderLine = (line: string) =>
    line
      /* eslint-disable no-control-regex */
      .replace(/\x1b\[36m/g, '§c§')
      .replace(/\x1b\[35m/g, '§p§')
      .replace(/\x1b\[31m/g, '§r§')
      .replace(/\x1b\[32m/g, '§g§')
      .replace(/\x1b\[0m/g, '§0§')
      /* eslint-enable no-control-regex */
      .split(/(§[cprg0]§)/)
      .reduce<{ els: React.ReactNode[]; color: string }>(
        (acc, part, i) => {
          if (part === '§c§') acc.color = 'text-cyan-400'
          else if (part === '§p§') acc.color = 'text-purple-400'
          else if (part === '§r§') acc.color = 'text-red-400'
          else if (part === '§g§') acc.color = 'text-green-400'
          else if (part === '§0§') acc.color = ''
          else
            acc.els.push(
              <span key={i} className={acc.color}>
                {part}
              </span>,
            )
          return acc
        },
        { els: [], color: '' },
      ).els
  return (
    <div className="h-full bg-[#0a0a14] font-mono text-sm p-5 flex flex-col" onClick={() => inputRef.current?.focus()}>
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-0.5">
          {lines.map((l, i) => (
            <div key={i} className="text-green-400/80 whitespace-pre leading-relaxed">
              {renderLine(l)}
            </div>
          ))}
        </div>
        <div ref={endRef} />
      </div>
      <div className="flex items-center gap-2 mt-3 shrink-0">
        <span className="text-green-400/80 shrink-0">{vimMode ? ':' : '$'}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && input.trim()) {
              exec(input)
              setInput('')
              setHistIdx(-1)
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              const idx = histIdx < history.length - 1 ? histIdx + 1 : histIdx
              setHistIdx(idx)
              setInput(history[history.length - 1 - idx] || '')
            } else if (e.key === 'ArrowDown') {
              e.preventDefault()
              const idx = histIdx > 0 ? histIdx - 1 : -1
              setHistIdx(idx)
              setInput(idx >= 0 ? history[history.length - 1 - idx] || '' : '')
            } else if (e.key === 'Tab') {
              e.preventDefault()
              const ps = input.split(' ')
              if (ps.length <= 1) {
                const cmds = [
                  'help',
                  'hint',
                  'about',
                  'skills',
                  'contact',
                  'ls',
                  'cat',
                  'open',
                  'neofetch',
                  'whoami',
                  'hostname',
                  'pwd',
                  'date',
                  'uptime',
                  'fortune',
                  'joke',
                  'cowsay',
                  'echo',
                  'weather',
                  'sudo',
                  'matrix',
                  'ping',
                  'snake',
                  'konami',
                  'history',
                  'clear',
                  'exit',
                  'ssh',
                  'vim',
                  'curl',
                  'git',
                  'npm',
                  'ascii',
                  'tree',
                  'man',
                  'theme',
                  'make',
                  'whoismyip',
                  'ip',
                  'decrypt',
                  'rickroll',
                  'speed',
                  'battery',
                  'screen',
                  'time',
                  'calc',
                  'share',
                  'notify',
                  'download',
                  'wifi',
                  'network',
                  'benchmark',
                  'uuid',
                  'base64',
                  'toast',
                  'password',
                  'passwd',
                  'flip',
                  'dice',
                  'roll',
                  'countdown',
                  'geolocate',
                  'gps',
                  'location',
                  'vibrate',
                  'qr',
                  'webcam',
                  'selfie',
                ]
                const m = cmds.find(x => x.startsWith(ps[0]))
                if (m) setInput(m)
              } else {
                const cmd = ps[0].toLowerCase(),
                  arg = ps.slice(1).join(' ').toLowerCase()
                let opts: string[] = []
                if (cmd === 'cat')
                  opts = [lang === 'de' ? 'lebenslauf.pdf' : 'cv.pdf', 'README.md', '.secret', '.bashrc']
                else if (cmd === 'open')
                  opts = ['about', 'skills', 'experience', 'projects', 'contact', 'terminal', 'snake']
                else if (cmd === 'sudo') opts = ['hire konrad', 'rm -rf /']
                const m = opts.find(o => o.toLowerCase().startsWith(arg))
                if (m) setInput(`${ps[0]} ${m}`)
              }
            }
          }}
          className="flex-1 bg-transparent outline-none text-green-400 caret-green-400 text-sm"
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  )
}

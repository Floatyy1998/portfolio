import { useRef, useState } from 'react'
import {
  LuBriefcase as Briefcase,
  LuMail as MailIcon,
  LuSend as Send,
  LuMapPin as MapPin,
  LuCalendar as Calendar,
  LuCircleCheck as CheckCircle,
  LuCircleAlert as AlertCircle,
  LuDownload as Download,
} from 'react-icons/lu'
import { FaGithub as GithubIcon, FaLinkedinIn as LinkedinIcon } from 'react-icons/fa6'
import emailjs from '@emailjs/browser'
import { useLanguage } from '../../context/LanguageContext'
import { skillsData, projectMeta, projectImages, logos, companyUrls, profileImage } from '../../data/portfolio'
import { ProjectStory } from './ProjectStory'
import { TerminalContent } from './TerminalContent'
import { SnakeGame } from './SnakeGame'

export function WindowContents({
  id,
  openWindow,
  notify,
}: {
  id: string
  openWindow: (id: string) => void
  notify: (text: string) => void
}) {
  const { t, lang } = useLanguage()

  switch (id) {
    case 'about':
      return <AboutContent />
    case 'skills':
      return <SkillsContent />
    case 'experience':
      return <ExperienceContent />
    case 'projects':
      return (
        <ProjectStory
          items={t.projects.items}
          meta={projectMeta}
          images={projectImages}
          labels={{ live: t.projects.liveDemo, code: t.projects.viewCode }}
        />
      )
    case 'contact':
      return <ContactContent notify={notify} />
    case 'terminal':
      return <TerminalContent openWindow={openWindow} notify={notify} lang={lang} />
    case 'snake':
      return <SnakeGame />
    default:
      return null
  }
}

function AboutContent() {
  const { t, lang } = useLanguage()
  return (
    <div className="h-full overflow-y-auto bg-[#0a0a18]">
      <div className="text-center pt-8 pb-5 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] to-transparent" />
        <div className="relative">
          <div className="relative inline-block mb-3">
            <img
              src={profileImage}
              className="w-24 h-24 rounded-full object-cover border-[3px] border-primary/30 shadow-[0_0_30px_rgba(0,229,255,0.15)]"
            />
            <div className="absolute bottom-0.5 right-0.5 w-5 h-5 rounded-full bg-green-500 border-[3px] border-[#0a0a18]" />
          </div>
          <h2 className="font-display font-bold text-xl text-text">Konrad Dinges</h2>
          <p className="text-primary font-mono text-sm mt-1">Full Stack Developer</p>
          <p className="text-text-muted text-xs mt-1 flex items-center justify-center gap-1">
            <MapPin size={11} />
            {t.contact.meederGermany}
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-3 px-6 pb-4">
        <a
          href="mailto:mail@konrad-dinges.de"
          className="flex flex-col items-center gap-1.5 w-20 py-2.5 rounded-xl bg-surface hover:bg-surface-light transition-colors"
        >
          <MailIcon size={18} className="text-primary" />
          <span className="text-[10px] text-text-muted">Email</span>
        </a>
        <a
          href="https://github.com/Floatyy1998"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 w-20 py-2.5 rounded-xl bg-surface hover:bg-surface-light transition-colors"
        >
          <GithubIcon size={18} className="text-text-muted" />
          <span className="text-[10px] text-text-muted">GitHub</span>
        </a>
        <a
          href="https://linkedin.com/in/konrad-dinges-803098296"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 w-20 py-2.5 rounded-xl bg-surface hover:bg-surface-light transition-colors"
        >
          <LinkedinIcon size={18} className="text-text-muted" />
          <span className="text-[10px] text-text-muted">LinkedIn</span>
        </a>
        <a
          href="/resume"
          target="_blank"
          className="flex flex-col items-center gap-1.5 w-20 py-2.5 rounded-xl bg-surface hover:bg-surface-light transition-colors"
        >
          <Download size={18} className="text-accent" />
          <span className="text-[10px] text-text-muted">CV</span>
        </a>
      </div>
      <div className="grid grid-cols-3 mx-6 mb-4 rounded-2xl bg-surface overflow-hidden">
        {[
          { v: '3+', l: t.about.yearsExp, color: '#00e5ff' },
          { v: '15+', l: t.about.projectsCompleted, color: '#bf5af2' },
          { v: '10+', l: t.about.techMastered, color: '#ff3366' },
        ].map((s, i) => (
          <div key={i} className="py-3.5 text-center border-r border-white/[0.04] last:border-r-0">
            <div className="font-display font-bold text-xl" style={{ color: s.color }}>
              {s.v}
            </div>
            <p className="text-text-muted text-[10px] uppercase tracking-wider mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="px-6 pb-6">
        <div className="rounded-2xl bg-surface divide-y divide-white/[0.04] overflow-hidden">
          <div className="px-4 py-3">
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
              {lang === 'de' ? 'Beruf' : 'Role'}
            </p>
            <p className="text-sm text-text">{lang === 'de' ? 'Webentwickler' : 'Web Developer'} @ HUK-COBURG</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Email</p>
            <p className="text-sm text-primary">mail@konrad-dinges.de</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{t.contact.location}</p>
            <p className="text-sm text-text">Meeder, Germany</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
              {lang === 'de' ? 'Info' : 'About'}
            </p>
            <p className="text-sm text-text-muted leading-relaxed">{t.about.description}</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
              {lang === 'de' ? 'Mehr' : 'More'}
            </p>
            <p className="text-sm text-text-muted leading-relaxed">{t.about.longDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Ring = ({
  pct,
  color,
  size = 48,
  width = 3.5,
}: {
  pct: number
  color: string
  size?: number
  width?: number
}) => {
  const r = (size - width * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={width} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ filter: `drop-shadow(0 0 4px ${color}60)`, transition: 'stroke-dashoffset 1.5s ease-out' }}
      />
    </svg>
  )
}

function SkillsContent() {
  const { lang } = useLanguage()
  const proficiency: Record<string, number> = {
    React: 97,
    Angular: 90,
    TypeScript: 95,
    JavaScript: 92,
    'Vue.js': 70,
    'Next.js': 75,
    Tailwind: 93,
    'HTML/CSS': 97,
    'Node.js': 85,
    Java: 80,
    Kotlin: 75,
    'ASP.NET Core': 70,
    Python: 65,
    MongoDB: 80,
    PostgreSQL: 70,
    Firebase: 85,
    Git: 95,
    Docker: 75,
    AWS: 70,
    Jenkins: 80,
    Figma: 65,
    Vite: 90,
  }
  const allSkills = skillsData.flatMap(c => c.items.map(s => ({ ...s, cat: c.cat, catColor: c.color })))
  const avgPct = Math.round(allSkills.reduce((sum, s) => sum + (proficiency[s.n] || 50), 0) / allSkills.length)
  return (
    <div className="h-full flex flex-col bg-[#0a0a18]">
      <div className="shrink-0 px-6 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Ring pct={avgPct} color="#00e5ff" size={56} width={4} />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-primary">
                {avgPct}
              </span>
            </div>
            <div>
              <p className="text-lg font-display font-bold text-text">
                {lang === 'de' ? 'Skill-Level' : 'Skill Level'}
              </p>
              <p className="text-xs text-text-muted">
                {allSkills.length} {lang === 'de' ? 'Technologien' : 'technologies'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {skillsData.map(cat => (
            <div key={cat.cat} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface text-xs">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-text-muted">{cat.cat}</span>
              <span className="text-text font-semibold">{cat.items.length}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="space-y-5">
          {skillsData.map(cat => (
            <div key={cat.cat}>
              <p className="text-[11px] uppercase tracking-wider text-text-muted mb-2 flex items-center gap-2">
                <span className="w-5 h-[2px] rounded" style={{ backgroundColor: cat.color }} />
                {cat.cat}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {cat.items.map(s => {
                  const pct = proficiency[s.n] || 50
                  return (
                    <a
                      key={s.n}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface border border-white/[0.03] hover:border-white/[0.08] transition-all cursor-pointer"
                    >
                      <div className="relative shrink-0">
                        <Ring pct={pct} color={s.c} size={40} width={3} />
                        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono text-text-muted">
                          {pct}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-text truncate">{s.n}</span>
                    </a>
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

function ExperienceContent() {
  const { t, lang } = useLanguage()
  return (
    <div className="h-full flex flex-col bg-[#0a0a18]">
      <div className="shrink-0 px-6 pt-5 pb-4 flex items-center justify-between">
        <div>
          <p className="text-lg font-display font-bold text-text">{t.experience.title}</p>
          <p className="text-xs text-text-muted">
            {t.experience.positions.length} {lang === 'de' ? 'Stationen' : 'positions'} &middot;{' '}
            {t.experience.positions[0].period.split('—')[0].trim()} &rarr; {lang === 'de' ? 'Heute' : 'Present'}
          </p>
        </div>
        {t.experience.positions[0].isCurrent && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {t.experience.current}
          </span>
        )}
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="relative">
          <div className="absolute left-[23px] top-2 bottom-2 w-[2px] bg-white/[0.04]" />
          <div className="space-y-1">
            {t.experience.positions.map((pos, i) => (
              <div key={i} className="relative flex gap-5 group">
                <div className="shrink-0 pt-4 relative z-10">
                  <div
                    className={`w-[48px] h-[48px] rounded-2xl flex items-center justify-center ${pos.isCurrent ? 'bg-primary/15 border border-primary/30' : 'bg-surface border border-white/[0.06]'}`}
                  >
                    {logos[pos.company] ? (
                      <img src={logos[pos.company]} alt="" className="w-7 h-7 object-contain" />
                    ) : (
                      <Briefcase size={20} className={pos.isCurrent ? 'text-primary' : 'text-text-muted'} />
                    )}
                  </div>
                </div>
                <div className="flex-1 py-3">
                  <div className="rounded-2xl bg-surface border border-white/[0.04] group-hover:border-white/[0.08] transition-colors p-4 relative overflow-hidden">
                    {pos.isCurrent && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-secondary" />
                    )}
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-display font-bold text-base text-text">{pos.title}</h3>
                      <span className="text-[11px] text-text-muted font-mono shrink-0 ml-2">
                        {pos.period.split('—')[0].trim()}
                      </span>
                    </div>
                    {companyUrls[pos.company] ? (
                      <a
                        href={companyUrls[pos.company]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted text-sm mb-1 hover:text-primary transition-colors inline-block"
                      >
                        {pos.company} ↗
                      </a>
                    ) : (
                      <p className="text-text-muted text-sm mb-1">{pos.company}</p>
                    )}
                    <div className="flex gap-3 text-text-muted text-[11px] mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {pos.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={10} />
                        {pos.location}
                      </span>
                    </div>
                    <p className="text-text-muted text-xs leading-relaxed mb-3">{pos.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {pos.tech.map(tc => (
                        <span
                          key={tc}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-primary/5 text-primary/70"
                        >
                          {tc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactContent({ notify }: { notify: (text: string) => void }) {
  const { t, lang } = useLanguage()
  const formRef = useRef<HTMLFormElement>(null)
  const [mailStatus, setMailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return
    setMailStatus('sending')
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setMailStatus('success')
      formRef.current.reset()
      notify(lang === 'de' ? 'Nachricht gesendet!' : 'Message sent!')
      setTimeout(() => setMailStatus('idle'), 4000)
    } catch {
      setMailStatus('error')
      setTimeout(() => setMailStatus('idle'), 4000)
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#0a0a18]">
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.04] bg-surface/50 shrink-0">
        <img src={profileImage} className="w-9 h-9 rounded-full object-cover" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-text">Konrad Dinges</p>
          <p className="text-[11px] text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            {lang === 'de' ? 'Online — Antwortet schnell' : 'Online — Replies quickly'}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="https://github.com/Floatyy1998"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-text transition-colors"
          >
            <GithubIcon size={15} />
          </a>
          <a
            href="https://linkedin.com/in/konrad-dinges-803098296"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-text transition-colors"
          >
            <LinkedinIcon size={15} />
          </a>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="flex gap-3 max-w-[80%]">
          <img src={profileImage} className="w-7 h-7 rounded-full object-cover mt-1 shrink-0" />
          <div className="space-y-2">
            <div className="bg-surface rounded-2xl rounded-tl-sm px-4 py-3">
              <p className="text-sm text-text">{t.contact.description}</p>
            </div>
            <div className="bg-surface rounded-2xl rounded-tl-sm px-4 py-3">
              <p className="text-sm text-text mb-2">
                {lang === 'de' ? 'Schreib mir hier oder direkt per:' : 'Write me here or reach out via:'}
              </p>
              <div className="space-y-1.5">
                <a
                  href="mailto:mail@konrad-dinges.de"
                  className="flex items-center gap-2 text-primary text-sm hover:underline"
                >
                  <MailIcon size={13} />
                  mail@konrad-dinges.de
                </a>
                <p className="flex items-center gap-2 text-text-muted text-sm">
                  <MapPin size={13} />
                  {t.contact.meederGermany}
                </p>
              </div>
            </div>
            <p className="text-[10px] text-text-muted pl-1">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
        {mailStatus === 'success' && (
          <div className="flex justify-end">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
              <p className="text-sm text-primary flex items-center gap-2">
                <CheckCircle size={14} />
                {t.contact.success}
              </p>
            </div>
          </div>
        )}
        {mailStatus === 'error' && (
          <div className="flex justify-end">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
              <p className="text-sm text-red-400 flex items-center gap-2">
                <AlertCircle size={14} />
                {t.contact.error}
              </p>
            </div>
          </div>
        )}
      </div>
      <form
        ref={formRef}
        onSubmit={handleMail}
        className="shrink-0 border-t border-white/[0.04] p-3 space-y-2 bg-surface/30"
      >
        <div className="flex gap-2">
          <input
            name="user_name"
            required
            placeholder={t.contact.namePlaceholder}
            className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-text text-sm placeholder:text-text-muted/40 outline-none focus:border-primary/40 transition-colors"
          />
          <input
            name="user_email"
            type="email"
            required
            placeholder={t.contact.emailPlaceholder}
            className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-text text-sm placeholder:text-text-muted/40 outline-none focus:border-primary/40 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <textarea
            name="message"
            required
            rows={2}
            placeholder={t.contact.messagePlaceholder}
            className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-text text-sm placeholder:text-text-muted/40 outline-none focus:border-primary/40 resize-none transition-colors"
          />
          <button
            type="submit"
            disabled={mailStatus === 'sending'}
            className="w-12 h-12 rounded-xl bg-primary text-bg flex items-center justify-center hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all disabled:opacity-50 shrink-0 self-end"
          >
            {mailStatus === 'sending' ? (
              <div className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

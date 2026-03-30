import { useState, useRef, useEffect } from 'react'
import { LuArrowUpRight as ArrowUpRight } from 'react-icons/lu'
import { FaGithub as GithubIcon } from 'react-icons/fa6'
import type { projectMeta } from '../../data/portfolio'

export function ProjectStory({
  items,
  meta,
  images,
  labels,
}: {
  items: { title: string; description: string; features: string[] }[]
  meta: typeof projectMeta
  images: string[]
  labels: { live: string; code: string }
}) {
  const [tab, setTab] = useState(0)
  const [paused, setPaused] = useState(false)
  const progress = useRef(0)
  const tapTime = useRef(0)
  const [, tick] = useState(0)
  const total = items.length

  useEffect(() => {
    if (paused) return
    const iv = setInterval(() => {
      progress.current += 2
      if (progress.current >= 100) {
        progress.current = 0
        setTab(t2 => (t2 >= total - 1 ? 0 : t2 + 1))
      }
      tick(r => r + 1)
    }, 100)
    return () => clearInterval(iv)
  }, [paused, total])

  const goPrev = () => {
    if (Date.now() - tapTime.current < 300) {
      if (progress.current > 15) {
        progress.current = 0
      } else {
        progress.current = 0
        setTab(t2 => (t2 > 0 ? t2 - 1 : t2))
      }
    }
  }
  const goNext = () => {
    if (Date.now() - tapTime.current < 300) {
      progress.current = 0
      setTab(t2 => (t2 < total - 1 ? t2 + 1 : t2))
    }
  }
  const p = items[tab]
  const m = meta[tab]

  return (
    <div
      className="h-full flex flex-col bg-black relative select-none overflow-hidden"
      onMouseDown={() => {
        setPaused(true)
        tapTime.current = Date.now()
      }}
      onMouseUp={() => setPaused(false)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => {
        setPaused(true)
        tapTime.current = Date.now()
      }}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 px-3 pt-3">
        {/* eslint-disable-next-line react-hooks/refs -- intentional: read ref during render for performance */}
        {items.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-[3px] rounded-full bg-white/20 overflow-hidden cursor-pointer"
            onClick={e => {
              e.stopPropagation()
              progress.current = 0
              setTab(i)
            }}
          >
            <div
              className="h-full rounded-full bg-white"
              style={{ width: i < tab ? '100%' : i === tab ? `${progress.current}%` : '0%', transition: 'none' }}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 z-0">
        <img src={images[tab]} alt={p.title} className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black from-25% via-black/60 via-50% to-transparent" />
      <div className="absolute inset-0 z-30 flex">
        <div className="w-1/3 h-full cursor-pointer" onClick={goPrev} />
        <div className="w-1/3 h-full" />
        <div className="w-1/3 h-full cursor-pointer" onClick={goNext} />
      </div>
      <div className="relative z-40 mt-auto p-6 pb-6 pointer-events-none [&_a]:pointer-events-auto">
        <span className="text-white/30 text-[10px] font-mono">
          {String(tab + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
        <h3 className="font-display font-black text-2xl text-white mt-1 mb-2">{p.title}</h3>
        <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-lg">{p.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {p.features.map(f => (
            <span key={f} className="px-2.5 py-1 text-[10px] rounded-full bg-white/10 text-white/80 font-medium">
              {f}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {m.tech.map(tc => (
            <span key={tc} className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/10 text-white/50">
              {tc}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {m.url && (
            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold flex items-center gap-1.5 hover:bg-primary transition-colors"
            >
              {labels.live} <ArrowUpRight size={12} />
            </a>
          )}
          {m.gh && (
            <a
              href={m.gh}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="px-5 py-2.5 rounded-xl bg-white/15 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-white/25 transition-colors"
            >
              <GithubIcon size={12} />
              {labels.code}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

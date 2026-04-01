import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { AppDef } from '../../types/desktop'

export function Spotlight({
  apps,
  labels,
  onOpen,
  onClose,
}: {
  apps: AppDef[]
  labels: Record<string, string>
  onOpen: (id: string) => void
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { inputRef.current?.focus() }, [])

  const filtered = apps.filter(a =>
    (labels[a.id] || a.label).toLowerCase().includes(query.toLowerCase()),
  )

  const handleQueryChange = (val: string) => {
    setQuery(val)
    setSelectedIdx(0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered.length > 0) {
      onOpen(filtered[selectedIdx].id)
      onClose()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[20vh]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-[560px] max-w-[90vw] bg-surface/95 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
          <svg className="w-5 h-5 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={e => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search apps..."
            className="flex-1 bg-transparent text-text text-lg outline-none placeholder:text-text-muted/40"
          />
        </div>
        {filtered.length > 0 && (
          <div className="py-2 max-h-[300px] overflow-y-auto">
            {filtered.map((app, i) => (
              <button
                key={app.id}
                onClick={() => {
                  onOpen(app.id)
                  onClose()
                }}
                onMouseEnter={() => setSelectedIdx(i)}
                className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                  i === selectedIdx ? 'bg-primary/10' : 'hover:bg-white/[0.03]'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  i === selectedIdx ? 'bg-primary/20 text-primary' : 'bg-surface-light text-text-muted'
                }`}>
                  <app.icon size={18} />
                </div>
                <span className={`text-sm font-medium ${i === selectedIdx ? 'text-primary' : 'text-text'}`}>
                  {labels[app.id] || app.label}
                </span>
              </button>
            ))}
          </div>
        )}
        {filtered.length === 0 && query && (
          <div className="py-8 text-center text-text-muted text-sm">No results found</div>
        )}
      </motion.div>
    </motion.div>
  )
}

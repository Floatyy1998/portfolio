import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const bootLines = [
  { text: '  KD OS v2.0', delay: 100 },
  { text: '  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 300 },
  { text: '', delay: 400 },
  { text: '  Loading kernel ..................... \x1b[32mOK\x1b[0m', delay: 700, ok: true },
  { text: '  Initializing display .............. \x1b[32mOK\x1b[0m', delay: 1100, ok: true },
  { text: '  Starting window manager ........... \x1b[32mOK\x1b[0m', delay: 1500, ok: true },
  { text: '  Loading applications .............. \x1b[32mOK\x1b[0m', delay: 1900, ok: true },
  { text: '  Mounting file system .............. \x1b[32mOK\x1b[0m', delay: 2200, ok: true },
  { text: '', delay: 2400 },
  { text: '  System ready. Welcome, visitor.', delay: 2600 },
]

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState<number>(0)

  useEffect(() => {
    bootLines.forEach((_, i) => {
      setTimeout(() => setVisible(i + 1), bootLines[i].delay)
    })
    setTimeout(onComplete, 3200)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-bg flex items-center justify-center z-[100000]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="font-mono text-sm max-w-lg w-full px-8">
        {bootLines.slice(0, visible).map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="leading-relaxed">
            {line.ok ? (
              <span>
                <span className="text-text-muted">{line.text.split('OK')[0]}</span>
                <span className="text-green-400 font-bold">OK</span>
              </span>
            ) : (
              <span className="text-primary">{line.text}</span>
            )}
          </motion.div>
        ))}
        <span className="text-primary animate-pulse">█</span>
      </div>
    </motion.div>
  )
}

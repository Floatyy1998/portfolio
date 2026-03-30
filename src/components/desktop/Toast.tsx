import { motion } from 'framer-motion'

export function Toast({ text, onDismiss }: { text: string; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80 }}
      className="bg-surface/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl px-4 py-3 shadow-2xl max-w-xs cursor-pointer"
      onClick={onDismiss}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-primary text-sm font-display font-bold">KD</span>
        </div>
        <div>
          <p className="text-text text-sm font-semibold">KD OS</p>
          <p className="text-text-muted text-xs mt-0.5">{text}</p>
        </div>
      </div>
    </motion.div>
  )
}

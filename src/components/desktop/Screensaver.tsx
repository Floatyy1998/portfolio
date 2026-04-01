import { useState, useEffect, useRef } from 'react'

const COLORS = ['#00e5ff', '#bf5af2', '#ff3366', '#28c840', '#febc2e', '#ff5f57', '#61DAFB', '#F7DF1E']

export function Screensaver({ onDismiss }: { onDismiss: () => void }) {
  const [pos, setPos] = useState({ x: 100, y: 100 })
  const [colorIdx, setColorIdx] = useState(0)
  const vel = useRef({ dx: 2, dy: 2 })
  const raf = useRef(0)
  const posRef = useRef(pos)

  useEffect(() => {
    const tick = () => {
      const p = posRef.current
      const textW = 120
      const textH = 60
      let { dx, dy } = vel.current
      let nx = p.x + dx
      let ny = p.y + dy
      let bounced = false

      if (nx <= 0 || nx + textW >= window.innerWidth) {
        dx = -dx
        nx = p.x + dx
        bounced = true
      }
      if (ny <= 0 || ny + textH >= window.innerHeight) {
        dy = -dy
        ny = p.y + dy
        bounced = true
      }

      vel.current = { dx, dy }
      const next = { x: nx, y: ny }
      posRef.current = next
      setPos(next)
      if (bounced) setColorIdx(c => (c + 1) % COLORS.length)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  useEffect(() => {
    const dismiss = () => onDismiss()
    window.addEventListener('mousemove', dismiss)
    window.addEventListener('keydown', dismiss)
    window.addEventListener('mousedown', dismiss)
    window.addEventListener('touchstart', dismiss)
    return () => {
      window.removeEventListener('mousemove', dismiss)
      window.removeEventListener('keydown', dismiss)
      window.removeEventListener('mousedown', dismiss)
      window.removeEventListener('touchstart', dismiss)
    }
  }, [onDismiss])

  return (
    <div className="fixed inset-0 z-[700] bg-black cursor-none">
      <div
        className="absolute font-display font-black text-6xl select-none transition-colors duration-300"
        style={{ left: pos.x, top: pos.y, color: COLORS[colorIdx] }}
      >
        KD
      </div>
    </div>
  )
}

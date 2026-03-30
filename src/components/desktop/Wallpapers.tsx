import { useRef, useEffect } from 'react'

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789ABCDEF<>/{}[]'
    const fontSize = 14,
      columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns)
      .fill(0)
      .map(() => Math.random() * -100)
    const draw = () => {
      ctx.fillStyle = 'rgba(3, 0, 20, 0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
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
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
}

export function MeshGradientWP() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    const blobs = [
      { x: 0.2, y: 0.3, r: 0.4, color: [0, 229, 255], speed: 0.0003, phase: 0 },
      { x: 0.7, y: 0.6, r: 0.35, color: [191, 90, 242], speed: 0.0004, phase: 2 },
      { x: 0.5, y: 0.8, r: 0.3, color: [255, 51, 102], speed: 0.00035, phase: 4 },
      { x: 0.8, y: 0.2, r: 0.25, color: [255, 215, 0], speed: 0.00025, phase: 1 },
    ]
    let frame = 0
    const draw = () => {
      ctx.fillStyle = '#030014'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      frame++
      blobs.forEach(b => {
        const cx = (b.x + Math.sin(frame * b.speed + b.phase) * 0.15) * canvas.width
        const cy = (b.y + Math.cos(frame * b.speed * 1.3 + b.phase) * 0.1) * canvas.height
        const radius = b.r * Math.min(canvas.width, canvas.height)
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        grad.addColorStop(0, `rgba(${b.color.join(',')}, 0.15)`)
        grad.addColorStop(0.5, `rgba(${b.color.join(',')}, 0.05)`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })
      requestAnimationFrame(draw)
    }
    const raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export function StarfieldWP() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    const stars = Array.from({ length: 400 }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random(),
      size: Math.random() * 1.5 + 0.5,
    }))
    const draw = () => {
      ctx.fillStyle = '#030014'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2,
        cy = canvas.height / 2
      stars.forEach(s => {
        s.z -= 0.001
        if (s.z <= 0) {
          s.z = 1
          s.x = Math.random() * 2 - 1
          s.y = Math.random() * 2 - 1
        }
        const sx = (s.x / s.z) * cx + cx
        const sy = (s.y / s.z) * cy + cy
        const size = (1 - s.z) * s.size * 2.5
        const alpha = (1 - s.z) * 0.8
        if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) return
        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`
        ctx.fill()
        const tx = (s.x / (s.z + 0.01)) * cx + cx
        const ty = (s.y / (s.z + 0.01)) * cy + cy
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(tx, ty)
        ctx.strokeStyle = `rgba(200, 220, 255, ${alpha * 0.3})`
        ctx.lineWidth = size * 0.5
        ctx.stroke()
      })
      requestAnimationFrame(draw)
    }
    const raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

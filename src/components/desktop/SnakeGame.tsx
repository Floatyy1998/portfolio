import { useRef, useState, useEffect } from 'react'

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const dirRef = useRef({ x: 1, y: 0 })
  const gameRef = useRef({ snake: [{ x: 5, y: 5 }], food: { x: 10, y: 10 }, running: true })
  const reset = () => {
    gameRef.current = {
      snake: [{ x: 5, y: 5 }],
      food: { x: Math.floor(Math.random() * 19), y: Math.floor(Math.random() * 19) },
      running: true,
    }
    dirRef.current = { x: 1, y: 0 }
    setScore(0)
    setGameOver(false)
  }
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const S = 20,
      G = 20
    const onKey = (e: KeyboardEvent) => {
      const d = dirRef.current
      if (e.key === 'ArrowUp' && d.y === 0) dirRef.current = { x: 0, y: -1 }
      else if (e.key === 'ArrowDown' && d.y === 0) dirRef.current = { x: 0, y: 1 }
      else if (e.key === 'ArrowLeft' && d.x === 0) dirRef.current = { x: -1, y: 0 }
      else if (e.key === 'ArrowRight' && d.x === 0) dirRef.current = { x: 1, y: 0 }
    }
    window.addEventListener('keydown', onKey)
    const interval = setInterval(() => {
      const g = gameRef.current
      if (!g.running) return
      const head = { x: g.snake[0].x + dirRef.current.x, y: g.snake[0].y + dirRef.current.y }
      if (
        head.x < 0 ||
        head.x >= G ||
        head.y < 0 ||
        head.y >= G ||
        g.snake.some(s => s.x === head.x && s.y === head.y)
      ) {
        g.running = false
        setGameOver(true)
        return
      }
      g.snake.unshift(head)
      if (head.x === g.food.x && head.y === g.food.y) {
        g.food = { x: Math.floor(Math.random() * G), y: Math.floor(Math.random() * G) }
        setScore(s => s + 10)
      } else g.snake.pop()
      ctx.fillStyle = '#0a0a14'
      ctx.fillRect(0, 0, G * S, G * S)
      ctx.fillStyle = '#00e5ff08'
      for (let i = 0; i < G; i++)
        for (let j = 0; j < G; j++) {
          if ((i + j) % 2 === 0) ctx.fillRect(i * S, j * S, S, S)
        }
      g.snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? '#00e5ff' : '#00e5ff60'
        ctx.beginPath()
        ctx.roundRect(s.x * S + 1, s.y * S + 1, S - 2, S - 2, 3)
        ctx.fill()
      })
      ctx.fillStyle = '#ff3366'
      ctx.beginPath()
      ctx.roundRect(g.food.x * S + 2, g.food.y * S + 2, S - 4, S - 4, 4)
      ctx.fill()
    }, 150)
    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', onKey)
    }
  }, [gameOver])
  const touchDir = (x: number, y: number) => {
    const d = dirRef.current
    if (x !== 0 && d.x === 0) dirRef.current = { x, y: 0 }
    if (y !== 0 && d.y === 0) dirRef.current = { x: 0, y }
  }
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#0a0a14] p-4 gap-3">
      <div className="flex items-center justify-between w-[400px] max-w-full">
        <span className="text-primary font-mono text-sm">Score: {score}</span>
        {gameOver && (
          <button onClick={reset} className="px-4 py-1.5 rounded-lg bg-primary text-bg text-xs font-bold">
            Restart
          </button>
        )}
      </div>
      <canvas ref={canvasRef} width={400} height={400} className="rounded-xl border border-white/10 max-w-full" />
      <div className="grid grid-cols-3 gap-1 w-32 mt-2 md:hidden">
        <div />
        <button
          onTouchStart={() => touchDir(0, -1)}
          className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary text-lg"
        >
          ↑
        </button>
        <div />
        <button
          onTouchStart={() => touchDir(-1, 0)}
          className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary text-lg"
        >
          ←
        </button>
        <div />
        <button
          onTouchStart={() => touchDir(1, 0)}
          className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary text-lg"
        >
          →
        </button>
        <div />
        <button
          onTouchStart={() => touchDir(0, 1)}
          className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary text-lg"
        >
          ↓
        </button>
        <div />
      </div>
      <p className="text-text-muted text-xs font-mono hidden md:block">Arrow keys to move</p>
    </div>
  )
}

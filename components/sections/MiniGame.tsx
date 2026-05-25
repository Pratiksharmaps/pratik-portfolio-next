'use client'
import { useRef, useEffect, useCallback, useState } from 'react'

const COLS = 20
const ROWS = 20
const CELL = 20
const W = COLS * CELL
const H = ROWS * CELL
const INITIAL_SPEED = 140
const MIN_SPEED = 55

type Dir = 'U' | 'D' | 'L' | 'R'
type Pt = [number, number]

const OPP: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' }

function rndFood(snake: Pt[]): Pt {
  const occupied = new Set(snake.map(([x, y]) => `${x},${y}`))
  let p: Pt
  do { p = [Math.floor(Math.random() * COLS), Math.floor(Math.random() * ROWS)] }
  while (occupied.has(`${p[0]},${p[1]}`))
  return p
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

type Phase = 'idle' | 'playing' | 'over'

export default function MiniGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timerRef = useRef<number | undefined>(undefined)
  const touchRef = useRef<[number, number] | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [score, setScore] = useState(0)
  const [hi, setHi] = useState(0)
  const [visible, setVisible] = useState(false)

  // All mutable game state lives here — no stale closure issues
  const gs = useRef({
    snake: [[10, 10], [9, 10], [8, 10]] as Pt[],
    dir: 'R' as Dir,
    next: 'R' as Dir,
    food: [15, 10] as Pt,
    score: 0,
    alive: false,
    speed: INITIAL_SPEED,
  })

  const draw = useCallback(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    const { snake, food, score: sc } = gs.current

    // Background
    ctx.fillStyle = '#07070F'
    ctx.fillRect(0, 0, W, H)

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.028)'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= COLS; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, H); ctx.stroke()
    }
    for (let j = 0; j <= ROWS; j++) {
      ctx.beginPath(); ctx.moveTo(0, j * CELL); ctx.lineTo(W, j * CELL); ctx.stroke()
    }

    // Food glow + bug emoji
    const [fx, fy] = food
    const fcx = fx * CELL + CELL / 2
    const fcy = fy * CELL + CELL / 2
    const grd = ctx.createRadialGradient(fcx, fcy, 1, fcx, fcy, CELL * 1.2)
    grd.addColorStop(0, 'rgba(255,77,106,0.5)')
    grd.addColorStop(1, 'rgba(255,77,106,0)')
    ctx.fillStyle = grd
    ctx.fillRect(fx * CELL - CELL, fy * CELL - CELL, CELL * 3, CELL * 3)
    ctx.font = `${CELL - 2}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('🐛', fcx, fcy)

    // Snake
    snake.forEach(([x, y], i) => {
      const px = x * CELL
      const py = y * CELL
      if (i === 0) {
        ctx.shadowBlur = 10
        ctx.shadowColor = '#00D4FF'
        ctx.fillStyle = '#00D4FF'
        rrect(ctx, px + 1, py + 1, CELL - 2, CELL - 2, 5)
        ctx.fill()
        ctx.shadowBlur = 0
        // eyes
        ctx.fillStyle = '#07070F'
        ctx.beginPath()
        ctx.arc(px + CELL * 0.33, py + CELL * 0.33, 2.2, 0, Math.PI * 2)
        ctx.arc(px + CELL * 0.67, py + CELL * 0.33, 2.2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        const t = Math.max(0.25, 1 - i / (snake.length + 3))
        ctx.fillStyle = `rgba(0,${Math.floor(130 + t * 110)},${Math.floor(180 + t * 65)},${0.45 + t * 0.55})`
        rrect(ctx, px + 2, py + 2, CELL - 4, CELL - 4, 3)
        ctx.fill()
      }
    })

    // Score HUD
    ctx.shadowBlur = 0
    ctx.fillStyle = 'rgba(0,212,255,0.65)'
    ctx.font = 'bold 10px "JetBrains Mono", monospace'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText(`SCORE: ${sc}`, 7, 6)
  }, [])

  const endGame = useCallback(() => {
    gs.current.alive = false
    clearInterval(timerRef.current)
    const s = gs.current.score
    setScore(s)
    setHi((prev) => {
      const next = Math.max(prev, s)
      return next
    })
    setPhase('over')

    // flash red briefly then draw game-over state
    const cv = canvasRef.current
    if (cv) {
      const ctx = cv.getContext('2d')!
      ctx.fillStyle = 'rgba(239,68,68,0.15)'
      ctx.fillRect(0, 0, W, H)
    }
  }, [])

  // tick ref to avoid stale closure inside setInterval
  const tickFn = useCallback(() => {
    const state = gs.current
    if (!state.alive) return
    state.dir = state.next
    const [hx, hy] = state.snake[0]
    let nx = hx, ny = hy
    if (state.dir === 'U') ny--
    else if (state.dir === 'D') ny++
    else if (state.dir === 'L') nx--
    else nx++

    if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) { endGame(); return }
    if (state.snake.slice(0, -1).some(([x, y]) => x === nx && y === ny)) { endGame(); return }

    const ate = state.food[0] === nx && state.food[1] === ny
    state.snake = ate ? [[nx, ny], ...state.snake] : [[nx, ny], ...state.snake.slice(0, -1)]

    if (ate) {
      state.score += 10
      setScore(state.score)
      state.food = rndFood(state.snake)
      // speed up every 3 bugs
      if (state.snake.length % 3 === 0) {
        const ns = Math.max(MIN_SPEED, state.speed - 8)
        if (ns !== state.speed) {
          state.speed = ns
          clearInterval(timerRef.current)
          timerRef.current = window.setInterval(() => tickFn(), ns)
        }
      }
    }
    draw()
  }, [draw, endGame])

  const startGame = useCallback(() => {
    clearInterval(timerRef.current)
    gs.current = {
      snake: [[10, 10], [9, 10], [8, 10]],
      dir: 'R', next: 'R',
      food: [15, 10],
      score: 0,
      alive: true,
      speed: INITIAL_SPEED,
    }
    setScore(0)
    setPhase('playing')
    draw()
    timerRef.current = window.setInterval(() => tickFn(), INITIAL_SPEED)
  }, [draw, tickFn])

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const state = gs.current
      if (!state.alive) {
        if (e.key === ' ' || e.key === 'Enter') startGame()
        return
      }
      const map: Record<string, Dir> = {
        ArrowUp: 'U', w: 'U', W: 'U',
        ArrowDown: 'D', s: 'D', S: 'D',
        ArrowLeft: 'L', a: 'L', A: 'L',
        ArrowRight: 'R', d: 'R', D: 'R',
      }
      const nd = map[e.key]
      if (!nd) return
      if (OPP[nd] !== state.dir) {
        state.next = nd
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [startGame])

  // Draw initial idle canvas
  useEffect(() => {
    draw()
    return () => clearInterval(timerRef.current)
  }, [draw])

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = [e.touches[0].clientX, e.touches[0].clientY]
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return
    const [sx, sy] = touchRef.current
    const dx = e.changedTouches[0].clientX - sx
    const dy = e.changedTouches[0].clientY - sy
    touchRef.current = null
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
      if (!gs.current.alive) startGame()
      return
    }
    const state = gs.current
    if (!state.alive) return
    const nd: Dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'R' : 'L') : (dy > 0 ? 'D' : 'U')
    if (OPP[nd] !== state.dir) state.next = nd
  }

  if (!visible) {
    return (
      <section className="py-8" aria-label="Mini game section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all duration-200 group"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            onClick={() => setVisible(true)}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🐍</span>
              <div>
                <p className="font-semibold text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  Bored? Play Snake
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Catch the bugs · Arrow keys / WASD · swipe on mobile
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-xs px-3 py-1.5 rounded-lg font-medium"
                style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid rgba(0,212,255,0.2)', fontFamily: 'var(--font-mono)' }}
              >
                Play ↓
              </span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12" aria-label="Mini game — Snake">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                Mini Game
              </span>
            </div>
            <h2 className="text-2xl font-bold flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Bug Hunt 🐛
              <span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>— catch bugs, grow longer</span>
            </h2>
          </div>
          <button
            onClick={() => { clearInterval(timerRef.current); setVisible(false) }}
            className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            Hide ✕
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Canvas */}
          <div className="relative shrink-0">
            <canvas
              ref={canvasRef}
              width={W}
              height={H}
              className="rounded-2xl cursor-pointer block"
              style={{
                border: '1px solid var(--border)',
                boxShadow: phase === 'playing' ? '0 0 30px rgba(0,212,255,0.08)' : 'none',
                touchAction: 'none',
                maxWidth: '100%',
              }}
              onClick={() => { if (!gs.current.alive) startGame() }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            />

            {/* Overlay — idle / game over */}
            {phase !== 'playing' && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl gap-4"
                style={{ background: 'rgba(7,7,15,0.88)', backdropFilter: 'blur(2px)' }}
              >
                {phase === 'over' && (
                  <>
                    <div className="text-center">
                      <p className="text-lg font-bold mb-1" style={{ color: '#EF4444', fontFamily: 'var(--font-display)' }}>
                        💥 Build Failed
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        Segmentation fault (core dumped)
                      </p>
                    </div>
                    <div className="flex gap-8 text-center">
                      <div>
                        <p className="text-2xl font-bold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
                          {score}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Score</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold" style={{ color: '#FBBF24', fontFamily: 'var(--font-display)' }}>
                          {hi}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Best</p>
                      </div>
                    </div>
                  </>
                )}

                {phase === 'idle' && (
                  <div className="text-center px-6">
                    <p className="text-4xl mb-3">🐍</p>
                    <p className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                      Bug Hunt
                    </p>
                    <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                      Catch 🐛 bugs to grow. Hit a wall = build fails.
                    </p>
                  </div>
                )}

                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{
                    background: 'var(--accent)',
                    color: '#000',
                    fontFamily: 'var(--font-display)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {phase === 'over' ? '↺  Restart' : '▶  Start Game'}
                </button>

                <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  or press <kbd style={{ padding: '1px 5px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px' }}>Space</kbd>
                </p>
              </div>
            )}
          </div>

          {/* Side panel */}
          <div className="flex flex-col gap-4 flex-1 w-full lg:w-auto">
            {/* Score cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <p className="text-2xl font-bold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
                  {score}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Current Score</p>
              </div>
              <div className="p-4 rounded-xl text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <p className="text-2xl font-bold" style={{ color: '#FBBF24', fontFamily: 'var(--font-display)' }}>
                  {hi}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Best</p>
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                Controls
              </p>
              <div className="flex flex-col gap-2 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {[
                  ['↑ ↓ ← →', 'Move'],
                  ['W A S D', 'Also move'],
                  ['Space / Enter', 'Start / Restart'],
                  ['Swipe', 'Mobile move'],
                ].map(([key, action]) => (
                  <div key={key} className="flex items-center justify-between gap-2">
                    <kbd style={{ padding: '2px 6px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '11px' }}>
                      {key}
                    </kbd>
                    <span style={{ color: 'var(--text-secondary)' }}>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                Legend
              </p>
              <div className="flex flex-col gap-2.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm" style={{ background: '#00D4FF', boxShadow: '0 0 6px #00D4FF' }} />
                  <span>Your snake</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">🐛</span>
                  <span>Bug — catch for +10 pts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm" style={{ background: '#EF4444' }} />
                  <span>Wall — avoid or build fails!</span>
                </div>
              </div>
            </div>

            {/* Flavor text */}
            <p className="text-xs italic" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {phase === 'playing'
                ? `// ${gs.current.snake.length} lines of code written`
                : phase === 'over'
                ? '// TODO: fix bugs, not eat them'
                : '// takes a break.dart'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

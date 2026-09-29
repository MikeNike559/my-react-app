import { useEffect, useRef, useState } from 'react'

const LANES = [0.2, 0.5, 0.8]
const GAME_LENGTH = 30

function NeonSprint() {
  const canvasRef = useRef(null)
  const frameRef = useRef(null)
  const gameRef = useRef(null)
  const statusRef = useRef('ready')
  const cabinetRef = useRef(null)
  const [status, setStatus] = useState('ready')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem('neon-sprint-best') || 0))

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1
      const bounds = canvas.getBoundingClientRect()
      canvas.width = bounds.width * ratio
      canvas.height = bounds.height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const draw = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      context.clearRect(0, 0, width, height)
      context.fillStyle = '#0d1120'
      context.fillRect(0, 0, width, height)

      context.strokeStyle = 'rgba(101, 230, 244, 0.18)'
      context.lineWidth = 1
      for (let x = 0; x < width; x += 28) {
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x, height)
        context.stroke()
      }
      for (let y = 0; y < height; y += 28) {
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(width, y)
        context.stroke()
      }

      const game = gameRef.current
      const playerX = LANES[game?.lane ?? 1] * width
      const playerY = height - 52
      context.shadowBlur = 22
      context.shadowColor = '#65e6f4'
      context.fillStyle = '#65e6f4'
      context.fillRect(playerX - 18, playerY, 36, 24)
      context.shadowBlur = 0
      context.fillStyle = '#10131f'
      context.fillRect(playerX - 8, playerY + 6, 16, 6)

      game?.obstacles.forEach((obstacle) => {
        const obstacleX = LANES[obstacle.lane] * width
        context.shadowBlur = 16
        context.shadowColor = '#ff79bc'
        context.fillStyle = '#ff79bc'
        context.fillRect(obstacleX - 17, obstacle.y, 34, 22)
        context.shadowBlur = 0
      })

      frameRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  useEffect(() => {
    statusRef.current = status
  }, [status])

  useEffect(() => {
    const move = (event) => {
      if (!gameRef.current || statusRef.current !== 'playing') return
      const key = event.key.toLowerCase()
      if (event.key === 'ArrowLeft' || key === 'a' || event.code === 'KeyA') {
        event.preventDefault()
        gameRef.current.lane = Math.max(0, gameRef.current.lane - 1)
      }
      if (event.key === 'ArrowRight' || key === 'd' || event.code === 'KeyD') {
        event.preventDefault()
        gameRef.current.lane = Math.min(2, gameRef.current.lane + 1)
      }
    }
    window.addEventListener('keydown', move)
    return () => window.removeEventListener('keydown', move)
  }, [])

  const finish = (result) => {
    cancelAnimationFrame(gameRef.current?.loop)
    setScore(result)
    statusRef.current = 'over'
    setStatus('over')
    if (result > best) {
      setBest(result)
      localStorage.setItem('neon-sprint-best', String(result))
    }
  }

  const startGame = () => {
    const startedAt = performance.now()
    const game = { lane: 1, obstacles: [], lastSpawn: 0, loop: null }
    gameRef.current = game
    setScore(0)
    statusRef.current = 'playing'
    setStatus('playing')
    cabinetRef.current?.focus()

    const tick = (now) => {
      const canvas = canvasRef.current
      const height = canvas.clientHeight
      const elapsed = Math.max(0, (now - startedAt) / 1000)
      const speed = 150 + elapsed * 5
      if (now - game.lastSpawn > Math.max(420, 850 - elapsed * 10)) {
        game.obstacles.push({ lane: Math.floor(Math.random() * 3), y: -28 })
        game.lastSpawn = now
      }
      game.obstacles.forEach((obstacle) => { obstacle.y += speed / 60 })
      game.obstacles = game.obstacles.filter((obstacle) => obstacle.y < height + 30)

      const collision = game.obstacles.some((obstacle) => (
        obstacle.lane === game.lane && obstacle.y > height - 76 && obstacle.y < height - 22
      ))
      if (collision) {
        finish(Math.floor(elapsed * 100))
        return
      }
      if (elapsed >= GAME_LENGTH) {
        finish(Math.floor(GAME_LENGTH * 100))
        return
      }
      setScore(Math.floor(elapsed * 100))
      game.loop = requestAnimationFrame(tick)
    }
    game.loop = requestAnimationFrame(tick)
  }

  const movePlayer = (direction) => {
    if (statusRef.current !== 'playing' || !gameRef.current) return
    gameRef.current.lane = Math.max(0, Math.min(2, gameRef.current.lane + direction))
  }

  return (
    <section className="neon-sprint" id="neon-sprint">
      <div className="game-heading">
        <div>
          <span className="eyebrow">Playable prototype · 30 seconds</span>
          <h2>Neon Sprint</h2>
          <p>Dodge the pink blocks. Stay in the light. Use <strong>A/D</strong> or the arrow keys.</p>
        </div>
        <div className="game-score" aria-live="polite">
          <span>SCORE</span>
          <strong>{String(score).padStart(6, '0')}</strong>
          <small>BEST {String(best).padStart(6, '0')}</small>
        </div>
      </div>

      <div className="game-cabinet" ref={cabinetRef} tabIndex="-1">
        <canvas ref={canvasRef} aria-label="Neon Sprint game board" />
        {status !== 'playing' && (
          <div className="game-overlay">
            <span>{status === 'over' ? 'RUN COMPLETE' : 'PLAYER 01 READY'}</span>
            <strong>{status === 'over' ? `Score ${score}` : 'DODGE THE GRID'}</strong>
            <button className="primary-button" onClick={startGame}>
              {status === 'over' ? 'Run it back' : 'Start Neon Sprint'} <span>↗</span>
            </button>
          </div>
        )}
      </div>

      <div className="game-controls">
        <button onPointerDown={(event) => { event.preventDefault(); movePlayer(-1) }} aria-label="Move left">←</button>
        <span>Touch controls</span>
        <button onPointerDown={(event) => { event.preventDefault(); movePlayer(1) }} aria-label="Move right">→</button>
      </div>
    </section>
  )
}

export default NeonSprint

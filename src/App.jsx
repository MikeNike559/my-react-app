import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Food from './Food.jsx'
import NeonSprint from './NeonSprint.jsx'

const gameModes = [
  {
    title: 'Neon Sprint',
    text: 'Dodge the grid, chase the high score, and survive the fastest 60 seconds on the internet.',
    meta: 'Arcade · 1 player',
    accent: 'cyan',
  },
  {
    title: 'Pixel Raiders',
    text: 'Blast through tiny alien waves and unlock a new power-up every round.',
    meta: 'Shooter · 1–2 players',
    accent: 'pink',
  },
  {
    title: 'Combo Clash',
    text: 'Match, chain, and clear your way to the top of today’s community leaderboard.',
    meta: 'Puzzle · Casual',
    accent: 'lime',
  },
]

const stats = [
  { value: '24', label: 'games to play' },
  { value: '8.6K', label: 'scores this week' },
  { value: '0', label: 'downloads needed' },
]

function App() {
  return (
    <div className="page-shell">
      <Header />

      <main className="main-content">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Free to play · no download</span>
            <h1>Your next high score starts here.</h1>
            <p>
              Welcome to <strong>Afterglow Arcade</strong> — a hand-picked collection of quick, colorful browser games
              made for one more round.
            </p>

            <div className="hero-actions">
              <a href="#games" className="primary-button">Play a game <span>↗</span></a>
              <a href="#about" className="secondary-button">How it works</a>
            </div>

            <div className="stats-row" aria-label="Arcade statistics">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-label="Afterglow Arcade game preview">
            <div className="showcase-card main-card">
              <div className="dashboard-header">
                <span className="dot dot-pink" />
                <span className="dot dot-gold" />
                <span className="dot dot-mint" />
                <span className="window-label">AFTERGLOW.EXE</span>
              </div>
              <div className="game-screen">
                <span className="screen-label">PLAYER 01 · READY</span>
                <div className="pixel-orb" />
                <div className="screen-score">004280</div>
                <div className="screen-bars"><span /><span /><span /></div>
              </div>
            </div>

            <div className="floating-card floating-one">
              <span>NEW RECORD</span>
              <small>+1,240 points</small>
            </div>

            <div className="floating-card floating-two">
              <span>LIVE NOW</span>
              <small>42 players online</small>
            </div>
          </div>
        </section>

        <section className="services" id="games">
          {gameModes.map((game, index) => (
            <article key={game.title} className={`service-card ${game.accent}`}>
              <div className="game-card-top">
                <span className="service-index">0{index + 1}</span>
                <span className="game-status">PLAY NOW</span>
              </div>
              <h3>{game.title}</h3>
              <p>{game.text}</p>
              <span className="game-meta">{game.meta}</span>
            </article>
          ))}
        </section>

        <NeonSprint />

        <section className="feature-panel" id="about">
          <div className="section-heading">
            <span className="eyebrow">The arcade drop</span>
            <h2>Small games. Big “just one more try” energy.</h2>
            <p>Jump in from any device, keep your best score, and discover something new every week.</p>
          </div>
          <Food />
        </section>

        <section className="cta-panel" id="contact">
          <div>
            <span className="eyebrow light">Your move</span>
            <h2>Grab a controller, or just use your keyboard.</h2>
          </div>
          <a href="#games" className="primary-button light-button">Enter the arcade <span>↗</span></a>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App

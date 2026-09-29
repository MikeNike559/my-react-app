function Header() {
  return (
    <header className="topbar">
      <a className="brand-wrap" href="#" aria-label="Afterglow Arcade home">
        <span className="brand-mark">A</span>
        <div className="brand-copy">
          <span className="brand-name">Afterglow</span>
          <span className="brand-tag">Arcade</span>
        </div>
      </a>

      <nav className="main-nav" aria-label="Primary navigation">
        <a href="#games">Games</a>
        <a href="#about">About</a>
        <a href="#contact">Join the fun</a>
      </nav>

      <a href="#games" className="nav-button">Play now <span>↗</span></a>
    </header>
  )
}

export default Header

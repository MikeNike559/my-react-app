function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <span className="brand-name">Afterglow Arcade</span>
        <p>Quick games for bright minds and competitive thumbs.</p>
      </div>

      <div className="footer-links">
        <a href="#games">Games</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      <p className="copyright">© {new Date().getFullYear()} Afterglow Arcade</p>
    </footer>
  )
}

export default Footer

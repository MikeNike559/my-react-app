const picks = [
  { name: 'Daily Challenge', note: 'A fresh score chase every 24 hours.', accent: 'sun', icon: '✦' },
  { name: 'Two Minute Mode', note: 'Fast rounds for when you have time for one.', accent: 'berry', icon: '02' },
  { name: 'Local Legends', note: 'See how your score stacks up with friends.', accent: 'mint', icon: 'VS' },
  { name: 'Coming Soon', note: 'New games and weird ideas are loading.', accent: 'gold', icon: '…' },
]

function Food() {
  return (
    <div className="food-grid">
      {picks.map((pick) => (
        <article key={pick.name} className={`food-card ${pick.accent}`}>
          <div className="food-visual" aria-hidden="true">
            <span>{pick.icon}</span>
          </div>
          <div className="food-copy">
            <p className="tag">Arcade feature</p>
            <h3>{pick.name}</h3>
            <p>{pick.note}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default Food

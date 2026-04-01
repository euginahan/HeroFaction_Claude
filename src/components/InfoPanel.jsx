import './InfoPanel.css'

export default function InfoPanel({ food }) {
  const visible = !!food

  return (
    <>
      {/* Top center — food name with soft white pill behind it */}
      <div className={`info-panel info-top ${visible ? 'info-visible' : ''}`}>
        <div className="info-name-bubble" style={{ '--food-color': food?.colors.primary }}>
          <span className="info-name" style={{ color: food?.colors.primary }}>{food?.name}</span>
        </div>
      </div>

      {/* Left — fun fact: cream paper note with tape */}
      <div className={`info-panel info-left ${visible ? 'info-visible' : ''}`}>
        <div className="paper-note note-cream">
          <div className="note-tape" />
          <span className="info-label">Fun Fact</span>
          <span className="info-text">{food?.fact}</span>
        </div>
      </div>

      {/* Right — recommendation: pink paper note with torn bottom */}
      <div className={`info-panel info-right ${visible ? 'info-visible' : ''}`}>
        <div className="paper-note note-pink note-torn">
          <span className="info-label">Remember</span>
          <span className="info-text">{food?.recommendation}</span>
        </div>
      </div>
    </>
  )
}

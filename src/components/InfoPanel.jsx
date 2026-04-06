import './InfoPanel.css'

export default function InfoPanel({ food, fedMessage, fedColor }) {
  const foodVisible = !!food
  const fedVisible  = !!fedMessage
  const topVisible  = foodVisible || fedVisible

  return (
    <>
      {/* Top center — food name or fed message */}
      <div className={`info-panel info-top ${topVisible ? 'info-visible' : ''}`}>
        <span
          className={`info-name ${fedVisible ? 'info-fed' : ''}`}
          style={{ color: fedVisible ? fedColor : food?.colors.primary }}
        >
          {fedVisible ? fedMessage : food?.name}
        </span>
      </div>

      {/* Left — fun fact (only during hover, not during fed) */}
      <div className={`info-panel info-left ${foodVisible ? 'info-visible' : ''}`}>
        <div className="paper-note note-cream">
          <div className="note-tape" />
          <span className="info-label">Fun Fact</span>
          <span className="info-text">{food?.fact}</span>
        </div>
      </div>

      {/* Right — recommendation (only during hover, not during fed) */}
      <div className={`info-panel info-right ${foodVisible ? 'info-visible' : ''}`}>
        <div className="paper-note note-pink note-torn">
          <span className="info-label">Remember</span>
          <span className="info-text">{food?.recommendation}</span>
        </div>
      </div>
    </>
  )
}

import './InfoPanel.css'

export default function InfoPanel({ food }) {
  const visible = !!food

  return (
    <>
      {/* Top center — food name */}
      <div className={`info-panel info-top ${visible ? 'info-visible' : ''}`}
           style={{ color: food?.colors.primary }}>
        <span className="info-name">{food?.name}</span>
      </div>

      {/* Left — fun fact */}
      <div className={`info-panel info-left ${visible ? 'info-visible' : ''}`}>
        <div className="info-bubble">
          <span className="info-label">Fun Fact</span>
          <span className="info-text">{food?.fact}</span>
        </div>
      </div>

      {/* Right — recommendation */}
      <div className={`info-panel info-right ${visible ? 'info-visible' : ''}`}>
        <div className="info-bubble">
          <span className="info-label">Remember</span>
          <span className="info-text">{food?.recommendation}</span>
        </div>
      </div>
    </>
  )
}

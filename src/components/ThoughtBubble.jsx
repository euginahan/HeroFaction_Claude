import './ThoughtBubble.css'

const base = import.meta.env.BASE_URL

export default function ThoughtBubble({ visible }) {
  return (
    <div className={`thought-wrap ${visible ? '' : 'thought-hidden'}`}>
      {/* PNG asset — provides cloud shape + drawn tail circles */}
      <img
        className="thought-img"
        src={`${base}thoughtbubble.png`}
        alt=""
        draggable={false}
      />

      {/* Text centered in the upper cloud area */}
      <div className="thought-text-overlay">
        <span className="thought-text">Pick a food and feed it to me!</span>
      </div>

      {/* Animated pulse overlays — sit on top of the drawn tail circles */}
      <div className="thought-anim-dot thought-anim-dot-1" />
      <div className="thought-anim-dot thought-anim-dot-2" />
      <div className="thought-anim-dot thought-anim-dot-3" />
    </div>
  )
}

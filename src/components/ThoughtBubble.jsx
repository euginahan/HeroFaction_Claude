import './ThoughtBubble.css'

export default function ThoughtBubble({ visible }) {
  return (
    <div className={`thought-wrap ${visible ? '' : 'thought-hidden'}`}>
      <div className="thought-main">
        <span className="thought-text">Pick a food and feed it to me!</span>
      </div>
      <div className="thought-dot thought-dot-1" />
      <div className="thought-dot thought-dot-2" />
      <div className="thought-dot thought-dot-3" />
    </div>
  )
}

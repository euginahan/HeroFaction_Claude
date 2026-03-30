import { useEffect, useRef } from 'react'
import './FoodItem.css'

export default function FoodItem({ food, isHovered, isOtherHovered, onHover, onLeave }) {
  const faceRef = useRef(null)

  // Reset blink animation when face appears
  useEffect(() => {
    if (isHovered && faceRef.current) {
      faceRef.current.querySelectorAll('.food-eye').forEach(eye => {
        eye.style.animation = 'none'
        eye.offsetHeight // reflow
        eye.style.animation = ''
      })
    }
  }, [isHovered])

  return (
    <div
      className={`food-item ${isHovered ? 'is-hovered' : ''} ${isOtherHovered ? 'is-dimmed' : ''}`}
      style={{ '--rotation': `${food.rotation}deg`, '--glow': food.colors.glow }}
      onMouseEnter={() => onHover(food.id)}
      onMouseLeave={onLeave}
    >
      <span className="food-emoji">{food.emoji}</span>

      <div className={`food-face ${isHovered ? 'face-visible' : ''}`} ref={faceRef}>
        <div className="food-eyes">
          <div className="food-eye" />
          <div className="food-eye" />
        </div>
        <div className="food-mouth" />
      </div>
    </div>
  )
}

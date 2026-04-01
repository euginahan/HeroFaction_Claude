import { useEffect, useRef, useCallback } from 'react'
import './FoodItem.css'

export default function FoodItem({ food, isHovered, isOtherHovered, fullDim, onHover, onLeave }) {
  const faceRef = useRef(null)
  const hoverTimer = useRef(null)

  useEffect(() => {
    if (isHovered && faceRef.current) {
      faceRef.current.querySelectorAll('.food-eye').forEach(eye => {
        eye.style.animation = 'none'
        eye.offsetHeight
        eye.style.animation = ''
      })
    }
  }, [isHovered])

  // 75ms delay before triggering hover — prevents flicker from cursor jitter
  const handleEnter = useCallback(() => {
    hoverTimer.current = setTimeout(() => onHover(food.id), 75)
  }, [food.id, onHover])

  const handleLeave = useCallback(() => {
    clearTimeout(hoverTimer.current)
    onLeave()
  }, [onLeave])

  const hasImages = !!(food.staticImg && food.animatedImg)
  const base = import.meta.env.BASE_URL

  return (
    <div
      className={`food-item ${hasImages ? 'has-img' : ''} ${isHovered ? 'is-hovered' : ''} ${fullDim ? 'is-hidden' : isOtherHovered ? 'is-dimmed' : ''}`}
      style={{ '--rotation': `${food.rotation}deg`, '--glow': food.colors.glow }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {hasImages ? (
        <div className="food-img-wrap">
          <img
            className={`food-img food-img-static ${isHovered ? 'img-hidden' : ''}`}
            src={`${base}${food.staticImg}`}
            alt={food.name}
            draggable={false}
          />
          <img
            className={`food-img food-img-alive ${isHovered ? 'img-visible' : ''}`}
            src={`${base}${food.animatedImg}`}
            alt={`${food.name} waving`}
            draggable={false}
          />
        </div>
      ) : (
        <>
          <span className="food-emoji">{food.emoji}</span>
          <div className={`food-face ${isHovered ? 'face-visible' : ''}`} ref={faceRef}>
            <div className="food-eyes">
              <div className="food-eye" />
              <div className="food-eye" />
            </div>
            <div className="food-mouth" />
          </div>
        </>
      )}
    </div>
  )
}

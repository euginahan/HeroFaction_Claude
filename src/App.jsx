import { useState, useCallback, useRef, useEffect } from 'react'
import { foods } from './data/foods'
import { playSound } from './utils/sounds'
import FoodItem from './components/FoodItem'
import InfoPanel from './components/InfoPanel'
import ThoughtBubble from './components/ThoughtBubble'
import './App.css'

const imageFoods = foods.filter(f => f.staticImg && f.animatedImg)
const HEARTS = 6

export default function App() {
  const [hoveredId, setHoveredId]     = useState(null)
  const [dragState, setDragState]     = useState(null) // { foodId, x, y }
  const [fedState,  setFedState]      = useState(null) // { foodId } | null
  const [hasInteracted, setHasInteracted] = useState(false)

  const activeFood = foods.find(f => f.id === hoveredId) ?? null
  const dragFood   = dragState ? (foods.find(f => f.id === dragState.foodId) ?? null) : null
  const fedFood    = fedState  ? (foods.find(f => f.id === fedState.foodId)  ?? null) : null

  const girlRef      = useRef(null)
  const dragStateRef = useRef(null)
  const resetTimer   = useRef(null)
  dragStateRef.current = dragState

  // ── Hover handlers ──────────────────────────────
  const handleHover = useCallback((id) => {
    if (dragStateRef.current) return
    const food = foods.find(f => f.id === id)
    if (food) playSound(food.sound)
    setHoveredId(id)
  }, [])

  const handleLeave = useCallback(() => {
    if (dragStateRef.current) return // keep hover locked while dragging
    setHoveredId(null)
  }, [])

  // ── Drag start (click on plate while food is alive) ──
  const handlePlateMouseDown = useCallback((e) => {
    if (!hoveredId) return
    e.preventDefault()
    setDragState({ foodId: hoveredId, x: e.clientX, y: e.clientY })
  }, [hoveredId])

  // ── Window-level move + up listeners while dragging ──
  const isDragging = !!dragState
  useEffect(() => {
    if (!isDragging) return

    const onMove = (e) => {
      setDragState(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)
    }

    const onUp = (e) => {
      const drag = dragStateRef.current
      if (!drag) return

      // Check drop on girl (upper 65% of her bounding box = head + torso)
      if (girlRef.current) {
        const r = girlRef.current.getBoundingClientRect()
        const inX = e.clientX >= r.left && e.clientX <= r.right
        const inY = e.clientY >= r.top  && e.clientY <= r.top + r.height * 0.65
        if (inX && inY) {
          setFedState({ foodId: drag.foodId })
          setHasInteracted(true)
          clearTimeout(resetTimer.current)
          resetTimer.current = setTimeout(() => setFedState(null), 2600)
        }
      }
      setDragState(null)
      setHoveredId(null)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [isDragging])

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  const base = import.meta.env.BASE_URL

  // Derived flags
  const fullDimSiblings = !!(activeFood?.staticImg && hoveredId !== null)
  const allHidden       = !!fedState

  return (
    <div
      className={`scene ${isDragging ? 'is-dragging' : ''}`}
      style={{ backgroundImage: `url(${base}kitchen.jpg)` }}
    >
      {/* Background color wash — suppressed during drag/fed */}
      <div
        className="color-overlay"
        style={{
          backgroundColor: activeFood?.colors.highlight ?? 'transparent',
          opacity: (activeFood && !isDragging && !fedState) ? 0.28 : 0,
        }}
      />

      <InfoPanel
        food={(!isDragging && !fedState) ? activeFood : null}
        fedMessage={fedFood?.fedMessage ?? null}
        fedColor={fedFood?.colors.primary ?? null}
      />

      {/* Floating hearts on successful feed */}
      {fedState && (
        <div className="hearts-container">
          {Array.from({ length: HEARTS }, (_, i) => (
            <div key={i} className={`heart heart-${i}`}>💗</div>
          ))}
        </div>
      )}

      <div className="stage">

        <ThoughtBubble visible={!hasInteracted} />

        {/* Girl — normal state */}
        <img
          ref={girlRef}
          className={`child-figure ${fedFood?.girlHappyImg ? 'girl-out' : ''}`}
          src={`${base}girl.png`}
          alt="A girl sitting at the table"
          draggable={false}
        />

        {/* Girl — happy/eating state (only rendered when fed) */}
        {fedFood?.girlHappyImg && (
          <img
            className="child-figure girl-happy-in"
            src={`${base}${fedFood.girlHappyImg}`}
            alt="Happy girl eating"
            draggable={false}
          />
        )}

        <div className="bench">
          <div className="bench-seat" />
          <div className="bench-legs">
            <div className="bench-leg" />
            <div className="bench-leg" />
          </div>
        </div>

        <div className="table">
          <div className="utensil fork">🍴</div>
          <div className="plate">
            <div
              className={`plate-inner ${hoveredId && !isDragging ? 'plate-grabbable' : ''}`}
              onMouseDown={hoveredId && !isDragging ? handlePlateMouseDown : undefined}
            >
              <div className="food-grid">
                {foods.map(food => (
                  <FoodItem
                    key={food.id}
                    food={food}
                    isHovered={hoveredId === food.id && !isDragging}
                    isOtherHovered={hoveredId !== null && hoveredId !== food.id && !isDragging}
                    fullDim={(fullDimSiblings && food.id !== hoveredId) || allHidden}
                    onHover={handleHover}
                    onLeave={handleLeave}
                  />
                ))}
              </div>

              {/* Alive overlays — always mounted, centered on plate */}
              {imageFoods.map(food => (
                <img
                  key={food.id}
                  className={`alive-overlay alive-${food.id} ${hoveredId === food.id && !isDragging ? 'alive-visible' : ''}`}
                  src={`${base}${food.animatedImg}`}
                  style={{ '--glow': food.colors.glow }}
                  alt=""
                  draggable={false}
                />
              ))}
            </div>
          </div>
          <div className="utensil spoon">🥄</div>
        </div>

      </div>

      {/* Drag ghost — follows cursor */}
      {dragState && dragFood && (
        <img
          className={`drag-ghost drag-ghost-${dragFood.id}`}
          src={`${base}${dragFood.animatedImg}`}
          style={{
            left: dragState.x,
            top:  dragState.y,
            '--glow': dragFood.colors.glow,
          }}
          alt=""
          draggable={false}
        />
      )}
    </div>
  )
}

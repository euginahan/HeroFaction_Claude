import { useState, useCallback } from 'react'
import { foods } from './data/foods'
import { playSound } from './utils/sounds'
import FoodItem from './components/FoodItem'
import InfoPanel from './components/InfoPanel'
import './App.css'

export default function App() {
  const [hoveredId, setHoveredId] = useState(null)
  const activeFood = foods.find(f => f.id === hoveredId) ?? null

  const handleHover = useCallback((id) => {
    const food = foods.find(f => f.id === id)
    if (food) playSound(food.sound)
    setHoveredId(id)
  }, [])

  const handleLeave = useCallback(() => {
    setHoveredId(null)
  }, [])

  return (
    <div
      className="scene"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}kitchen.jpg)` }}
    >
      {/* Subtle color wash overlay on hover */}
      <div
        className="color-overlay"
        style={{
          backgroundColor: activeFood?.colors.highlight ?? 'transparent',
          opacity: activeFood ? 0.28 : 0,
        }}
      />

      {/* Info panels */}
      <InfoPanel food={activeFood} />

      {/* Focal area: girl + table */}
      <div className="focal-area">

        <img
          className="child-figure"
          src={`${import.meta.env.BASE_URL}girl.png`}
          alt="A happy girl sitting at the table"
        />

        <div className="table">
          <div className="utensil fork">🍴</div>

          <div className="plate">
            <div className="plate-inner">
              <div className="food-grid">
                {foods.map(food => (
                  <FoodItem
                    key={food.id}
                    food={food}
                    isHovered={hoveredId === food.id}
                    isOtherHovered={hoveredId !== null && hoveredId !== food.id}
                    onHover={handleHover}
                    onLeave={handleLeave}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="utensil spoon">🥄</div>
        </div>

      </div>
    </div>
  )
}

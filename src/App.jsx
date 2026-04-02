import { useState, useCallback } from 'react'
import { foods } from './data/foods'
import { playSound } from './utils/sounds'
import FoodItem from './components/FoodItem'
import InfoPanel from './components/InfoPanel'
import './App.css'

const imageFoods = foods.filter(f => f.staticImg && f.animatedImg)

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
      <div
        className="color-overlay"
        style={{
          backgroundColor: activeFood?.colors.highlight ?? 'transparent',
          opacity: activeFood ? 0.28 : 0,
        }}
      />

      <InfoPanel food={activeFood} />

      <div className="stage">

        <img
          className="child-figure"
          src={`${import.meta.env.BASE_URL}girl.png`}
          alt="A happy girl sitting at the table"
        />

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
            <div className="plate-inner">

              {/* Food grid — static images + emoji foods stay here */}
              <div className="food-grid">
                {foods.map(food => (
                  <FoodItem
                    key={food.id}
                    food={food}
                    isHovered={hoveredId === food.id}
                    isOtherHovered={hoveredId !== null && hoveredId !== food.id}
                    fullDim={!!(activeFood?.staticImg && hoveredId !== food.id && hoveredId !== null)}
                    onHover={handleHover}
                    onLeave={handleLeave}
                  />
                ))}
              </div>

              {/* Alive overlays — absolutely centered on plate, one per image-food.
                  Always mounted so opacity transitions work cleanly. */}
              {imageFoods.map(food => (
                <img
                  key={food.id}
                  className={`alive-overlay alive-${food.id} ${hoveredId === food.id ? 'alive-visible' : ''}`}
                  src={`${import.meta.env.BASE_URL}${food.animatedImg}`}
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
    </div>
  )
}

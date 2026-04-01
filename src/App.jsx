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
      style={{
        backgroundColor: activeFood ? activeFood.colors.highlight : '#F5E2C0',
      }}
    >
      {/* Room: window */}
      <div className="room-window">
        <div className="window-pane">
          <div className="tree tree-1" />
          <div className="tree tree-2" />
        </div>
        <div className="curtain curtain-left" />
        <div className="curtain curtain-right" />
      </div>

      {/* Room: wall painting */}
      <div className="room-painting">
        <div className="painting-inner" />
      </div>

      {/* Room: couch */}
      <div className="room-couch">
        <div className="couch-back" />
        <div className="couch-seat" />
        <div className="couch-arm couch-arm-left" />
        <div className="couch-arm couch-arm-right" />
      </div>

      {/* Info panels (positioned absolute, fade in/out) */}
      <InfoPanel food={activeFood} />

      {/* Focal area: child + table */}
      <div className="focal-area">

        {/* Chair back — sits behind the girl */}
        <div className="chair-back" />

        {/* Child character — sitting pose, transparent PNG */}
        <img
          className="child-figure"
          src={`${import.meta.env.BASE_URL}girl.png`}
          alt="A happy girl sitting at the table"
        />

        {/* Table */}
        <div className="table">
          <div className="utensil fork">🍴</div>

          {/* Plate with foods */}
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

import './ThoughtBubble.css'

// Cloud circle definitions: [cx, cy, r]
// 10 overlapping circles merging into one irregular cartoon cloud
const CLOUD = [
  [65,  88, 47],   // left body
  [110, 78, 55],   // center — largest, dominant
  [157, 87, 45],   // right body
  [80,  49, 37],   // upper-left bump
  [123, 43, 35],   // upper-center bump
  [165, 60, 30],   // upper-right bump
  [45,  72, 27],   // far-left bump
  [190, 73, 24],   // far-right bump
  [88,  122, 28],  // lower-left rounding
  [133, 122, 28],  // lower-right rounding
]
const PAD = 5 // px added to each circle radius for the black outline layer

export default function ThoughtBubble({ visible }) {
  return (
    <div className={`thought-wrap ${visible ? '' : 'thought-hidden'}`}>
      <svg
        className="thought-svg"
        viewBox="0 0 220 258"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/*
            Blob-merge filter:
            1. Gaussian blur spreads and merges nearby circles
            2. feColorMatrix boosts alpha sharply — pixels inside the merged
               shape become fully opaque, outside fully transparent
            Result: a clean, sharp-edged unified shape in the original fill color
          */}
          <filter id="tb-merge" x="-12%" y="-12%" width="124%" height="124%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -11"
            />
          </filter>
        </defs>

        {/* ── Black outline layer (each circle radius + PAD) ── */}
        <g filter="url(#tb-merge)" fill="black">
          {CLOUD.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r + PAD} />
          ))}
        </g>

        {/* ── White fill layer (normal radii, rendered above black) ── */}
        <g filter="url(#tb-merge)" fill="white">
          {CLOUD.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} />
          ))}
        </g>

        {/* ── Instruction text — BC Civitas, centered in cloud ── */}
        <text x="108" y="74" textAnchor="middle" className="thought-text-svg">
          Pick a food and
        </text>
        <text x="108" y="95" textAnchor="middle" className="thought-text-svg">
          feed it to me!
        </text>

        {/* ── Connector circles — decrease in size toward girl's head ──
            Largest is closest to cloud, smallest is closest to girl.
            Rendered with explicit stroke so they stay sharp. */}
        <circle
          className="thought-dot thought-dot-1"
          cx="115" cy="182" r="20"
          fill="white" stroke="black" strokeWidth="3.5"
        />
        <circle
          className="thought-dot thought-dot-2"
          cx="102" cy="212" r="13"
          fill="white" stroke="black" strokeWidth="3"
        />
        <circle
          className="thought-dot thought-dot-3"
          cx="91" cy="237" r="9"
          fill="white" stroke="black" strokeWidth="2.5"
        />
      </svg>
    </div>
  )
}

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

export default function ThoughtBubble({ visible }) {
  return (
    <div className={`thought-wrap ${visible ? '' : 'thought-hidden'}`}>
      <svg
        className="thought-svg"
        viewBox="0 0 220 290"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/*
            Blob-merge filter: Gaussian blur spreads + merges circles,
            feColorMatrix boosts alpha to a sharp threshold.
            Result: a clean unified shape with the original fill color.
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

        {/* ── White cloud — no outline, defined by drop-shadow in CSS ── */}
        <g filter="url(#tb-merge)" fill="white">
          {CLOUD.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} />
          ))}
        </g>

        {/* ── Instruction text — BC Civitas, 17px, centered in cloud ── */}
        <text x="108" y="72" textAnchor="middle" className="thought-text-svg">
          Pick a food and
        </text>
        <text x="108" y="97" textAnchor="middle" className="thought-text-svg">
          feed it to me!
        </text>

        {/* ── Connector circles — organic curved arc, cloud → girl's head ──
            Horizontal: each dot shifts +8px right from the one below,
            creating a gentle rightward arc rather than a vertical line.
            Vertical: edge-gaps increase (14px → 22px) for uneven spacing.
            Slight cy nudges (±2px) on middle and top remove ruler stiffness.
            Radii: 14 / 11 / 8 — subtle hierarchy, not exaggerated.      */}
        <circle
          className="thought-dot thought-dot-1"
          cx="104" cy="177" r="14"
          fill="white"
        />
        <circle
          className="thought-dot thought-dot-2"
          cx="96" cy="222" r="11"
          fill="white"
        />
        <circle
          className="thought-dot thought-dot-3"
          cx="88" cy="257" r="8"
          fill="white"
        />
      </svg>
    </div>
  )
}

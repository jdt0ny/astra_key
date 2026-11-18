import type { CSSProperties } from 'react';

const TICKS = Array.from({ length: 48 }, (_, index) => index);
const CROSS_POINTS = [0, 90, 180, 270];

export function OrbitPlate() {
  return (
    <svg
      className="orbit-plate"
      viewBox="0 0 360 360"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="astra-orbit-glow">
          <stop offset="0%" stopColor="var(--green, #8af7a4)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--green, #8af7a4)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="180" cy="180" r="174" fill="url(#astra-orbit-glow)" />

      <g className="orbit-plate__ticks">
        {TICKS.map((tick) => {
          const isMajor = tick % 4 === 0;
          const isCardinal = tick % 12 === 0;

          return (
            <line
              key={tick}
              x1="180"
              y1={isMajor ? 9 : 13}
              x2="180"
              y2={isCardinal ? 23 : isMajor ? 19 : 17}
              transform={`rotate(${tick * 7.5} 180 180)`}
              stroke="var(--green, #8af7a4)"
              strokeOpacity={isCardinal ? 0.7 : isMajor ? 0.4 : 0.16}
            />
          );
        })}
      </g>

      <circle cx="180" cy="180" r="145" stroke="var(--green, #8af7a4)" strokeOpacity="0.18" />
      <circle
        cx="180"
        cy="180"
        r="119"
        stroke="var(--green, #8af7a4)"
        strokeOpacity="0.24"
        strokeDasharray="1 7"
      />
      <circle cx="180" cy="180" r="76" stroke="var(--amber, #ffc46b)" strokeOpacity="0.16" />
      <ellipse
        cx="180"
        cy="180"
        rx="164"
        ry="84"
        transform="rotate(-28 180 180)"
        stroke="var(--amber, #ffc46b)"
        strokeOpacity="0.2"
        strokeDasharray="44 10 3 10"
      />
      <ellipse
        cx="180"
        cy="180"
        rx="156"
        ry="96"
        transform="rotate(35 180 180)"
        stroke="var(--green, #8af7a4)"
        strokeOpacity="0.16"
        strokeDasharray="2 8"
      />

      {
        CROSS_POINTS.map((angle) => (
          <g key={angle} transform={`rotate(${angle} 180 180)`}>
            <path
              d="M180 33v8M176 37h8"
              stroke="var(--green, #8af7a4)"
              strokeOpacity="0.5"
            />
          </g>
        ))
      }

      <g
        className="orbit-plate__rotor"
        style={{ '--orbit-duration': '150s' } as CSSProperties}
      >
        <circle cx="180" cy="61" r="2.2" fill="var(--green, #8af7a4)" />
        <circle cx="253" cy="114" r="1.5" fill="var(--green, #8af7a4)" fillOpacity="0.6" />
      </g>

      <g
        className="orbit-plate__rotor orbit-plate__rotor--reverse"
        style={{ '--orbit-duration': '210s' } as CSSProperties}
      >
        <circle cx="180" cy="104" r="2" fill="var(--amber, #ffc46b)" />
        <circle cx="110" cy="257" r="1.4" fill="var(--amber, #ffc46b)" fillOpacity="0.6" />
      </g>

      <path
        d="M180 120l6 54 54 6-54 6-6 54-6-54-54-6 54-6 6-54Z"
        fill="var(--green, #8af7a4)"
        fillOpacity="0.08"
        stroke="var(--green, #8af7a4)"
        strokeOpacity="0.8"
      />
      <path
        d="M180 154l3.5 22.5L206 180l-22.5 3.5L180 206l-3.5-22.5L154 180l22.5-3.5L180 154Z"
        fill="var(--green, #8af7a4)"
        fillOpacity="0.2"
        stroke="var(--green, #8af7a4)"
        strokeOpacity="0.45"
      />
      <circle cx="180" cy="180" r="7.5" stroke="var(--amber, #ffc46b)" strokeOpacity="0.8" />
      <circle cx="180" cy="180" r="2.6" fill="var(--amber, #ffc46b)" />

      <circle cx="30" cy="30" r="1.2" fill="var(--green, #8af7a4)" fillOpacity="0.5" />
      <circle cx="330" cy="330" r="1.2" fill="var(--green, #8af7a4)" fillOpacity="0.5" />
    </svg>
  );
}

// Isometric "path study" from the hero: pencil variants V.01–V.09 are sketched,
// then V.04 is built and its wall rises. Pure SVG, animated by CSS in globals.css.

const ORIGIN = "M679.9 346.0 C 824.0 429.2,"

const variants = [
  { d: "1076.2 366.8, 1220.3 450.0", label: "V.01", x: 1234, y: 454 },
  { d: "1031.1 392.8, 1175.2 476.0", label: "V.02", x: 1189, y: 480 },
  { d: "986.1 418.8, 1130.2 502.0", label: "V.03", x: 1144, y: 506 },
  { d: "896.0 470.8, 1040.1 554.0", label: "V.05", x: 1054, y: 558 },
  { d: "851.0 496.8, 995.1 580.0", label: "V.06", x: 1009, y: 584 },
  { d: "806.0 522.8, 950.1 606.0", label: "V.07", x: 964, y: 610 },
  { d: "760.9 548.8, 905.0 632.0", label: "V.08", x: 919, y: 636 },
  { d: "715.9 574.8, 860.0 658.0", label: "V.09", x: 874, y: 662 },
]

const GRID =
  "M860.0 190.0 L409.7 450.0 M860.0 190.0 L1310.3 450.0 M905.0 216.0 L454.7 476.0 M815.0 216.0 L1265.3 476.0 M950.1 242.0 L499.7 502.0 M769.9 242.0 L1220.3 502.0 M995.1 268.0 L544.8 528.0 M724.9 268.0 L1175.2 528.0 M1040.1 294.0 L589.8 554.0 M679.9 294.0 L1130.2 554.0 M1085.2 320.0 L634.8 580.0 M634.8 320.0 L1085.2 580.0 M1130.2 346.0 L679.9 606.0 M589.8 346.0 L1040.1 606.0 M1175.2 372.0 L724.9 632.0 M544.8 372.0 L995.1 632.0 M1220.3 398.0 L769.9 658.0 M499.7 398.0 L950.1 658.0 M1265.3 424.0 L815.0 684.0 M454.7 424.0 L905.0 684.0 M1310.3 450.0 L860.0 710.0 M409.7 450.0 L860.0 710.0"

const delay = (i: number) => ({ animationDelay: `${(i * 0.18).toFixed(2)}s` })

type Labels = { start: string; chosen: string; built: string }

export function PathStudy({ labels, className }: { labels: Labels; className?: string }) {
  return (
    <svg viewBox="390 160 980 608" aria-hidden="true" className={className}>
      <defs>
        <pattern
          id="hatchHero"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="7" stroke="var(--paper)" strokeWidth="1.2" strokeOpacity="0.55" />
        </pattern>
      </defs>
      <path d={GRID} fill="none" stroke="var(--paper)" strokeOpacity="0.14" strokeWidth="0.8" />
      <polygon
        points="860.0,190.0 1310.3,450.0 860.0,710.0 409.7,450.0"
        fill="none"
        stroke="var(--paper)"
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
      <g fill="none" stroke="var(--paper)" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="4 6">
        <ellipse cx="679.9" cy="346.0" rx="50.9" ry="29.4" />
        <ellipse cx="679.9" cy="346.0" rx="101.9" ry="58.8" />
      </g>
      <g stroke="var(--paper)" strokeOpacity="0.8" strokeWidth="1">
        <line x1="664" y1="346" x2="696" y2="346" />
        <line x1="679.9" y1="330" x2="679.9" y2="362" />
      </g>
      <text
        x="600"
        y="316"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="1"
        fill="var(--paper)"
        fillOpacity="0.75"
        className="uppercase"
      >
        {labels.start}
      </text>

      <g fill="none" stroke="var(--paper)" strokeWidth="1.1" strokeLinecap="round">
        {variants.map((v, i) => (
          <path key={v.label} className="ps-pencil" pathLength={1} style={delay(i)} d={`${ORIGIN} ${v.d}`} />
        ))}
      </g>
      <g fill="none" stroke="var(--paper)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="0 7">
        {variants.map((v, i) => (
          <path key={v.label} className="ps-dots" style={delay(i)} d={`${ORIGIN} ${v.d}`} />
        ))}
      </g>
      <g fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1" fill="var(--paper)">
        {variants.map((v, i) => (
          <text key={v.label} className="ps-lbl" style={delay(i)} x={v.x} y={v.y}>
            {v.label}
          </text>
        ))}
      </g>

      <g className="ps-wall">
        <path
          d="M679.9 346.0 C 824.0 429.2, 941.1 444.8, 1085.2 528.0 L 1085.2 481.2 C 941.1 398.0, 824.0 382.4, 679.9 299.2 Z"
          fill="url(#hatchHero)"
        />
        <path
          d="M679.9 299.2 C 824.0 382.4, 941.1 398.0, 1085.2 481.2"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <line x1="679.9" y1="346" x2="679.9" y2="299.2" stroke="var(--paper)" strokeWidth="1.4" />
        <line x1="1085.2" y1="528" x2="1085.2" y2="481.2" stroke="var(--paper)" strokeWidth="1.4" />
      </g>
      <path
        className="ps-chosen"
        pathLength={1}
        d="M679.9 346.0 C 824.0 429.2, 941.1 444.8, 1085.2 528.0"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle className="ps-endpt" cx="1085.2" cy="481.2" r="8" fill="var(--signal)" />
      <g className="ps-lblc uppercase" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1.2">
        <text x="1102" y="478" fill="var(--signal)">
          {labels.chosen}
        </text>
        <text x="1102" y="496" fill="var(--paper)" fillOpacity="0.75">
          {labels.built}
        </text>
      </g>
    </svg>
  )
}

/** Flat fan of paths for small screens: seven considered, one chosen. */
export function PathFan({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" aria-hidden="true" className={className}>
      <g
        fill="none"
        stroke="var(--paper)"
        strokeOpacity="0.75"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeDasharray="0 2.2"
      >
        <path d="M6 30 C 36 30, 56 4, 94 4" />
        <path d="M6 30 C 36 30, 56 12, 94 12" />
        <path d="M6 30 C 36 30, 56 30, 94 30" />
        <path d="M6 30 C 36 30, 56 39, 94 39" />
        <path d="M6 30 C 36 30, 56 48, 94 48" />
        <path d="M6 30 C 36 30, 56 56, 94 56" />
      </g>
      <path
        d="M6 30 C 36 30, 56 21, 94 21"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="6" cy="30" r="1.8" fill="var(--paper)" />
      <circle cx="94" cy="21" r="2.4" fill="var(--signal)" />
    </svg>
  )
}

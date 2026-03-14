export function PaediatricEyeIllustration({ accent, muted }: { accent: string; muted: string }) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" role="img" aria-hidden="true">
      {/* Subtle dot grid */}
      {[30, 60, 90, 120, 150, 170].map(x =>
        [25, 55, 85, 115].map(y => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill={muted} opacity="0.25" />
        ))
      )}
      {/* Eye shape */}
      <path
        d="M40 70 C65 38, 135 38, 160 70 C135 102, 65 102, 40 70Z"
        fill="white"
        opacity="0.7"
        stroke={accent}
        strokeWidth="1.5"
      />
      {/* Iris */}
      <circle cx="100" cy="70" r="20" fill={accent} opacity="0.85" />
      {/* Iris ring detail */}
      <circle cx="100" cy="70" r="20" fill="none" stroke={accent} strokeWidth="2" opacity="0.4" />
      <circle cx="100" cy="70" r="15" fill="none" stroke="white" strokeWidth="0.8" opacity="0.3" />
      {/* Pupil */}
      <circle cx="100" cy="70" r="10" fill="#3D3530" />
      {/* Highlight */}
      <circle cx="106" cy="64" r="4" fill="white" opacity="0.85" />
      <circle cx="95" cy="76" r="1.5" fill="white" opacity="0.4" />
      {/* Top lashes */}
      {[-28, -16, -6, 6, 16, 28].map((offset, i) => (
        <line
          key={i}
          x1={100 + offset}
          y1={48}
          x2={100 + offset * 1.1}
          y2={38 - Math.abs(offset) * 0.2}
          stroke={accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      ))}
      {/* Bottom lashes */}
      {[-20, -8, 8, 20].map((offset, i) => (
        <line
          key={i}
          x1={100 + offset}
          y1={92}
          x2={100 + offset * 1.05}
          y2={99}
          stroke={accent}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
      ))}
      {/* Small star/sparkle accents */}
      <g opacity="0.6">
        <line x1="30" y1="42" x2="30" y2="48" stroke={muted} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="27" y1="45" x2="33" y2="45" stroke={muted} strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      <g opacity="0.4">
        <line x1="168" y1="95" x2="168" y2="101" stroke={muted} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="165" y1="98" x2="171" y2="98" stroke={muted} strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      {/* Decorative arc */}
      <path d="M20 120 Q100 105 180 120" stroke={muted} strokeWidth="1" fill="none" opacity="0.35" strokeDasharray="4 4"/>
    </svg>
  )
}

export function ForParentsIllustration({ accent, muted }: { accent: string; muted: string }) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" role="img" aria-hidden="true">
      {/* Background circles */}
      <circle cx="100" cy="70" r="55" fill={muted} opacity="0.1" />
      <circle cx="100" cy="70" r="40" fill={muted} opacity="0.1" />
      {/* Large adult hand (cupping) */}
      <path
        d="M55 95 C50 80, 48 65, 52 55 C54 50, 60 50, 62 55 L64 70
           C64 70, 65 52, 68 48 C70 44, 76 44, 77 48 L78 65
           C78 65, 79 47, 82 44 C84 41, 90 41, 90 45 L90 62
           C90 62, 91 46, 95 44 C99 42, 103 45, 102 50 L100 68
           C105 58, 112 55, 115 60 C118 65, 115 75, 110 82
           C106 88, 100 95, 95 100 C85 108, 70 108, 62 103 C58 100, 55 98, 55 95Z"
        fill="white"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.85"
      />
      {/* Small child hand resting inside */}
      <ellipse cx="85" cy="85" rx="16" ry="11" fill={muted} opacity="0.4" />
      <path
        d="M72 85 C72 79, 74 75, 77 74 C79 73, 81 74, 81 76 L81 82
           C81 82, 82 74, 84 73 C86 72, 88 73, 88 76 L88 82
           C88 82, 89 74, 91 73 C93 72, 95 74, 95 77 L94 83
           C97 78, 101 78, 101 82 C101 86, 98 89, 94 90
           C90 92, 80 92, 76 90 C73 88, 72 87, 72 85Z"
        fill="white"
        stroke={accent}
        strokeWidth="1.2"
        opacity="0.9"
      />
      {/* Heart above */}
      <path
        d="M100 38 C100 35, 96 32, 93 34 C90 36, 90 40, 93 43 L100 50 L107 43 C110 40, 110 36, 107 34 C104 32, 100 35, 100 38Z"
        fill={accent}
        opacity="0.7"
      />
      {/* Dots */}
      {[20, 40, 160, 178].map((x, i) => (
        <circle key={i} cx={x} cy={[30, 110, 28, 108][i]} r="2.5" fill={muted} opacity="0.3" />
      ))}
      <path d="M18 60 Q25 50 18 40" stroke={muted} strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="3 3"/>
      <path d="M182 60 Q175 50 182 40" stroke={muted} strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="3 3"/>
    </svg>
  )
}

export function StrabismusIllustration({ accent, muted }: { accent: string; muted: string }) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" role="img" aria-hidden="true">
      {/* Grid lines */}
      <line x1="100" y1="10" x2="100" y2="130" stroke={muted} strokeWidth="0.5" opacity="0.3" strokeDasharray="3 4"/>
      <line x1="10" y1="70" x2="190" y2="70" stroke={muted} strokeWidth="0.5" opacity="0.3" strokeDasharray="3 4"/>
      {/* Left eye — aligned */}
      <path d="M20 60 C35 42, 70 42, 80 60 C70 78, 35 78, 20 60Z" fill="white" opacity="0.8" stroke={accent} strokeWidth="1.5"/>
      <circle cx="50" cy="60" r="12" fill={accent} opacity="0.8"/>
      <circle cx="50" cy="60" r="7" fill="#3D3530"/>
      <circle cx="54" cy="56" r="2.5" fill="white" opacity="0.9"/>
      {/* Right eye — deviated (turned inward) */}
      <path d="M120 60 C135 42, 170 42, 180 60 C170 78, 135 78, 120 60Z" fill="white" opacity="0.8" stroke={accent} strokeWidth="1.5"/>
      <circle cx="162" cy="60" r="12" fill={accent} opacity="0.8"/>
      <circle cx="162" cy="60" r="7" fill="#3D3530"/>
      <circle cx="166" cy="56" r="2.5" fill="white" opacity="0.9"/>
      {/* Alignment indicator arrows */}
      <g opacity="0.7">
        {/* Left eye axis arrow */}
        <line x1="50" y1="88" x2="50" y2="100" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
        <polyline points="45,96 50,102 55,96" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Right eye axis arrow — offset to show misalignment */}
        <line x1="162" y1="88" x2="155" y2="100" stroke={muted} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2"/>
        <polyline points="149,96 154,103 160,98" stroke={muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      {/* Dashed horizontal gaze line */}
      <line x1="15" y1="60" x2="185" y2="60" stroke={muted} strokeWidth="0.8" opacity="0.2" strokeDasharray="5 4"/>
      {/* Correction arc */}
      <path d="M155 108 Q158 118 165 112" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round"/>
      {/* Small label dots */}
      <circle cx="50" cy="115" r="3" fill={accent} opacity="0.4"/>
      <circle cx="158" cy="115" r="3" fill={muted} opacity="0.4"/>
      <line x1="50" y1="115" x2="158" y2="115" stroke={muted} strokeWidth="0.8" opacity="0.25" strokeDasharray="4 3"/>
    </svg>
  )
}

export function NeuroOphthalmologyIllustration({ accent, muted }: { accent: string; muted: string }) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" role="img" aria-hidden="true">
      {/* Brain outline — simplified */}
      <path
        d="M100 25 C88 22, 74 26, 68 36 C62 46, 64 54, 60 60
           C55 68, 46 70, 46 80 C46 92, 56 98, 66 96 C70 95, 72 93, 75 94
           C78 96, 78 102, 85 104 C92 106, 100 102, 100 102
           C100 102, 108 106, 115 104 C122 102, 122 96, 125 94
           C128 93, 130 95, 134 96 C144 98, 154 92, 154 80
           C154 70, 145 68, 140 60 C136 54, 138 46, 132 36
           C126 26, 112 22, 100 25Z"
        fill="white"
        opacity="0.5"
        stroke={accent}
        strokeWidth="1.5"
      />
      {/* Brain fold lines */}
      <path d="M84 35 C82 42, 86 50, 80 56" stroke={muted} strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round"/>
      <path d="M100 30 C100 38, 96 46, 100 54 C104 62, 100 68, 100 76" stroke={muted} strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round"/>
      <path d="M116 35 C118 42, 114 50, 120 56" stroke={muted} strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round"/>
      {/* Optic nerves coming down */}
      <path d="M82 104 C80 112, 72 118, 65 122" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
      <path d="M118 104 C120 112, 128 118, 135 122" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
      {/* Optic chiasm */}
      <ellipse cx="100" cy="112" rx="12" ry="6" fill={accent} opacity="0.25"/>
      <path d="M82 104 C88 110, 112 114, 118 104" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M65 122 C78 116, 122 116, 135 122" stroke={muted} strokeWidth="1.2" fill="none" opacity="0.4" strokeDasharray="3 2"/>
      {/* Neural signal nodes */}
      {[[82,104],[118,104],[65,122],[135,122],[100,76]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill={accent} opacity="0.6"/>
      ))}
      {/* Signal pulse rings */}
      <circle cx="100" cy="76" r="8" fill="none" stroke={accent} strokeWidth="1" opacity="0.3"/>
      <circle cx="100" cy="76" r="13" fill="none" stroke={accent} strokeWidth="0.7" opacity="0.15"/>
      {/* Corner decorations */}
      <circle cx="22" cy="22" r="3" fill={muted} opacity="0.3"/>
      <circle cx="178" cy="22" r="3" fill={muted} opacity="0.3"/>
    </svg>
  )
}

export function GeneralEyeCareIllustration({ accent, muted }: { accent: string; muted: string }) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" role="img" aria-hidden="true">
      {/* Radiating lines */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const r1 = 44, r2 = 58
        return (
          <line
            key={i}
            x1={100 + r1 * Math.cos(angle)}
            y1={70 + r1 * Math.sin(angle)}
            x2={100 + r2 * Math.cos(angle)}
            y2={70 + r2 * Math.sin(angle)}
            stroke={muted}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.4"
          />
        )
      })}
      {/* Outer circle */}
      <circle cx="100" cy="70" r="42" fill="white" opacity="0.35" stroke={muted} strokeWidth="0.8"/>
      {/* Eye shape */}
      <path
        d="M36 70 C55 40, 145 40, 164 70 C145 100, 55 100, 36 70Z"
        fill="white"
        opacity="0.75"
        stroke={accent}
        strokeWidth="2"
      />
      {/* Iris */}
      <circle cx="100" cy="70" r="22" fill={accent} opacity="0.8"/>
      {/* Iris texture rings */}
      <circle cx="100" cy="70" r="22" fill="none" stroke="white" strokeWidth="0.8" opacity="0.2"/>
      <circle cx="100" cy="70" r="18" fill="none" stroke="white" strokeWidth="0.5" opacity="0.15"/>
      {/* Pupil */}
      <circle cx="100" cy="70" r="12" fill="#3D3530"/>
      {/* Highlight */}
      <circle cx="107" cy="63" r="4.5" fill="white" opacity="0.9"/>
      <circle cx="94" cy="77" r="1.8" fill="white" opacity="0.35"/>
      {/* Eyelid crease line */}
      <path d="M44 58 Q100 46 156 58" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.3" strokeLinecap="round"/>
      {/* Lashes */}
      {[-30,-18,-6,6,18,30].map((off, i) => (
        <line key={i}
          x1={100+off} y1={48}
          x2={100+off*1.15} y2={36}
          stroke={accent} strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/>
      ))}
      {/* Measurement marks around iris */}
      {[0, 90, 180, 270].map((deg, i) => {
        const a = (deg * Math.PI) / 180
        return (
          <line key={i}
            x1={100 + 24 * Math.cos(a)} y1={70 + 24 * Math.sin(a)}
            x2={100 + 28 * Math.cos(a)} y2={70 + 28 * Math.sin(a)}
            stroke={muted} strokeWidth="1" opacity="0.5"/>
        )
      })}
    </svg>
  )
}

import {
  PaediatricEyeIllustration,
  ForParentsIllustration,
  StrabismusIllustration,
  NeuroOphthalmologyIllustration,
  GeneralEyeCareIllustration,
} from './BlogIllustrations'

type Category =
  | 'paediatric-eye-health'
  | 'for-parents'
  | 'strabismus'
  | 'neuro-ophthalmology'
  | 'general-eye-care'

interface BlogPostThumbnailProps {
  category: Category
  title?: string
  className?: string
}

const categoryMeta: Record<Category, { label: string; bg: string; accent: string; muted: string }> = {
  'paediatric-eye-health': {
    label: 'Paediatric Eye Health',
    bg: 'linear-gradient(145deg, #F5EDE0 0%, #EDD8BE 60%, #E8C8A8 100%)',
    accent: '#B8753A',
    muted: '#D4A574',
  },
  'for-parents': {
    label: 'For Parents',
    bg: 'linear-gradient(145deg, #EBF0EE 0%, #D4E0DB 60%, #C4D4CE 100%)',
    accent: '#728F84',
    muted: '#96ADA3',
  },
  'strabismus': {
    label: 'Strabismus',
    bg: 'linear-gradient(145deg, #F0EDE8 0%, #E0D8D0 60%, #D4C9BE 100%)',
    accent: '#9A5E28',
    muted: '#C49870',
  },
  'neuro-ophthalmology': {
    label: 'Neuro-Ophthalmology',
    bg: 'linear-gradient(145deg, #E8EBF0 0%, #D0D8E4 60%, #C0CCDC 100%)',
    accent: '#4A6080',
    muted: '#7090B0',
  },
  'general-eye-care': {
    label: 'General Eye Care',
    bg: 'linear-gradient(145deg, #F0EEE8 0%, #E4DFD4 60%, #D8D0C4 100%)',
    accent: '#6B7B6A',
    muted: '#96A895',
  },
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function BlogPostThumbnail({ category, className = '' }: BlogPostThumbnailProps) {
  const meta = categoryMeta[category] ?? categoryMeta['general-eye-care']

  const illustrations: Record<Category, React.ReactNode> = {
    'paediatric-eye-health': <PaediatricEyeIllustration accent={meta.accent} muted={meta.muted} />,
    'for-parents': <ForParentsIllustration accent={meta.accent} muted={meta.muted} />,
    'strabismus': <StrabismusIllustration accent={meta.accent} muted={meta.muted} />,
    'neuro-ophthalmology': <NeuroOphthalmologyIllustration accent={meta.accent} muted={meta.muted} />,
    'general-eye-care': <GeneralEyeCareIllustration accent={meta.accent} muted={meta.muted} />,
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ background: meta.bg }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
          opacity: 0.6,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Illustration */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {illustrations[category]}
      </div>

      {/* Category badge — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6"
        style={{
          background: `linear-gradient(to top, ${meta.bg.includes('EBF0EE') ? 'rgba(212,224,219,0.95)' : 'rgba(237,216,190,0.85)'} 0%, transparent 100%)`,
        }}
      >
        <span
          className="inline-block text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full"
          style={{
            background: `${meta.accent}18`,
            color: meta.accent,
            border: `1px solid ${meta.accent}30`,
            fontFamily: 'var(--font-ui)',
            letterSpacing: '0.1em',
          }}
        >
          {meta.label}
        </span>
      </div>
    </div>
  )
}

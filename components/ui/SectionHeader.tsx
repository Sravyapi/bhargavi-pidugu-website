interface Props {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
}

export function SectionHeader({ label, title, subtitle, centered = false }: Props) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {label && (
        <p className={`section-label ${centered ? 'justify-center' : ''}`}>
          {label}
        </p>
      )}
      <h2 className="heading-section mb-4">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl leading-relaxed" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)', fontSize: '1rem' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

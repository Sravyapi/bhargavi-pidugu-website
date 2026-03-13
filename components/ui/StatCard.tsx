interface Props {
  value: string
  label: string
  sublabel?: string
}

export function StatCard({ value, label, sublabel }: Props) {
  return (
    <div className="text-center p-6">
      <div
        className="text-5xl font-light mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)' }}
      >
        {value}
      </div>
      <div className="font-medium text-sm mb-1" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
        {label}
      </div>
      {sublabel && (
        <div className="text-xs caption-text">
          {sublabel}
        </div>
      )}
    </div>
  )
}

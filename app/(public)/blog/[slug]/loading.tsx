export default function BlogPostLoading() {
  return (
    <div className="pt-20 animate-pulse">
      {/* Header */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(135deg, var(--warm-beige), var(--cream))' }}
      >
        <div className="container-site max-w-3xl">
          {/* Back link */}
          <div className="h-4 w-24 rounded mb-6" style={{ background: 'var(--border)' }} />

          {/* Cover image placeholder */}
          <div className="w-full h-48 sm:h-72 rounded-2xl mb-8" style={{ background: 'var(--border)' }} />

          {/* Meta row */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-3 w-28 rounded" style={{ background: 'var(--border)' }} />
            <div className="h-3 w-20 rounded" style={{ background: 'var(--border)' }} />
          </div>

          {/* Title */}
          <div className="space-y-3">
            <div className="h-8 w-full rounded" style={{ background: 'var(--border)' }} />
            <div className="h-8 w-3/4 rounded" style={{ background: 'var(--border)' }} />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-site max-w-3xl space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 rounded" style={{ background: 'var(--border)', width: i % 3 === 2 ? '60%' : '100%' }} />
          ))}
        </div>
      </section>
    </div>
  )
}

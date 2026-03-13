export default function BlogLoading() {
  return (
    <div className="section-padding container-site">
      <div className="mb-12">
        <div className="h-4 w-24 bg-[var(--warm-beige-dark)] rounded animate-pulse mb-3" />
        <div className="h-8 w-64 bg-[var(--warm-beige-dark)] rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card-warm p-6 space-y-3">
            <div className="h-40 bg-[var(--warm-beige)] rounded-lg animate-pulse" />
            <div className="h-4 bg-[var(--warm-beige-dark)] rounded animate-pulse w-3/4" />
            <div className="h-3 bg-[var(--warm-beige)] rounded animate-pulse" />
            <div className="h-3 bg-[var(--warm-beige)] rounded animate-pulse w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}

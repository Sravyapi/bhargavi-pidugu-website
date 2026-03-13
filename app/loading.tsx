export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--terracotta)] border-t-transparent animate-spin" />
        <p className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>Loading…</p>
      </div>
    </div>
  )
}

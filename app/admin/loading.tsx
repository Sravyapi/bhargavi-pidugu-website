export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-[var(--terracotta)] border-t-transparent animate-spin" />
        <p className="text-xs" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>Loading…</p>
      </div>
    </div>
  )
}

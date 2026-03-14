const SURGICAL_DATA = [
  { procedure: 'Cataract Surgery (Phacoemulsification)', volume: '1,500+', capacity: 'Independent surgeon' },
  { procedure: 'Cataract Surgery (SICS)', volume: '200+', capacity: 'Independent surgeon' },
  { procedure: 'Strabismus Surgery', volume: '150+', capacity: 'Independent surgeon' },
  { procedure: 'Paediatric Cataract Surgery', volume: 'Fellowship-level', capacity: 'Under supervision / Assisting' },
]

export function SurgicalTable() {
  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="md:hidden flex flex-col gap-3">
        {SURGICAL_DATA.map((row, i) => (
          <div
            key={i}
            className="card-warm p-4 flex flex-col gap-2"
          >
            <p className="text-sm font-medium" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
              {row.procedure}
            </p>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span
                className="font-semibold text-lg leading-none"
                style={{ fontFamily: 'var(--font-ui)', color: 'var(--terracotta)' }}
              >
                {row.volume}
              </span>
              <span className="badge-sage">{row.capacity}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block card-warm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--surface)' }}>
              <th
                className="text-left p-4 font-semibold"
                style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', borderBottom: '1px solid var(--border)' }}
              >
                Procedure
              </th>
              <th
                className="text-left p-4 font-semibold"
                style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', borderBottom: '1px solid var(--border)' }}
              >
                Volume
              </th>
              <th
                className="text-left p-4 font-semibold"
                style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', borderBottom: '1px solid var(--border)' }}
              >
                Capacity
              </th>
            </tr>
          </thead>
          <tbody>
            {SURGICAL_DATA.map((row, i) => (
              <tr
                key={i}
                style={{ borderBottom: i < SURGICAL_DATA.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <td className="p-4" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                  {row.procedure}
                </td>
                <td className="p-4">
                  <span
                    className="font-semibold"
                    style={{ fontFamily: 'var(--font-ui)', color: 'var(--terracotta)', fontSize: '1rem' }}
                  >
                    {row.volume}
                  </span>
                </td>
                <td className="p-4">
                  <span className="badge-sage">{row.capacity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

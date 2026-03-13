import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Dr. Bhargavi Pidugu — Paediatric Ophthalmologist & Strabismus Specialist, LV Prasad Eye Institute, Hyderabad'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: 'linear-gradient(145deg, #F5EDE0 0%, #EDD8BE 50%, #E8C8A8 100%)',
          padding: '72px',
          position: 'relative',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Background geometric accent */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'rgba(184,117,58,0.08)',
          transform: 'translate(30%, -30%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0, right: '72px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'rgba(184,117,58,0.06)',
          transform: 'translateY(40%)',
          display: 'flex',
        }} />

        {/* Eye icon SVG */}
        <div style={{
          position: 'absolute',
          top: '56px',
          right: '72px',
          width: '120px',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="120" height="80" viewBox="0 0 200 140" fill="none">
            <path d="M36 70 C55 40, 145 40, 164 70 C145 100, 55 100, 36 70Z" fill="white" fillOpacity="0.6" stroke="#B8753A" strokeWidth="3"/>
            <circle cx="100" cy="70" r="22" fill="#B8753A" fillOpacity="0.7"/>
            <circle cx="100" cy="70" r="13" fill="#3D3530"/>
            <circle cx="107" cy="63" r="5" fill="white" fillOpacity="0.9"/>
          </svg>
        </div>

        {/* Credential badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px',
        }}>
          <div style={{
            background: 'rgba(184,117,58,0.15)',
            border: '1px solid rgba(184,117,58,0.3)',
            borderRadius: '100px',
            padding: '6px 18px',
            fontSize: '15px',
            color: '#9A5E28',
            letterSpacing: '0.08em',
            fontFamily: 'Georgia, serif',
            display: 'flex',
          }}>
            LV PRASAD EYE INSTITUTE · HYDERABAD
          </div>
        </div>

        {/* Name */}
        <div style={{
          fontSize: '62px',
          fontWeight: '600',
          color: '#3D3530',
          lineHeight: 1.1,
          marginBottom: '16px',
          fontFamily: 'Georgia, serif',
          display: 'flex',
        }}>
          Dr. Bhargavi Pidugu
        </div>

        {/* Title */}
        <div style={{
          fontSize: '26px',
          color: '#B8753A',
          marginBottom: '32px',
          fontFamily: 'Georgia, serif',
          display: 'flex',
        }}>
          Paediatric Ophthalmologist &amp; Strabismus Specialist
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          gap: '40px',
        }}>
          {[
            { num: '1,500+', label: 'Cataract Surgeries' },
            { num: '150+', label: 'Strabismus Surgeries' },
            { num: '6+', label: 'Years Experience' },
          ].map(stat => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#B8753A', fontFamily: 'Georgia, serif', display: 'flex' }}>{stat.num}</div>
              <div style={{ fontSize: '14px', color: '#9C9088', fontFamily: 'Georgia, serif', display: 'flex' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}

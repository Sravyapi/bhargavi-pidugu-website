'use client'
import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'

// Personal photos for public gallery — SOLO photos only (GROUP_FAMILY excluded)
const GALLERY_PHOTOS = [
  { src: '/photos/personal/1.png',  alt: 'Dr. Bhargavi Pidugu', cols: 2 },   // operating theatre — landscape
  { src: '/photos/personal/4.jpeg', alt: 'Dr. Bhargavi Pidugu', cols: 2 },   // waterfront — landscape
  { src: '/photos/personal/5.jpeg', alt: 'Dr. Bhargavi Pidugu', cols: 1 },   // cafe portrait
  { src: '/photos/personal/6.jpeg', alt: 'Dr. Bhargavi Pidugu', cols: 1 },   // cafe portrait
]

export function GalleryTeaser() {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <section className="section-padding" style={{ background: 'var(--surface)' }}>
      <div className="container-site">
        <AnimatedSection>
          <SectionHeader
            label="Gallery"
            title="Moments from practice"
            subtitle="Conferences, clinical milestones, and the people along the way."
          />
        </AnimatedSection>

        {/* Masonry-style grid */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px]">
            {GALLERY_PHOTOS.map((photo, i) => (
              <button
                key={i}
                onClick={() => setLightbox(photo.src)}
                className={`relative rounded-2xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)] ${
                  photo.cols === 2 ? 'md:col-span-2' : ''
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: 'rgba(194,119,62,0.25)' }}
                >
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/>
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.9)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div
            className="relative max-w-3xl max-h-[85vh] w-full h-full"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={lightbox}
              alt="Gallery photo"
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        </div>
      )}
    </section>
  )
}

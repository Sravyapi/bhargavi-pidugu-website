# Frontend Fix Log — 2026-03-14

## Applied Fixes

### FIX 1 — `use client` directives
- `GalleryTeaser.tsx`: already had `'use client'` — no change needed.
- `BlogEditor.tsx`: already had `'use client'` — no change needed.

### FIX 2 — BookingFlow critical bugs
- **Bug A**: Changed POST URL from `/api/appointments` to `/api/book`.
- **Bug B**: Rewrote the patient form schema to match `BookingStep3Schema` (`patient_dob`, `relation_to_patient`, `contact_email`, `contact_phone`, `whatsapp_preferred`, `concern_type`, `concern_description`, optional fields). Server expects `FormData` (not JSON) — `confirmBooking` now builds a `FormData` object with all fields including `slot_datetime` as ISO 8601 with IST offset.
- **Bug C (BlogEditor)**: Fixed slug `onChange` handler by extracting `{ onChange: onSlugChange, ...slugRest }` from `register('slug')` and wiring them separately to avoid calling `register()` twice in render.

### FIX 3 — Error boundaries created
- `app/error.tsx`
- `app/admin/error.tsx`
- `app/blog/error.tsx`

### FIX 4 — Loading skeletons created
- `app/loading.tsx`
- `app/admin/loading.tsx`
- `app/blog/loading.tsx`
- `app/book/loading.tsx`

### FIX 5 — `generateMetadata` in `/blog/[slug]/page.tsx`
- Already existed; updated to Next.js 15 async params pattern (`params: Promise<{ slug: string }>`).
- Added `openGraph` with `cover_image_url` support.
- Updated default export `BlogPostPage` to also await params.

## Skipped / Notes
- No TypeScript errors introduced (`npx tsc --noEmit` passed cleanly).

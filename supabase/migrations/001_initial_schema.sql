-- ============================================================
-- SITE CONTENT (key-value store for admin-editable content)
-- ============================================================
CREATE TABLE IF NOT EXISTS site_content (
  key         TEXT PRIMARY KEY,
  value       TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- FAQ ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS faq_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- GALLERY IMAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url             TEXT NOT NULL,
  storage_path    TEXT NOT NULL,
  has_consent_tag BOOLEAN DEFAULT FALSE,
  order_index     INTEGER NOT NULL DEFAULT 0,
  uploaded_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BLOG POSTS
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT NOT NULL,
  slug             TEXT UNIQUE NOT NULL,
  excerpt          TEXT,
  body             TEXT,
  cover_image_url  TEXT,
  category         TEXT CHECK (category IN (
                     'paediatric-eye-health',
                     'for-parents',
                     'strabismus',
                     'neuro-ophthalmology',
                     'general-eye-care'
                   )),
  status           TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  meta_title       TEXT,
  meta_description TEXT,
  reading_time_minutes INTEGER,
  published_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- ============================================================
-- AVAILABILITY SCHEDULE (weekly template)
-- ============================================================
CREATE TABLE IF NOT EXISTS availability_schedule (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week  INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  is_active    BOOLEAN DEFAULT FALSE,
  start_time   TIME,
  end_time     TIME,
  lunch_start  TIME,
  lunch_end    TIME,
  UNIQUE (day_of_week)
);

-- ============================================================
-- BLOCKED DATES
-- ============================================================
CREATE TABLE IF NOT EXISTS blocked_dates (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date       DATE NOT NULL UNIQUE,
  reason     TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blocked_dates_date ON blocked_dates(date);

-- ============================================================
-- APPOINTMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS appointments (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name              TEXT NOT NULL,
  patient_dob               DATE NOT NULL,
  relation_to_patient       TEXT NOT NULL,
  contact_email             TEXT NOT NULL,
  contact_phone             TEXT NOT NULL,
  whatsapp_preferred        BOOLEAN DEFAULT FALSE,
  concern_type              TEXT NOT NULL,
  concern_description       TEXT NOT NULL,
  previous_diagnosis        TEXT,
  current_prescription      TEXT,
  previous_surgeries        BOOLEAN,
  surgery_details           TEXT,
  report_urls               JSONB DEFAULT '[]',
  slot_datetime             TIMESTAMPTZ NOT NULL,
  duration_minutes          INTEGER NOT NULL DEFAULT 30,
  appointment_type          TEXT DEFAULT 'online_video',
  google_calendar_event_id  TEXT,
  google_meet_link          TEXT,
  status                    TEXT DEFAULT 'pending' CHECK (status IN (
                              'pending', 'confirmed', 'completed', 'no_show', 'cancelled'
                            )),
  admin_notes               TEXT,
  confirmation_email_sent   BOOLEAN DEFAULT FALSE,
  cancellation_email_sent   BOOLEAN DEFAULT FALSE,
  created_at                TIMESTAMPTZ DEFAULT NOW(),
  updated_at                TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_appointments_slot_datetime ON appointments(slot_datetime);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_contact_email ON appointments(contact_email);

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  phone         TEXT NOT NULL,
  email         TEXT NOT NULL,
  reason        TEXT NOT NULL,
  is_read       BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);

-- ============================================================
-- WAITLIST
-- ============================================================
CREATE TABLE IF NOT EXISTS waitlist (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL UNIQUE,
  notified_at  TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- GOOGLE TOKENS (single row for admin's calendar)
-- ============================================================
CREATE TABLE IF NOT EXISTS google_tokens (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token  TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expiry        TIMESTAMPTZ NOT NULL,
  calendar_id   TEXT DEFAULT 'primary',
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can read active FAQ items"
  ON faq_items FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can read gallery images"
  ON gallery_images FOR SELECT USING (true);

CREATE POLICY "Public can read site content"
  ON site_content FOR SELECT USING (true);

CREATE POLICY "Public can read availability schedule"
  ON availability_schedule FOR SELECT USING (true);

CREATE POLICY "Public can read blocked dates"
  ON blocked_dates FOR SELECT USING (true);

-- Authenticated (admin) full access
CREATE POLICY "Authenticated full access to blog_posts"
  ON blog_posts FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access to faq_items"
  ON faq_items FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access to appointments"
  ON appointments FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access to contact_messages"
  ON contact_messages FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access to waitlist"
  ON waitlist FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access to google_tokens"
  ON google_tokens FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access to site_content"
  ON site_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access to availability_schedule"
  ON availability_schedule FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access to blocked_dates"
  ON blocked_dates FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access to gallery_images"
  ON gallery_images FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA
-- ============================================================
INSERT INTO availability_schedule (day_of_week, is_active) VALUES
  (0, false), (1, false), (2, false), (3, false),
  (4, false), (5, false), (6, false)
ON CONFLICT (day_of_week) DO NOTHING;

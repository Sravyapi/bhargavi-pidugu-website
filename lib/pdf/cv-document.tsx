import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer'

// ============================================================
// CV DATA (hardcoded from Bhargavi_Pidugu_CV.md)
// ============================================================
const CV_DATA = {
  name: 'Dr. Bhargavi Pidugu',
  credentials: 'MS (Ophthalmology) · MBBS',
  phone: '+91 96186 89030',
  email: 'dr.bhargavipidugu@gmail.com',
  location: 'Hyderabad, Telangana',
  summary:
    'Subspecialty-trained ophthalmologist in paediatric ophthalmology, neuro-ophthalmology, and strabismus, completing a three-year fellowship at LV Prasad Eye Institute — Asia\'s foremost tertiary eye care centre. Independent surgical record of 1,500+ cataract and 150+ strabismus procedures, with over six years of clinical experience across high-volume hospital and corporate settings. Oral presenter at APAO Hong Kong 2026; active contributor to national and international academic forums. Seeking a senior clinical role in a corporate eye hospital where subspecialty depth and surgical volume translate directly into patient outcomes.',
  surgicalExperience: [
    { procedure: 'Cataract Surgery (SICS & Phacoemulsification)', volume: '~1,500', capacity: 'Independent' },
    { procedure: 'Strabismus Surgery', volume: '~150', capacity: 'Independent' },
    { procedure: 'Paediatric Cataract Surgery', volume: '~50', capacity: 'Independent' },
    { procedure: 'Strabismus Surgery (assisted)', volume: '~800', capacity: 'Assisted' },
  ],
  clinicalExperience: [
    {
      role: 'Fellow — Paediatric Ophthalmology, Neuro-Ophthalmology & Strabismus',
      institution: 'LV Prasad Eye Institute (Kallam Anji Reddy Campus), Banjara Hills, Hyderabad',
      dates: 'July 2023 – June 2026 (ongoing)',
      bullets: [
        'Managed a high-volume subspecialty caseload spanning the full spectrum of paediatric eye disease, complex ocular motility disorders, and neuro-ophthalmic conditions under two of India\'s foremost subspecialists.',
        'Performed independent strabismus surgeries and paediatric cataract extractions; contributed to surgical planning and postoperative management for complex cases.',
        'Presented original clinical work at six national and international conferences over three years, including two oral presentations at APAO Hong Kong 2026.',
      ],
    },
    {
      role: 'Consultant Ophthalmologist',
      institution: 'Solis Eye Care Hospitals, Secunderabad',
      dates: 'Feb 2023 – June 2023',
      bullets: [
        'Ran independent general ophthalmology OPDs covering refraction, anterior and posterior segment evaluation, and routine surgical caseload.',
      ],
    },
    {
      role: 'Consultant Ophthalmologist',
      institution: 'Prema Eye Care Centre, Secunderabad',
      dates: 'June 2022 – Jan 2023',
      bullets: [],
    },
    {
      role: 'Consultant Ophthalmologist',
      institution: 'Vasan Eye Care, A S Rao Nagar, Secunderabad',
      dates: 'July 2019 – Dec 2020',
      bullets: [
        'Practised within a high-volume corporate eye care chain; managed general OPD, surgical assistance, and postoperative follow-up across a broad general ophthalmology caseload.',
      ],
    },
    {
      role: 'Career Break',
      institution: '',
      dates: 'Jan 2021 – May 2022',
      bullets: ['Maternity leave and early childcare.'],
    },
    {
      role: 'Junior Resident in Ophthalmology',
      institution: 'Regional Eye Hospital, Kakatiya Medical College, Warangal',
      dates: 'June 2016 – May 2019',
      bullets: [
        'Three-year residency covering outpatient clinics, ophthalmic emergency care, and operative training in SICS, phacoemulsification, and strabismus surgery.',
        'Conducted and published original research on posterior capsular opacity outcomes following cataract surgery.',
      ],
    },
  ],
  conferences: {
    international: [
      {
        role: 'Oral Presenter',
        event: '41st Asia-Pacific Academy of Ophthalmology (APAO) Congress, Hong Kong',
        year: 'Feb 2026',
        presentations: [
          'Unveiling Cerebrotendinous Xanthomatosis Through the Eye – Clinical and Genetic Insights',
          'Genetic Landscape of Ectopia Lentis Over Three Years in a Single Tertiary Eye Care Centre',
        ],
      },
      {
        role: 'Poster Presenter',
        event: '40th APAO Congress & 83rd AIOS Annual Conference, New Delhi',
        year: '2025',
        presentations: [
          'A Rare Case of Cyclic Esotropia – Presentation and Management (E-Poster)',
          'Unilateral Acquired Brown\'s Syndrome of Inflammatory Origin – Presentation and Management (Physical Poster)',
        ],
      },
    ],
    national: [
      {
        role: 'Grand Rounds Presenter',
        event: '7th POSN, Dr. Shroff\'s Charity Eye Hospital, New Delhi',
        year: '2025',
        presentations: [
          'Genetic Landscape of Ectopia Lentis Over Two Years in a Single Tertiary Eye Care Centre',
        ],
      },
      {
        role: 'Presenter',
        event: '6th Paediatric Ophthalmology & Strabismus Network (POSN), Bengaluru',
        year: 'Sept 2024',
        presentations: [
          'Achiasma Revealed by Congenital Nystagmus and MRI Imaging',
          'Oculomotor Abnormalities and Surgical Outcome of Acquired Esotropia in Type 3 Gaucher\'s Disease',
        ],
      },
    ],
    state: [
      {
        role: 'E-Poster Presenter',
        event: '9th TOSCON (Telangana Ophthalmological Society Annual Conference), Hyderabad',
        year: 'July 2024',
        presentations: [
          'A Rare Case of Strabismus – Cyclic Esotropia – Presentation and Management',
        ],
      },
      {
        role: 'Award Paper Presenter',
        event: 'Telangana State Ophthalmology Conference',
        year: '2018',
        presentations: [
          'Incidence of Work-Disabling Decreased Vision with Posterior Capsular Opacity Following Small-Incision Cataract Surgery with Rigid PMMA IOL at REH, Warangal',
        ],
      },
      {
        role: 'Poster Presenter',
        event: 'State Ophthalmology Conference',
        year: '2018',
        presentations: ['Case Report of Atypical Retinitis Pigmentosa'],
      },
    ],
  },
  publication: {
    citation:
      'Kumar GRB, Manasa B, Bhargavi P. Incidence of work-disabling decreased vision with posterior capsular opacity (PCO) following small-incision cataract surgery with rigid PMMA IOL. Journal of Evolution of Medical and Dental Sciences. 2018;7(42):4580–4583.',
    doi: '10.14260/jemds/2018/1021',
    boldName: 'Bhargavi P.',
  },
  education: [
    {
      degree: 'MS Ophthalmology',
      institution: 'Regional Eye Hospital, Kakatiya Medical College, Warangal',
      years: '2016 – 2019',
    },
    {
      degree: 'MBBS',
      institution: 'Bhaskara Medical College, Hyderabad',
      years: '2008 – 2014',
    },
  ],
}

// ============================================================
// STYLES
// ============================================================
const colors = {
  primary: '#C4754A',
  text: '#2D2420',
  textBody: '#3D3530',
  textMuted: '#7A6E68',
  surface: '#F0EAE0',
  surfaceLight: '#FAF7F2',
  border: '#E2D9CF',
  ochre: '#C9973A',
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: colors.textBody,
    paddingTop: 40,
    paddingBottom: 50,
    paddingHorizontal: 40,
    backgroundColor: '#ffffff',
  },
  // Header
  headerName: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: colors.text,
    marginBottom: 3,
  },
  headerCredentials: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 8,
  },
  headerRule: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    marginBottom: 8,
  },
  headerContact: {
    fontSize: 10,
    color: colors.textMuted,
    marginBottom: 20,
  },
  // Section
  sectionHeading: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
    marginTop: 16,
  },
  sectionRule: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
    marginBottom: 8,
  },
  // Body text
  bodyText: {
    fontSize: 10,
    color: colors.textBody,
    lineHeight: 1.6,
    marginBottom: 6,
  },
  // Table
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
  },
  tableRowAlt: {
    backgroundColor: colors.surfaceLight,
  },
  tableColProcedure: { flex: 3 },
  tableColVolume: { flex: 1, textAlign: 'center' },
  tableColCapacity: { flex: 1, textAlign: 'center' },
  tableHeaderText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.text,
    textTransform: 'uppercase',
  },
  tableText: {
    fontSize: 10,
    color: colors.textBody,
  },
  // Clinical experience
  roleText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.text,
    marginBottom: 2,
  },
  institutionText: {
    fontSize: 10,
    color: colors.textMuted,
    marginBottom: 1,
  },
  datesText: {
    fontSize: 9,
    color: colors.textMuted,
    fontFamily: 'Helvetica-Oblique',
    marginBottom: 4,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 8,
  },
  bulletDot: {
    fontSize: 10,
    color: colors.primary,
    marginRight: 6,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: colors.textBody,
    lineHeight: 1.5,
  },
  // Conference badge
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: 6,
    alignSelf: 'flex-start',
  },
  badgeOral: {
    backgroundColor: colors.primary,
  },
  badgePoster: {
    backgroundColor: '#7A8C6A',
  },
  badgeText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerRule: {
    borderTopWidth: 0.5,
    borderTopColor: colors.primary,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 8,
    color: colors.textMuted,
  },
  experienceBlock: {
    marginBottom: 10,
  },
  conferenceBlock: {
    marginBottom: 10,
  },
  educationBlock: {
    marginBottom: 8,
  },
})

// ============================================================
// COMPONENTS
// ============================================================
function SectionHeading({ title }: { title: string }) {
  return (
    <View>
      <Text style={styles.sectionHeading}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  )
}

function ConferenceBadge({ role }: { role: string }) {
  const isOral = role.toLowerCase().includes('oral') || role.toLowerCase().includes('award')
  return (
    <View style={[styles.badge, isOral ? styles.badgeOral : styles.badgePoster]}>
      <Text style={styles.badgeText}>{role}</Text>
    </View>
  )
}

// ============================================================
// MAIN DOCUMENT
// ============================================================
export function CVDocument() {
  return (
    <Document
      title="Bhargavi Pidugu CV"
      author="Dr. Bhargavi Pidugu"
      subject="Curriculum Vitae"
    >
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <Text style={styles.headerName}>{CV_DATA.name}</Text>
        <Text style={styles.headerCredentials}>{CV_DATA.credentials}</Text>
        <View style={styles.headerRule} />
        <Text style={styles.headerContact}>
          {CV_DATA.email} · {CV_DATA.phone} · {CV_DATA.location}
        </Text>

        {/* PROFESSIONAL SUMMARY */}
        <SectionHeading title="Professional Summary" />
        <Text style={styles.bodyText}>{CV_DATA.summary}</Text>

        {/* SURGICAL EXPERIENCE */}
        <SectionHeading title="Surgical Experience" />
        <View style={styles.tableHeader}>
          <View style={styles.tableColProcedure}>
            <Text style={styles.tableHeaderText}>Procedure</Text>
          </View>
          <View style={styles.tableColVolume}>
            <Text style={styles.tableHeaderText}>Volume</Text>
          </View>
          <View style={styles.tableColCapacity}>
            <Text style={styles.tableHeaderText}>Capacity</Text>
          </View>
        </View>
        {CV_DATA.surgicalExperience.map((row, i) => (
          <View key={i} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
            <View style={styles.tableColProcedure}>
              <Text style={styles.tableText}>{row.procedure}</Text>
            </View>
            <View style={styles.tableColVolume}>
              <Text style={styles.tableText}>{row.volume}</Text>
            </View>
            <View style={styles.tableColCapacity}>
              <Text style={styles.tableText}>{row.capacity}</Text>
            </View>
          </View>
        ))}

        {/* CLINICAL EXPERIENCE */}
        <SectionHeading title="Clinical Experience" />
        {CV_DATA.clinicalExperience.map((exp, i) => (
          <View key={i} style={styles.experienceBlock}>
            <Text style={styles.roleText}>{exp.role}</Text>
            {exp.institution ? (
              <Text style={styles.institutionText}>{exp.institution}</Text>
            ) : null}
            <Text style={styles.datesText}>{exp.dates}</Text>
            {exp.bullets.map((bullet, j) => (
              <View key={j} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* ACADEMIC PRESENTATIONS */}
        <SectionHeading title="Academic Presentations & Conferences" />

        <Text style={[styles.bodyText, { fontFamily: 'Helvetica-Bold', color: colors.textMuted, fontSize: 9, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }]}>
          International
        </Text>
        {CV_DATA.conferences.international.map((conf, i) => (
          <View key={i} style={styles.conferenceBlock}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 3 }}>
              <ConferenceBadge role={conf.role} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.bodyText, { fontFamily: 'Helvetica-Bold', marginBottom: 1 }]}>
                  {conf.event}
                </Text>
                <Text style={styles.datesText}>{conf.year}</Text>
              </View>
            </View>
            {conf.presentations.map((p, j) => (
              <View key={j} style={styles.bullet}>
                <Text style={styles.bulletDot}>–</Text>
                <Text style={[styles.bulletText, { fontFamily: 'Helvetica-Oblique' }]}>{p}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={[styles.bodyText, { fontFamily: 'Helvetica-Bold', color: colors.textMuted, fontSize: 9, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }]}>
          National
        </Text>
        {CV_DATA.conferences.national.map((conf, i) => (
          <View key={i} style={styles.conferenceBlock}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 3 }}>
              <ConferenceBadge role={conf.role} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.bodyText, { fontFamily: 'Helvetica-Bold', marginBottom: 1 }]}>
                  {conf.event}
                </Text>
                <Text style={styles.datesText}>{conf.year}</Text>
              </View>
            </View>
            {conf.presentations.map((p, j) => (
              <View key={j} style={styles.bullet}>
                <Text style={styles.bulletDot}>–</Text>
                <Text style={[styles.bulletText, { fontFamily: 'Helvetica-Oblique' }]}>{p}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={[styles.bodyText, { fontFamily: 'Helvetica-Bold', color: colors.textMuted, fontSize: 9, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }]}>
          State
        </Text>
        {CV_DATA.conferences.state.map((conf, i) => (
          <View key={i} style={styles.conferenceBlock}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 3 }}>
              <ConferenceBadge role={conf.role} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.bodyText, { fontFamily: 'Helvetica-Bold', marginBottom: 1 }]}>
                  {conf.event}
                </Text>
                <Text style={styles.datesText}>{conf.year}</Text>
              </View>
            </View>
            {conf.presentations.map((p, j) => (
              <View key={j} style={styles.bullet}>
                <Text style={styles.bulletDot}>–</Text>
                <Text style={[styles.bulletText, { fontFamily: 'Helvetica-Oblique' }]}>{p}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* RESEARCH & PUBLICATIONS */}
        <SectionHeading title="Research & Publications" />
        <Text style={styles.bodyText}>
          Kumar GRB, Manasa B, <Text style={{ fontFamily: 'Helvetica-Bold' }}>Bhargavi P.</Text> Incidence of work-disabling decreased vision with posterior capsular opacity (PCO) following small-incision cataract surgery with rigid PMMA IOL. <Text style={{ fontFamily: 'Helvetica-Oblique' }}>Journal of Evolution of Medical and Dental Sciences.</Text> 2018;7(42):4580–4583.{' '}
          <Text style={{ color: colors.primary, fontSize: 9 }}>DOI: {CV_DATA.publication.doi}</Text>
        </Text>

        {/* EDUCATION */}
        <SectionHeading title="Education" />
        {CV_DATA.education.map((edu, i) => (
          <View key={i} style={styles.educationBlock}>
            <Text style={styles.roleText}>{edu.degree}</Text>
            <Text style={styles.institutionText}>{edu.institution}</Text>
            <Text style={styles.datesText}>{edu.years}</Text>
          </View>
        ))}

        {/* FOOTER */}
        <View style={styles.footer} fixed>
          <View style={{ flex: 1 }}>
            <View style={styles.footerRule} />
            <Text style={styles.footerText}>Dr. Bhargavi Pidugu · Curriculum Vitae</Text>
          </View>
          <Text style={[styles.footerText, { marginLeft: 16 }]} render={({ pageNumber, totalPages }) => `${pageNumber} of ${totalPages}`} fixed />
        </View>
      </Page>
    </Document>
  )
}

export async function generateCVPdf(): Promise<Buffer> {
  const buffer = await renderToBuffer(<CVDocument />)
  return Buffer.from(buffer)
}

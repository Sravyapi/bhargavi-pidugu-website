import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer'
import { CV_DATA } from './cv-data'

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

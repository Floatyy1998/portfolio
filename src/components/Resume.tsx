import { useLanguage } from '../context/LanguageContext'
import profileImage from '../assets/Profilbild.jpg'

const de = {
  role: 'Webentwickler',
  contact: 'Kontakt',
  skills: 'Kenntnisse',
  experience: 'Berufserfahrung',
  education: 'Bildung',
  languages: 'Sprachen',
  interests: 'Interessen',
  personal: 'Persönliches',
  born: 'Geb. 20.06.1998 in Coburg',
  german: 'Deutsch',
  germanLevel: 'Muttersprache',
  english: 'Englisch',
  englishLevel: 'Fließend',
  current: 'Aktuell',
  jobs: [
    {
      title: 'Webentwickler',
      company: 'HUK-COBURG',
      location: 'Coburg',
      date: 'Juli 2025 — heute',
      current: true,
      tasks: [
        'Frontend-Entwicklung mit Angular und TypeScript',
        'Entwicklung und Optimierung der Tarifrechner für HUK-COBURG, HUK24 und VRK',
        'Komponentenbasierte Entwicklung mit responsivem Webdesign',
        'CI/CD mit Jenkins, Deployment auf AWS',
        'Performance-Optimierung und Implementierung neuer Features',
      ],
    },
    {
      title: 'Praktikum Softwareentwicklung',
      company: 'KAPP GmbH & Co. KG (KAPP NILES)',
      location: 'Coburg',
      date: 'Apr. 2020 — Jul. 2020',
      current: false,
      tasks: [
        'Entwicklung einer Webanwendung zur Kommissionierungsübersicht',
        'Frontend mit HTML, CSS, JavaScript',
        'Backend mit MongoDB',
      ],
    },
    {
      title: 'Praktikum',
      company: 'HABA',
      location: 'Bad Rodach',
      date: 'Okt. 2013',
      current: false,
      tasks: ['Erste Einblicke in die Softwareentwicklung', 'Grundlagen der Programmierung mit Java'],
    },
  ],
  edu: [
    {
      title: 'Fachinformatiker Anwendungsentwicklung',
      place: 'HUK-COBURG',
      location: 'Coburg',
      date: 'Sept. 2022 — Juni 2025',
      tasks: [
        'Entwicklung der Tarifrechner für HUK-COBURG, HUK24 und VRK mit Angular',
        'Arbeiten mit TypeScript und komponentenbasierter Architektur',
        'CI/CD mit Jenkins, Cloud-Infrastruktur mit AWS',
      ],
    },
    {
      title: 'Studium Informatik',
      place: 'Hochschule Coburg',
      location: 'Coburg',
      date: 'Okt. 2016 — Feb. 2020',
      tasks: [],
    },
    {
      title: 'Allgemeine Hochschulreife (Abitur)',
      place: 'Gymnasium Ernestinum',
      location: 'Coburg',
      date: '2008 — 2016',
      tasks: [],
    },
  ],
  projects: 'Projekte',
}

const en = {
  role: 'Web Developer',
  contact: 'Contact',
  skills: 'Skills',
  experience: 'Experience',
  education: 'Education',
  languages: 'Languages',
  interests: 'Interests',
  personal: 'Personal',
  born: 'Born June 20, 1998 in Coburg, Germany',
  german: 'German',
  germanLevel: 'Native',
  english: 'English',
  englishLevel: 'Fluent',
  current: 'Current',
  jobs: [
    {
      title: 'Web Developer',
      company: 'HUK-COBURG',
      location: 'Coburg, Germany',
      date: 'July 2025 — Present',
      current: true,
      tasks: [
        'Frontend development with Angular and TypeScript',
        'Development and optimization of tariff calculators for HUK-COBURG, HUK24 and VRK',
        'Component-based development with responsive web design',
        'CI/CD with Jenkins, deployment on AWS',
        'Performance optimization and implementation of new features',
      ],
    },
    {
      title: 'Software Development Internship',
      company: 'KAPP GmbH & Co. KG (KAPP NILES)',
      location: 'Coburg, Germany',
      date: 'Apr. 2020 — Jul. 2020',
      current: false,
      tasks: [
        'Development of a web application for order picking overview',
        'Frontend with HTML, CSS, JavaScript',
        'Backend with MongoDB',
      ],
    },
    {
      title: 'Internship',
      company: 'HABA',
      location: 'Bad Rodach, Germany',
      date: 'Oct. 2013',
      current: false,
      tasks: ['First insights into software development', 'Fundamentals of programming with Java'],
    },
  ],
  edu: [
    {
      title: 'IT Specialist for Application Development',
      place: 'HUK-COBURG',
      location: 'Coburg, Germany',
      date: 'Sept. 2022 — June 2025',
      tasks: [
        'Development of tariff calculators for HUK-COBURG, HUK24 and VRK with Angular',
        'Working with TypeScript and component-based architecture',
        'CI/CD with Jenkins, cloud infrastructure with AWS',
      ],
    },
    {
      title: 'Computer Science (University)',
      place: 'Hochschule Coburg',
      location: 'Coburg, Germany',
      date: 'Oct. 2016 — Feb. 2020',
      tasks: [],
    },
    {
      title: 'Abitur (A-Levels)',
      place: 'Gymnasium Ernestinum',
      location: 'Coburg, Germany',
      date: '2008 — 2016',
      tasks: [],
    },
  ],
  projects: 'Projects',
}

const projectList = [
  { title: 'Series Ranking Website', url: 'tv-rank.de', tech: 'React, Node.js, Firebase, TypeScript' },
  { title: 'WatchRadar', url: 'watchradar.konrad-dinges.de', tech: 'React, Node.js, Firebase, Tailwind CSS' },
  { title: 'Classpulse', url: '', tech: 'React, ASP.NET Core, MariaDB' },
  { title: 'Portfolio (KD OS)', url: 'konrad-dinges.de', tech: 'React 19, TypeScript, Framer Motion' },
]

const skillGroups = [
  {
    label: 'Frontend',
    main: ['React', 'Angular', 'TypeScript'],
    rest: ['JavaScript', 'Vue.js', 'Next.js', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    label: 'Backend',
    main: ['Node.js'],
    rest: ['Java', 'Kotlin', 'ASP.NET Core', 'Python', 'MongoDB', 'PostgreSQL', 'Firebase'],
  },
  { label: 'DevOps & Tools', main: ['Git'], rest: ['Docker', 'AWS', 'Jenkins', 'Figma', 'Vite'] },
]

export function Resume() {
  const { lang } = useLanguage()
  const t = lang === 'de' ? de : en

  return (
    <div style={{ background: '#f0f0f5', minHeight: '100vh', padding: '20px 0' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @page { size: A4; margin: 0; }
        @media print { body { background: white !important; } .page { margin: 0 !important; box-shadow: none !important; } .no-print { display: none !important; } }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      `}</style>

      <div className="no-print" style={{ textAlign: 'center', marginBottom: 16 }}>
        <a
          href="/"
          style={{ color: '#00b8d4', fontSize: 13, textDecoration: 'none' }}
          onClick={e => {
            if (window.opener || window.history.length <= 1) {
              e.preventDefault()
              window.close()
            }
          }}
        >
          ← Back to KD OS
        </a>
        <span style={{ margin: '0 12px', color: '#999' }}>|</span>
        <button
          onClick={() => window.print()}
          style={{
            background: '#00b8d4',
            color: '#fff',
            border: 'none',
            padding: '6px 16px',
            borderRadius: 6,
            fontSize: 13,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {lang === 'de' ? 'Als PDF drucken' : 'Print as PDF'}
        </button>
      </div>

      <div
        className="page"
        style={{
          width: '210mm',
          minHeight: '297mm',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '72mm 1fr',
          background: '#fff',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        }}
      >
        <div style={{ background: '#0a0a1a', color: '#e0e0ef', padding: '36px 22px' }}>
          <img
            src={profileImage}
            alt="Konrad Dinges"
            style={{
              width: 110,
              height: 110,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #00e5ff',
              display: 'block',
              margin: '0 auto 16px',
            }}
          />
          <h1 style={{ fontSize: 17, fontWeight: 700, textAlign: 'center', color: '#fff', marginBottom: 3 }}>
            Konrad Dinges
          </h1>
          <div
            style={{
              textAlign: 'center',
              fontSize: 11,
              color: '#00e5ff',
              fontWeight: 500,
              marginBottom: 24,
              letterSpacing: 0.5,
            }}
          >
            {t.role}
          </div>

          <Section title={t.contact} color="#00e5ff">
            <InfoLine text="mail@konrad-dinges.de" />
            <InfoLine text="0176 62335561" />
            <InfoLine text="Veilsdorfer Str. 12, 96484 Meeder" />
            <InfoLine text="konrad-dinges.de" />
            <InfoLine text="github.com/Floatyy1998" />
            <InfoLine text="linkedin.com/in/konrad-dinges-803098296" />
          </Section>

          <Section title={t.skills} color="#00e5ff">
            {skillGroups.map(g => (
              <div key={g.label} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: '#aaa',
                    textTransform: 'uppercase',
                    letterSpacing: 0.8,
                    marginBottom: 5,
                  }}
                >
                  {g.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {g.main.map(s => (
                    <span
                      key={s}
                      style={{
                        fontSize: 9,
                        padding: '3px 7px',
                        borderRadius: 4,
                        background: 'rgba(0,229,255,0.12)',
                        color: '#00e5ff',
                        fontWeight: 500,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                  {g.rest.map(s => (
                    <span
                      key={s}
                      style={{
                        fontSize: 9,
                        padding: '3px 7px',
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.06)',
                        color: '#d0d0e0',
                        fontWeight: 500,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Section>

          <Section title={t.languages} color="#00e5ff">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 3 }}>
              <span>{t.german}</span>
              <span style={{ color: '#888', fontSize: 9 }}>{t.germanLevel}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
              <span>{t.english}</span>
              <span style={{ color: '#888', fontSize: 9 }}>{t.englishLevel}</span>
            </div>
          </Section>

          <Section title={t.interests} color="#00e5ff">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {['Tischtennis', 'Tennis', lang === 'de' ? 'Programmieren' : 'Programming'].map(h => (
                <span
                  key={h}
                  style={{
                    fontSize: 9,
                    padding: '3px 7px',
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.06)',
                    color: '#c0c0d0',
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
          </Section>

          <Section title={t.personal} color="#00e5ff">
            <div style={{ fontSize: 10, color: '#c0c0d0' }}>{t.born}</div>
          </Section>
        </div>

        <div style={{ padding: '36px 28px' }}>
          <MainSection title={t.experience}>
            {t.jobs.map((j, i) => (
              <TimelineItem
                key={i}
                title={j.title}
                subtitle={j.company}
                location={j.location}
                date={j.date}
                current={j.current}
                currentLabel={t.current}
                tasks={j.tasks}
                last={i === t.jobs.length - 1}
              />
            ))}
          </MainSection>

          <MainSection title={t.education}>
            {t.edu.map((e2, i) => (
              <TimelineItem
                key={i}
                title={e2.title}
                subtitle={e2.place}
                location={e2.location}
                date={e2.date}
                tasks={e2.tasks}
                last={i === t.edu.length - 1}
              />
            ))}
          </MainSection>

          <MainSection title={t.projects}>
            {projectList.map((p, i) => (
              <div
                key={i}
                style={{ paddingLeft: 14, paddingBottom: 12, borderLeft: '2px solid #e0e0e8', position: 'relative' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: -5,
                    top: 4,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#ccc',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#1a1a2e' }}>{p.title}</span>
                  {p.url && <span style={{ fontSize: 9, color: '#888' }}>{p.url}</span>}
                </div>
                <div style={{ fontSize: 10, color: '#555' }}>{p.tech}</div>
              </div>
            ))}
          </MainSection>
        </div>
      </div>
    </div>
  )
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          color,
          marginBottom: 10,
          paddingBottom: 5,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

function InfoLine({ text }: { text: string }) {
  return (
    <div style={{ fontSize: 10, color: '#c0c0d0', marginBottom: 5, lineHeight: 1.4, wordBreak: 'break-all' }}>
      {text}
    </div>
  )
}

function MainSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2
        style={{
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          color: '#0a0a1a',
          marginBottom: 14,
          paddingBottom: 5,
          borderBottom: '2px solid #00e5ff',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

function TimelineItem({
  title,
  subtitle,
  location,
  date,
  current,
  currentLabel,
  tasks,
  last,
}: {
  title: string
  subtitle: string
  location: string
  date: string
  current?: boolean
  currentLabel?: string
  tasks: string[]
  last?: boolean
}) {
  return (
    <div
      style={{
        position: 'relative',
        paddingLeft: 14,
        paddingBottom: last ? 0 : 16,
        borderLeft: last ? 'none' : '2px solid #e0e0e8',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: -5,
          top: 4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: current ? '#00e5ff' : '#ccc',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#1a1a2e' }}>
          {title}
          {current && (
            <span
              style={{
                display: 'inline-block',
                fontSize: 8,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                padding: '2px 5px',
                borderRadius: 3,
                background: '#00e5ff',
                color: '#0a0a1a',
                marginLeft: 5,
                verticalAlign: 'middle',
              }}
            >
              {currentLabel}
            </span>
          )}
        </span>
        <span style={{ fontSize: 9, color: '#888', fontWeight: 500, whiteSpace: 'nowrap' }}>{date}</span>
      </div>
      <div style={{ fontSize: 10, color: '#00b8d4', fontWeight: 600, marginBottom: 1 }}>{subtitle}</div>
      <div style={{ fontSize: 9, color: '#999', marginBottom: 3 }}>{location}</div>
      {tasks.length > 0 && (
        <ul style={{ fontSize: 10, color: '#555', lineHeight: 1.5, paddingLeft: 14, marginTop: 3 }}>
          {tasks.map((t2, i) => (
            <li key={i} style={{ marginBottom: 1 }}>
              {t2}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

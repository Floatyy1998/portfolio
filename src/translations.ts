const en = {
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    contact: 'Contact',
  },
  hero: {
    greeting: "Hi, I'm",
    name: 'Konrad Dinges',
    roles: ['Full Stack Developer', 'Web Developer', 'Problem Solver'],
    description:
      'Building exceptional digital experiences with modern technologies and clean, scalable code.',
    cta: 'Get in Touch',
    viewProjects: 'View Projects',
    scrollToExplore: 'Scroll to explore',
    availableForWork: 'Available for work',
  },
  about: {
    title: 'About Me',
    description:
      'Passionate Full Stack Developer with expertise in creating modern web applications. I combine technical excellence with creative problem-solving to build exceptional digital experiences.',
    longDescription:
      "With over 10 years of experience in programming, I specialize in developing modern web applications that are both functional and user-friendly. I focus on using current technologies and best practices to create solutions that meet users' needs. Throughout my career, I've worked on numerous projects and continuously expanded my skills to stay up to date with developments in web development.",
    yearsExp: 'Years Experience',
    projectsCompleted: 'Projects Completed',
    techMastered: 'Technologies Mastered',
    cleanCode: 'Clean Code',
    cleanCodeDesc:
      'Writing maintainable, scalable, and well-documented code that follows best practices.',
    modernDesign: 'Modern Design',
    modernDesignDesc:
      'Creating beautiful, intuitive interfaces that users love to interact with.',
    performance: 'Performance',
    performanceDesc:
      'Optimizing applications for speed and efficiency to deliver the best user experience.',
    userFocused: 'User-Focused',
    userFocusedDesc:
      'Building solutions that prioritize user needs and create value.',
  },
  skills: {
    title: 'Skills',
    description: 'Technologies I use to bring ideas to life',
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools & DevOps',
  },
  experience: {
    title: 'Experience',
    subtitle: 'My professional journey and growth as a developer',
    current: 'Current',
    positions: [
      {
        title: 'Web Developer',
        company: 'HUK-COBURG',
        period: 'July 2025 — Present',
        location: 'Coburg, Germany',
        description:
          'Continuing development and enhancement of tariff calculators for HUK Coburg, HUK24, and VRK using Angular, with focus on performance optimization and new features.',
        achievements: [
          'Frontend development with Angular',
          'Working with TypeScript',
          'Component-based development',
          'Responsive web design',
        ],
        tech: ['Angular', 'TypeScript', 'Jenkins', 'AWS'],
        isCurrent: true,
      },
      {
        title: 'Apprenticeship',
        company: 'HUK-COBURG',
        period: 'Sept. 2022 — June 2025',
        location: 'Coburg, Germany',
        description:
          'Developing the tariff calculators for HUK Coburg, HUK24, and VRK using Angular.',
        achievements: [
          'Working with Angular',
          'Working with TypeScript',
          'CI/CD with Jenkins',
          'AWS',
        ],
        tech: ['Angular', 'TypeScript', 'CI/CD', 'AWS'],
        isCurrent: false,
      },
      {
        title: 'Internship',
        company: 'KAPP NILES',
        period: 'Apr. 2020 — Jun. 2020',
        location: 'Coburg, Germany',
        description:
          'My task was to program a web frontend for an order picking overview.',
        achievements: [
          'Further development of my HTML skills',
          'Further development of my CSS skills',
          'Further development of my JavaScript skills',
          'Learning how to work with MongoDB',
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'MongoDB'],
        isCurrent: false,
      },
      {
        title: 'Internship',
        company: 'HABA',
        period: 'Oct. 2013',
        location: 'Bad Rodach, Germany',
        description:
          'Learning basic programming principles and algorithms with Java.',
        achievements: [
          'First insights into the daily work of a software developer',
        ],
        tech: ['Java'],
        isCurrent: false,
      },
    ],
  },
  projects: {
    title: 'Projects',
    description: 'Some of my recent work',
    viewCode: 'View Code',
    liveDemo: 'Live Demo',
    moreText: 'Want to see more of my work?',
    viewMoreOnGitHub: 'View More on GitHub',
    items: [
      {
        title: 'Series Ranking Website',
        description:
          'A comprehensive series ranking website that allows users to add series by title, fetch their data via APIs, and rate the series. Developed with React for the frontend and Node.js for the backend, using Firebase for efficient data storage and managing user ratings.',
        features: ['Responsive Design', 'Firebase Auth', 'Real-time Updates'],
      },
      {
        title: 'WatchRadar',
        description:
          'WatchRadar allows you to search the availability of movies and TV shows across various streaming services worldwide.',
        features: ['Modern UI', 'Cloud Storage', 'User Authentication'],
      },
      {
        title: 'Portfolio Website',
        description:
          'A modern portfolio website with dark mode support, smooth animations, and responsive design. Features include dynamic theme switching, animated transitions, and optimized performance.',
        features: [
          'Smooth Animations',
          'Dark Mode Support',
          'Multi-language Support',
        ],
      },
      {
        title: 'Classpulse',
        description:
          'Classpulse is a web application that allows teachers to collect anonymous feedback from students. The application provides an easy way to create surveys and analyze the results in real-time.',
        features: [
          'Real-time Analytics',
          'Anonymous Feedback',
          'Survey Builder',
        ],
      },
      {
        title: 'DOGR',
        description:
          'Dogr is a social network for all people who love dogs. It started as a learning project and the main idea behind Dogr is to combine all dog related topics on one single platform.',
        features: ['Social Features', 'Image Upload', 'User Profiles'],
      },
    ],
  },
  contact: {
    title: "Let's work together",
    description:
      'Have a question or want to work together? Feel free to reach out!',
    name: 'Name',
    namePlaceholder: 'Your Name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    message: 'Message',
    messagePlaceholder: 'Your Message',
    send: 'Send Message',
    sending: 'Sending...',
    success: 'Email sent successfully!',
    error: 'Error sending email.',
    contactInfo: 'Contact Information',
    findMeOn: 'Find me on',
    location: 'Location',
    meederGermany: 'Meeder, Germany',
  },
  footer: {
    impressum: 'Impressum',
    copyright: 'Konrad Dinges. All rights reserved.',
    builtWith: 'Built with',
  },
  impressum: {
    title: 'Impressum',
    legalNoticeTitle: 'Angaben gemäß § 5 TMG',
    legalNoticeText:
      'Konrad Dinges\nVeilsdorfer Str. 12\n96484 Meeder\nDeutschland\n\nKontakt:\nE-Mail: mail@konrad-dinges.de\n\nVerantwortlich für den Inhalt nach § 55 Abs. 2 RStV:\nKonrad Dinges\nVeilsdorfer Str. 12\n96484 Meeder',
    liabilityContentTitle: 'Haftung für Inhalte',
    liabilityContentText:
      'Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.\n\nVerpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.',
    liabilityLinksTitle: 'Haftung für Links',
    liabilityLinksText:
      'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.',
    copyrightTitle: 'Urheberrecht',
    copyrightText:
      'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
    dataProtectionTitle: 'Datenschutz',
    dataProtectionText:
      '1. Datenschutz auf einen Blick\nDer Schutz Ihrer persönlichen Daten ist mir sehr wichtig. Diese Datenschutzerklärung erläutert, welche Informationen ich erhebe und wie ich diese nutze.\n\n2. Verantwortlicher für die Datenverarbeitung\nVerantwortlich für die Verarbeitung Ihrer personenbezogenen Daten auf dieser Website ist:\n\nKonrad Dinges\nVeilsdorfer Str. 12\n96484 Meeder\nE-Mail: mail@konrad-dinges.de\n\n3. Welche Daten werden erfasst?\n\na) Automatische Datenerfassung (Server-Log-Dateien)\nBeim Besuch dieser Website werden automatisch folgende Daten erfasst:\nIP-Adresse, Datum und Uhrzeit des Zugriffs, abgerufene Datei, Referrer-URL, Browser und Betriebssystem.\n\nb) Daten durch das Kontaktformular (EmailJS)\nWenn Sie das Kontaktformular nutzen, werden Name, E-Mail-Adresse und Nachrichtentext über EmailJS verarbeitet und ausschließlich zur Bearbeitung Ihrer Anfrage genutzt.\n\n4. Ihre Rechte\nSie haben das Recht auf Auskunft, Berichtigung, Löschung und Widerspruch. Kontakt: mail@konrad-dinges.de',
  },
}

const de: typeof en = {
  nav: {
    home: 'Start',
    about: 'Über mich',
    skills: 'Fähigkeiten',
    experience: 'Erfahrung',
    projects: 'Projekte',
    contact: 'Kontakt',
  },
  hero: {
    greeting: 'Hi, ich bin',
    name: 'Konrad Dinges',
    roles: ['Full Stack Entwickler', 'Webentwickler', 'Problemlöser'],
    description:
      'Entwicklung außergewöhnlicher digitaler Erlebnisse mit modernen Technologien und sauberem, skalierbarem Code.',
    cta: 'Kontakt aufnehmen',
    viewProjects: 'Projekte ansehen',
    scrollToExplore: 'Scrollen zum Erkunden',
    availableForWork: 'Verfügbar für Projekte',
  },
  about: {
    title: 'Über mich',
    description:
      'Leidenschaftlicher Full Stack Entwickler mit Expertise in der Erstellung moderner Webanwendungen. Ich verbinde technische Exzellenz mit kreativer Problemlösung, um außergewöhnliche digitale Erlebnisse zu schaffen.',
    longDescription:
      'Mit über 10 Jahren Erfahrung in der Programmierung habe ich mich darauf spezialisiert, moderne Webanwendungen zu entwickeln, die sowohl funktional als auch benutzerfreundlich sind. Ich setze auf aktuelle Technologien und bewährte Methoden, um Lösungen zu schaffen, die den Anforderungen der Nutzer gerecht werden. In meiner Laufbahn habe ich zahlreiche Projekte umgesetzt und mich kontinuierlich weitergebildet, um mit den Entwicklungen in der Webentwicklung Schritt zu halten.',
    yearsExp: 'Jahre Erfahrung',
    projectsCompleted: 'Projekte abgeschlossen',
    techMastered: 'Beherrschte Technologien',
    cleanCode: 'Sauberer Code',
    cleanCodeDesc:
      'Schreiben von wartbarem, skalierbarem und gut dokumentiertem Code nach bewährten Methoden.',
    modernDesign: 'Modernes Design',
    modernDesignDesc:
      'Gestaltung schöner, intuitiver Schnittstellen, mit denen Benutzer gerne interagieren.',
    performance: 'Leistung',
    performanceDesc:
      'Optimierung von Anwendungen für Geschwindigkeit und Effizienz für die beste Benutzererfahrung.',
    userFocused: 'Benutzerorientiert',
    userFocusedDesc:
      'Entwicklung von Lösungen, die Benutzerbedürfnisse priorisieren und Mehrwert schaffen.',
  },
  skills: {
    title: 'Fähigkeiten',
    description: 'Technologien, die ich verwende, um Ideen zum Leben zu erwecken',
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools & DevOps',
  },
  experience: {
    title: 'Erfahrung',
    subtitle: 'Mein beruflicher Werdegang und Entwicklung als Entwickler',
    current: 'Aktuell',
    positions: [
      {
        title: 'Webentwickler',
        company: 'HUK-COBURG',
        period: 'Juli 2025 — Heute',
        location: 'Coburg, Deutschland',
        description:
          'Fortsetzung der Entwicklung und Verbesserung der Tarifrechner für HUK Coburg, HUK24 und VRK mit Angular, mit Fokus auf Performance-Optimierung und neue Features.',
        achievements: [
          'Frontend-Entwicklung mit Angular',
          'Arbeiten mit TypeScript',
          'Komponentenbasierte Entwicklung',
          'Responsive Webdesign',
        ],
        tech: ['Angular', 'TypeScript', 'Jenkins', 'AWS'],
        isCurrent: true,
      },
      {
        title: 'Ausbildung',
        company: 'HUK-COBURG',
        period: 'Sept. 2022 — Juni 2025',
        location: 'Coburg, Deutschland',
        description:
          'Entwicklung der Tarifrechner für HUK Coburg, HUK24 und VRK mit Angular.',
        achievements: [
          'Umgang mit Angular',
          'Umgang mit TypeScript',
          'CI/CD mit Jenkins',
          'AWS',
        ],
        tech: ['Angular', 'TypeScript', 'CI/CD', 'AWS'],
        isCurrent: false,
      },
      {
        title: 'Praktikum',
        company: 'KAPP NILES',
        period: 'Apr. 2020 — Jun. 2020',
        location: 'Coburg, Deutschland',
        description:
          'Meine Aufgabe war die Programmierung eines Web-Frontends für eine Kommissionierungsübersicht.',
        achievements: [
          'Weiterentwicklung meiner HTML Fähigkeiten',
          'Weiterentwicklung meiner CSS Fähigkeiten',
          'Weiterentwicklung meiner JavaScript Fähigkeiten',
          'Erlernen des Umgangs mit MongoDB',
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'MongoDB'],
        isCurrent: false,
      },
      {
        title: 'Praktikum',
        company: 'HABA',
        period: 'Okt. 2013',
        location: 'Bad Rodach, Deutschland',
        description:
          'Erlernen grundlegender Programmierprinzipien und Algorithmen mit Java.',
        achievements: [
          'Erste Einblicke in den Berufsalltag eines Softwareentwicklers',
        ],
        tech: ['Java'],
        isCurrent: false,
      },
    ],
  },
  projects: {
    title: 'Projekte',
    description: 'Einige meiner aktuellen Arbeiten',
    viewCode: 'Code ansehen',
    liveDemo: 'Live Demo',
    moreText: 'Möchten Sie mehr von meiner Arbeit sehen?',
    viewMoreOnGitHub: 'Mehr auf GitHub ansehen',
    items: [
      {
        title: 'Serien-Ranking Website',
        description:
          'Eine umfassende Serien-Ranking-Website, die es ermöglicht, Serien nach Titel hinzuzufügen, deren Daten über APIs abzurufen und die Serien zu bewerten. Entwickelt mit React für das Frontend und Node.js für das Backend, unter Verwendung von Firebase für eine effiziente Datenspeicherung.',
        features: ['Responsives Design', 'Firebase Auth', 'Echtzeit-Updates'],
      },
      {
        title: 'WatchRadar',
        description:
          'WatchRadar ermöglicht es Ihnen, die Verfügbarkeit von Filmen und TV-Sendungen auf verschiedenen Streaming-Diensten weltweit zu suchen.',
        features: [
          'Moderne Oberfläche',
          'Cloud-Speicher',
          'Benutzer-Authentifizierung',
        ],
      },
      {
        title: 'Portfolio-Website',
        description:
          'Eine moderne Portfolio-Website mit Unterstützung für den Dunkelmodus, flüssigen Animationen und responsivem Design. Zu den Funktionen gehören dynamisches Themenswitching, animierte Übergänge und optimierte Leistung.',
        features: [
          'Flüssige Animationen',
          'Dunkelmodus-Unterstützung',
          'Mehrsprachige Unterstützung',
        ],
      },
      {
        title: 'Classpulse',
        description:
          'Classpulse ist eine Webanwendung, die es Lehrern ermöglicht, anonymes Feedback von Schülern zu sammeln. Die Anwendung bietet eine einfache Möglichkeit, Umfragen zu erstellen und die Ergebnisse in Echtzeit zu analysieren.',
        features: [
          'Echtzeit-Analyse',
          'Anonymes Feedback',
          'Umfrage-Builder',
        ],
      },
      {
        title: 'DOGR',
        description:
          'Dogr ist ein soziales Netzwerk für alle, die Hunde lieben. Es begann als ein Lernprojekt und die Hauptidee hinter Dogr ist es, alle hundebezogenen Themen auf einer einzigen Plattform zu vereinen.',
        features: ['Soziale Features', 'Bild-Upload', 'Benutzerprofile'],
      },
    ],
  },
  contact: {
    title: 'Lass uns zusammenarbeiten',
    description:
      'Haben Sie eine Frage oder möchten Sie zusammenarbeiten? Zögern Sie nicht, sich zu melden!',
    name: 'Name',
    namePlaceholder: 'Ihr Name',
    email: 'E-Mail',
    emailPlaceholder: 'ihre@email.de',
    message: 'Nachricht',
    messagePlaceholder: 'Ihre Nachricht',
    send: 'Nachricht senden',
    sending: 'Sende...',
    success: 'E-Mail erfolgreich gesendet!',
    error: 'Fehler beim Senden der E-Mail.',
    contactInfo: 'Kontaktinformationen',
    findMeOn: 'Finde mich auf',
    location: 'Standort',
    meederGermany: 'Meeder, Deutschland',
  },
  footer: {
    impressum: 'Impressum',
    copyright: 'Konrad Dinges. Alle Rechte vorbehalten.',
    builtWith: 'Gebaut mit',
  },
  impressum: {
    title: 'Impressum',
    legalNoticeTitle: 'Angaben gemäß § 5 TMG',
    legalNoticeText: en.impressum.legalNoticeText,
    liabilityContentTitle: 'Haftung für Inhalte',
    liabilityContentText: en.impressum.liabilityContentText,
    liabilityLinksTitle: 'Haftung für Links',
    liabilityLinksText: en.impressum.liabilityLinksText,
    copyrightTitle: 'Urheberrecht',
    copyrightText: en.impressum.copyrightText,
    dataProtectionTitle: 'Datenschutz',
    dataProtectionText: en.impressum.dataProtectionText,
  },
}

export const translations = { en, de }
export type Translation = typeof en

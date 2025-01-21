# Portfolio Website

Dies ist der Quellcode für meine Portfolio-Website, die mit React, TypeScript und Tailwind CSS erstellt wurde. Die Website zeigt meine Projekte, Karriere, Kontaktinformationen und mehr.

## Inhaltsverzeichnis

- [Installation](#installation)
- [Verwendung](#verwendung)
- [Verzeichnisstruktur](#verzeichnisstruktur)
- [Features](#features)
- [Technologien](#technologien)
- [Übersetzung](#übersetzung)
- [Lizenz](#lizenz)

## Installation

1. Klone das Repository:
   ```bash
   git clone https://github.com/Floatyy1998/portfolio.git
   ```
2. Wechsle in das Projektverzeichnis:
   ```bash
   cd portfolio
   ```
3. Installiere die Abhängigkeiten:
   ```bash
   npm install
   ```

## Verwendung

Starte den Entwicklungsserver:

```bash
npm run dev
```

Öffne deinen Browser und navigiere zu `http://localhost:3000`, um die Website zu sehen.

## Verzeichnisstruktur

```plaintext
portfolio/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── i18n/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── .gitignore
├── index.html
├── package.json
├── README.md
└── tsconfig.json
```

## Features

- **Mehrsprachigkeit**: Unterstützung für mehrere Sprachen (derzeit Englisch und Deutsch).
- **Responsive Design**: Optimiert für verschiedene Bildschirmgrößen und Geräte.
- **Animationen**: Sanfte Übergänge und Animationen mit Framer Motion.

## Technologien

- **React**: Eine JavaScript-Bibliothek für den Aufbau von Benutzeroberflächen.
- **TypeScript**: Ein typisiertes Superset von JavaScript, das die Entwicklung skalierbarer und wartbarer Anwendungen erleichtert.
- **Tailwind CSS**: Ein Utility-First-CSS-Framework für die schnelle Erstellung von benutzerdefinierten Designs.
- **Framer Motion**: Eine Bibliothek für React-Animationen.
- **EmailJS**: Ein Dienst zum Senden von E-Mails direkt aus JavaScript-Anwendungen.

## Übersetzung

Die Übersetzungen werden im Verzeichnis `src/i18n` verwaltet. Neue Übersetzungen können durch Hinzufügen neuer Schlüssel-Wert-Paare in den entsprechenden JSON-Dateien hinzugefügt werden.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Informationen findest du in der [LICENSE](LICENSE)-Datei.

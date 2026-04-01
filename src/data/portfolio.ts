import {
  LuUser as User2,
  LuCode as Code2,
  LuBriefcase as Briefcase,
  LuFolderOpen as FolderOpen,
  LuMail as MailIcon,
  LuTerminal as Terminal,
  LuGamepad2 as Gamepad2,
  LuStickyNote,
  LuSettings,
} from 'react-icons/lu'
import type { AppDef } from '../types/desktop'
import profileImage from '../assets/Profilbild.jpg'
import Serien from '../assets/Serien.jpg'
import WatchRadar from '../assets/WatchRadar.jpg'
import PortfolioImg from '../assets/Portfolio.jpg'
import Classpulse from '../assets/Classpulse.png'
import DOGR from '../assets/DOGR.jpg'
import Huk2 from '../assets/Huk2.svg'
import Kapp from '../assets/Kapp.svg'
import Haba from '../assets/Haba.png'

export { profileImage }

export const appDefs: AppDef[] = [
  { id: 'about', label: 'About', icon: User2, w: 520, h: 680, minW: 400, minH: 500 },
  { id: 'skills', label: 'Skills', icon: Code2, w: 780, h: 560, minW: 400, minH: 380 },
  { id: 'experience', label: 'Experience', icon: Briefcase, w: 800, h: 600, minW: 440, minH: 380 },
  { id: 'projects', label: 'Projects', icon: FolderOpen, w: 1000, h: 680, minW: 540, minH: 420 },
  { id: 'contact', label: 'Contact', icon: MailIcon, w: 740, h: 560, minW: 420, minH: 380 },
  { id: 'terminal', label: 'Terminal', icon: Terminal, w: 750, h: 460, minW: 440, minH: 280 },
  { id: 'snake', label: 'Snake', icon: Gamepad2, w: 460, h: 540, minW: 420, minH: 500 },
  { id: 'notes', label: 'Notes', icon: LuStickyNote, w: 400, h: 350, minW: 300, minH: 250 },
  { id: 'settings', label: 'Settings', icon: LuSettings, w: 650, h: 500, minW: 500, minH: 400 },
]

export const skillsData = [
  {
    cat: 'Frontend',
    color: '#00e5ff',
    items: [
      { n: 'React', c: '#61DAFB', url: 'https://react.dev' },
      { n: 'Angular', c: '#DD0031', url: 'https://angular.dev' },
      { n: 'TypeScript', c: '#3178C6', url: 'https://www.typescriptlang.org' },
      { n: 'JavaScript', c: '#F7DF1E', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { n: 'Vue.js', c: '#4FC08D', url: 'https://vuejs.org' },
      { n: 'Next.js', c: '#fff', url: 'https://nextjs.org' },
      { n: 'Tailwind', c: '#06B6D4', url: 'https://tailwindcss.com' },
      { n: 'HTML/CSS', c: '#E34F26', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    ],
  },
  {
    cat: 'Backend',
    color: '#bf5af2',
    items: [
      { n: 'Node.js', c: '#339933', url: 'https://nodejs.org' },
      { n: 'Java', c: '#ED8B00', url: 'https://www.java.com' },
      { n: 'Kotlin', c: '#7F52FF', url: 'https://kotlinlang.org' },
      { n: 'ASP.NET Core', c: '#512BD4', url: 'https://dotnet.microsoft.com/apps/aspnet' },
      { n: 'Python', c: '#3776AB', url: 'https://www.python.org' },
      { n: 'MongoDB', c: '#47A248', url: 'https://www.mongodb.com' },
      { n: 'PostgreSQL', c: '#4169E1', url: 'https://www.postgresql.org' },
      { n: 'Firebase', c: '#FFCA28', url: 'https://firebase.google.com' },
    ],
  },
  {
    cat: 'DevOps',
    color: '#ff3366',
    items: [
      { n: 'Git', c: '#F05032', url: 'https://git-scm.com' },
      { n: 'Docker', c: '#2496ED', url: 'https://www.docker.com' },
      { n: 'AWS', c: '#FF9900', url: 'https://aws.amazon.com' },
      { n: 'Jenkins', c: '#D24939', url: 'https://www.jenkins.io' },
      { n: 'Figma', c: '#F24E1E', url: 'https://www.figma.com' },
      { n: 'Vite', c: '#646CFF', url: 'https://vite.dev' },
    ],
  },
]

export const projectImages = [Serien, WatchRadar, PortfolioImg, Classpulse, DOGR]

export const projectMeta = [
  {
    tech: ['React', 'Node.js', 'Firebase', 'MUI', 'TS'],
    url: 'https://tv-rank.de',
    gh: 'https://github.com/Floatyy1998/Serien-Ranking',
  },
  {
    tech: ['React', 'Node.js', 'Firebase', 'Tailwind', 'TS'],
    url: 'https://watchradar.konrad-dinges.de',
    gh: 'https://github.com/Floatyy1998/WatchRadar',
  },
  {
    tech: ['React', 'Tailwind', 'Framer Motion', 'Vite', 'TS'],
    url: 'https://konrad-dinges.de',
    gh: 'https://github.com/Floatyy1998/portfolio',
  },
  { tech: ['React', 'MariaDB', 'TypeScript', 'MUI', 'ASP.NET'], url: null, gh: null },
  { tech: ['React', 'Node.js', 'MongoDB', 'TS'], url: null, gh: null },
]

export const logos: Record<string, string> = { 'HUK-COBURG': Huk2, 'KAPP NILES': Kapp, HABA: Haba }
export const companyUrls: Record<string, string> = {
  'HUK-COBURG': 'https://www.huk.de',
  'KAPP NILES': 'https://www.kapp-niles.com',
  HABA: 'https://www.haba.de',
}

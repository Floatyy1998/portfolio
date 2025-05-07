import { motion } from 'framer-motion';
import Classpulse from '../assets/Classpulse.png';
import DOGR from '../assets/DOGR.jpg';
import Portfolio from '../assets/Portfolio.jpg';
import Serien from '../assets/Serien.jpg';
import WatchRadar from '../assets/WatchRadar.jpg';
import { useLanguage } from '../context/LanguageContext';

export function Projects() {
  const { t } = useLanguage();
  const projects = [
    {
      title: t('SeriesTitle'),
      description: t('SeriesDescription'),
      tech: ['React', 'Node.js', 'Firebase', 'Material-UI', 'TypeScript'],
      image: Serien,
      onclick: () => {
        window.open('https://serien.konrad-dinges.de');
      },
    },
    {
      title: t('WatchRadarTitle'),
      description: t('WatchRadarDescription'),
      tech: ['React', 'Node.js', 'Firebase', 'Tailwind CSS', 'TypeScript'],
      image: WatchRadar,
      onclick: () => {
        window.open('https://watchradar.konrad-dinges.de');
      },
    },
    {
      title: t('portfolioWebsiteTitle'),
      description: t('portfolioWebsiteDescription'),
      tech: [
        'React',
        'Tailwind CSS',
        'Framer Motion',
        'Vite',
        'TypeScript',
        'Firebase',
      ],
      image: Portfolio,
      onclick: () => {
        window.open('konrad-dinges.de');
      },
    },
    {
      title: t('classpulseTitle'),
      description: t('classpulseDescription'),
      tech: ['React', 'JavaScript', 'Material-UI', 'ASP.NET Core', 'C#'],
      image: Classpulse,
      onclick: () => {
        window.open('https://github.com/Floatyy1998/ClassPulse');
      },
    },
    {
      title: t('dogrTitle'),
      description: t('dogrDescription'),
      tech: ['Kotlin', 'React', 'TypeScript'],
      image: DOGR,
      onclick: () => {
        window.open('https://github.com/dogr-org');
      },
    },
  ];
  return (
    <main className='w-full min-h-screen bg-white dark:bg-gray-900 p-24 px-4 transition-colors duration-300'>
      <div className='max-w-5xl mx-auto'>
        <h2 className='text-3xl font-bold mb-8 dark:text-white'>
          {t('myProjects')}
        </h2>
        <div className='grid grid-cols-1 gap-8'>
          {projects.map((project, index) => (
            <motion.div
              onClick={project.onclick}
              style={{
                cursor: 'pointer',
              }}
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              className='border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-shadow dark:bg-gray-800'
            >
              <img
                src={project.image}
                alt={project.title}
                className='w-full h-64 object-cover'
              />
              <div className='p-6'>
                <h3 className='text-xl font-semibold mb-2 dark:text-white'>
                  {project.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-300 mb-4'>
                  {project.description}
                </p>
                <div className='flex flex-wrap gap-2'>
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className='px-3 py-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-full text-sm'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

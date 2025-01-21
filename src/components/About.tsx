import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { motion } from 'framer-motion';
import { Code, Coffee, Database, Globe, Layout, Mail } from 'lucide-react';
import Profilbild from '../assets/Profilbild.jpg';
import { useLanguage } from '../context/LanguageContext';

export function About() {
  const { t } = useLanguage();
  const skills = [
    {
      category: 'Frontend',
      items: [
        'React',
        'Angular',
        'Vite',
        'TypeScript',
        'Tailwind CSS',
        'Material-UI',
      ],
      icon: Layout,
      color: 'bg-blue-500',
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Python', 'MongoDB', 'MariaDB', 'MySQL', 'REST APIs'],
      icon: Database,
      color: 'bg-green-500',
    },
    {
      category: 'Tools & Others',
      items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Agile'],
      icon: Code,
      color: 'bg-purple-500',
    },
  ];
  return (
    <main className='w-full min-h-screen bg-white dark:bg-gray-900 p-24 px-4 transition-colors duration-300'>
      <div className='max-w-5xl mx-auto'>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className='text-center mb-16'
        >
          <motion.div
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className='w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-blue-500 dark:ring-blue-400'
          >
            <img
              src={Profilbild}
              alt='Profile'
              className='w-full h-full object-cover'
            />
          </motion.div>
          <motion.h1
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
            }}
            className='text-5xl font-bold mb-4 dark:text-white'
          >
            Konrad Dinges
          </motion.h1>
          <motion.div
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.3,
            }}
            className='flex items-center justify-center gap-3 text-gray-600 dark:text-gray-300 mb-6'
          >
            <Globe size={20} />
            <span>{t('fullStackDeveloper')}</span>
            <span className='mx-2'>•</span>
            <Coffee size={20} />
            <span>{t('coffeeEnthusiast')}</span>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className='bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-12 shadow-lg'
        >
          <h2 className='text-2xl font-bold mb-4 dark:text-white'>
            {t('aboutMe')}
          </h2>
          <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
            {t('aboutMeDescription')}
          </p>
        </motion.div>
        <div className='grid md:grid-cols-3 gap-6 mb-12'>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.5 + index * 0.1,
              }}
              className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'
            >
              <div
                className={`w-12 h-12 ${skill.color} rounded-lg flex items-center justify-center mb-4`}
              >
                <skill.icon className='w-6 h-6 text-white' />
              </div>
              <h3 className='text-xl font-semibold mb-3 dark:text-white'>
                {skill.category}
              </h3>
              <div className='flex flex-wrap gap-2'>
                {skill.items.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className='px-3 py-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-full text-sm'
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
          className='flex justify-center gap-6'
        >
          <a
            href='https://github.com/Floatyy1998'
            className='p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors'
          >
            <GitHubIcon />
          </a>
          <a
            href='https://www.linkedin.com/in/konrad-dinges-803098296/'
            className='p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors'
          >
            <LinkedInIcon />
          </a>
          <a
            href='mailto:mail@konrad-dinges.de'
            className='p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors'
          >
            <Mail size={24} />
          </a>
        </motion.div>
      </div>
    </main>
  );
}

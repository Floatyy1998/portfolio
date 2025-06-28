import { motion } from 'framer-motion';
import { Briefcase, Code2, Folder, GraduationCap } from 'lucide-react';
import Haba from '../assets/Haba.png';
import Huk from '../assets/Huk2.svg';
import Kapp from '../assets/Kapp.svg';
import { useLanguage } from '../context/LanguageContext';

export function Career() {
  const { t } = useLanguage();
  const careers = [
    {
      id: 'web-developer-huk-2025',
      title: t('webDeveloperHUKCoburg'),
      company: t('HUKCoburg'),
      period: 'Juli 2025 - Present',
      description: t('webDeveloperHUKCoburgDescription'),
      image: Huk,
      icon: Briefcase,
      achievements: [
        t('webDeveloperHUKCoburgAchievement1'),
        t('webDeveloperHUKCoburgAchievement2'),
        t('webDeveloperHUKCoburgAchievement3'),
        t('webDeveloperHUKCoburgAchievement4'),
      ],
      url: 'https://www.huk.de',
    },
    {
      id: 'apprenticeship-huk-2022',
      title: t('apprenticeshipHUKCoburg'),
      company: t('HUKCoburg'),
      period: 'Sept. 2022 - Juni 2025',
      description: t('apprenticeshipHUKCoburgDescription'),
      image: Huk,
      icon: GraduationCap,
      achievements: [
        t('apprenticeshipHUKCoburgAchievement1'),
        t('apprenticeshipHUKCoburgAchievement2'),
        t('apprenticeshipHUKCoburgAchievement3'),
        t('apprenticeshipHUKCoburgAchievement4'),
      ],
      url: 'https://www.huk.de',
    },
    {
      id: 'internship-kapp-2020',
      title: t('internshipKapp'),
      company: 'KAPP NILES',
      period: 'Apr. 2020 - Jun. 2020',
      description: t('internshipKappDescription'),
      image: Kapp,
      icon: Code2,
      achievements: [
        t('internshipKappAchievement1'),
        t('internshipKappAchievement2'),
        t('internshipKappAchievement3'),
        t('internshipKappAchievement4'),
      ],
      url: 'https://www.kapp-niles.com',
    },
    {
      id: 'internship-haba-2013',
      title: t('internshipHaba'),
      company: 'HABA',
      period: 'Okt. 2013',
      description: t('internshipHabaDescription'),
      image: Haba,
      icon: Folder,
      achievements: [t('internshipHabaAchievement1')],
      url: 'https://habafamilygroup.com/',
    },
  ];
  return (
    <main className='w-full min-h-screen bg-white dark:bg-gray-900 p-24 px-4 transition-colors duration-300'>
      <div className='max-w-5xl mx-auto'>
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className='text-3xl font-bold mb-8 dark:text-white'
        >
          {t('careerJourney')}
        </motion.h2>
        <div className='space-y-12'>
          {careers.map((career, index) => (
            <motion.div
              key={career.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              className='relative'
            >
              <div className='grid md:grid-cols-2 gap-8'>
                <div className='relative'>
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className='rounded-lg overflow-hidden shadow-lg aspect-w-16 aspect-h-9 cursor-pointer'
                    onClick={() => window.open(career.url, '_blank')}
                  >
                    <img
                      src={career.image}
                      alt={career.title}
                      className='w-full h-full object-cover'
                    />
                  </motion.div>
                </div>
                <div className='relative pl-8 border-l-2 border-gray-200 dark:border-gray-700'>
                  <div
                    className='absolute top-0'
                    style={{
                      left: '-1.08rem',
                      transform: 'translateY(-10%)',
                    }}
                  >
                    <div className='bg-blue-600 p-2 rounded-full'>
                      <career.icon className='w-4 h-4 text-white' />
                    </div>
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold dark:text-white'>
                      {career.title}
                    </h3>
                    <p className='text-blue-600 dark:text-blue-400 font-medium mb-2'>
                      {career.company}
                    </p>
                    <p className='text-gray-600 dark:text-gray-400 mb-4'>
                      {career.period}
                    </p>
                    <p className='text-gray-600 dark:text-gray-300 mb-4'>
                      {career.description}
                    </p>
                    <div className='space-y-2'>
                      {career.achievements.map(
                        (achievement, achievementIndex) => (
                          <motion.div
                            key={achievementIndex}
                            initial={{
                              opacity: 0,
                              x: -20,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.2 + achievementIndex * 0.1,
                            }}
                            className='flex items-center gap-2'
                          >
                            <div className='w-1.5 h-1.5 rounded-full bg-blue-600'></div>
                            <span className='text-gray-600 dark:text-gray-300 text-sm'>
                              {achievement}
                            </span>
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

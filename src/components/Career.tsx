import { motion } from 'framer-motion';
import { Code2, Folder, Trophy } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export function Career() {
  const { t } = useLanguage();
  const careers = [
    {
      title: t('apprenticeshipHUKCoburg'),
      company: t('HUK-COBURG'),
      period: 'Sept. 2022 - Present',
      description: t('apprenticeshipHUKCoburgDescription'),
      image:
        'https://sda.se/wp-content/uploads/2021/12/HUK_Logo_Wordpress_1920x1080.png?auto=format&fit=crop&q=80&w=800',
      icon: Trophy,
      achievements: [
        t('apprenticeshipHUKCoburgAchievement1'),
        t('apprenticeshipHUKCoburgAchievement2'),
        t('apprenticeshipHUKCoburgAchievement3'),
        t('apprenticeshipHUKCoburgAchievement4'),
      ],
    },
    {
      title: t('internshipKapp'),
      company: 'KAPP NILES',
      period: 'Apr. 2020 - Jun. 2020',
      description: t('internshipKappDescription'),
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6f3KLm-2XrvhzUp36hkgs6OlSod7jNOCDsg&s?auto=format&fit=crop&q=80&w=800',
      icon: Code2,
      achievements: [
        t('internshipKappAchievement1'),
        t('internshipKappAchievement2'),
        t('internshipKappAchievement3'),
        t('internshipKappAchievement4'),
      ],
    },
    {
      title: t('internshipHaba'),
      company: 'HABA',
      period: 'Okt. 2013',
      description: t('internshipHabaDescription'),
      image:
        'https://m.media-amazon.com/images/S/aplus-media/sota/663b2d20-262d-4799-b653-e67715bd6d9e.__CR48,0,1167,361_PT0_SX970_V1___.png?auto=format&fit=crop&q=80&w=800',
      icon: Folder,
      achievements: [t('internshipHabaAchievement1')],
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
              key={index}
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
                    className='rounded-lg overflow-hidden shadow-lg'
                  >
                    <img
                      src={career.image}
                      alt={career.title}
                      className='w-full h-64 object-cover'
                    />
                  </motion.div>
                </div>
                <div className='relative pl-8 border-l-2 border-gray-200 dark:border-gray-700'>
                  <div className='absolute -left-3 top-0'>
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

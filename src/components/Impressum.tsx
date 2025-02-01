import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export function Impressum() {
  const { t } = useLanguage();
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
          {t('impressum')}
        </motion.h2>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className='text-gray-600 dark:text-gray-300 leading-relaxed'
        >
          <h3 className='text-xl font-semibold mb-4 dark:text-white'>
            {t('legalNotice')}
          </h3>

          <p>
            {t('legalNoticeText')
              .split('\n')
              .map((text, index) => (
                <span key={index}>
                  {text}
                  <br />
                </span>
              ))}
          </p>
          <h3 className='text-xl font-semibold mt-8 mb-4 dark:text-white'>
            {t('liabilityForContent')}
          </h3>
          <p>
            {t('liabilityForContentText')
              .split('\n')
              .map((text, index) => (
                <span key={index}>
                  {text}
                  <br />
                </span>
              ))}
          </p>
          <h3 className='text-xl font-semibold mt-8 mb-4 dark:text-white'>
            {t('liabilityForLinks')}
          </h3>
          <p>
            {t('liabilityForLinksText')
              .split('\n')
              .map((text, index) => (
                <span key={index}>
                  {text}
                  <br />
                </span>
              ))}
          </p>
          <h3 className='text-xl font-semibold mt-8 mb-4 dark:text-white'>
            {t('copyright')}
          </h3>
          <p>
            {t('copyrightText')
              .split('\n')
              .map((text, index) => (
                <span key={index}>
                  {text}
                  <br />
                </span>
              ))}
          </p>
          <h3 className='text-xl font-semibold mt-8 mb-4 dark:text-white'>
            {t('dataProtection')}
          </h3>
          <p>
            {t('dataProtectionText')
              .split('\n')
              .map((text, index) => (
                <span key={index}>
                  {text}
                  <br />
                </span>
              ))}
          </p>
        </motion.div>
      </div>
    </main>
  );
}

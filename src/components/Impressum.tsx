import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { X } from 'lucide-react';

interface ImpressumProps {
  onClose: () => void;
}

export function Impressum({ onClose }: ImpressumProps) {
  const { t } = useLanguage();
  return (
    <main className='w-full min-h-screen bg-black text-white p-24 px-4'>
      <div className='max-w-5xl mx-auto relative'>
        <motion.button
          onClick={onClose}
          className="absolute top-0 right-0 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <X className="w-6 h-6" />
        </motion.button>
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className='text-3xl font-bold mb-8 text-white'
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
          className='text-gray-300 leading-relaxed'
        >
          <h3 className='text-xl font-semibold mb-4 text-white'>
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
          <h3 className='text-xl font-semibold mt-8 mb-4 text-white'>
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
          <h3 className='text-xl font-semibold mt-8 mb-4 text-white'>
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
          <h3 className='text-xl font-semibold mt-8 mb-4 text-white'>
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
          <h3 className='text-xl font-semibold mt-8 mb-4 text-white'>
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

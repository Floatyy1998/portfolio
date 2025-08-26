import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onImpressumClick: () => void;
}

export function Footer({ onImpressumClick }: FooterProps) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear} Konrad Dinges. All rights reserved.
          </div>
          
          <motion.button
            onClick={onImpressumClick}
            className="text-gray-400 hover:text-white text-sm transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('impressum')}
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function Header() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigation = [
    {
      name: t('about'),
      path: '/',
    },
    {
      name: t('career'),
      path: '/career',
    },
    {
      name: t('projects'),
      path: '/projects',
    },
    {
      name: t('contact'),
      path: '/contact',
    },
  ];
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className='fixed top-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50 transition-colors duration-300'>
      <nav className='max-w-5xl mx-auto px-4 h-16 flex items-center justify-between'>
        <Link to='/' className='text-xl font-semibold dark:text-white z-50'>
          Portfolio
        </Link>
        <div className='hidden md:flex items-center gap-8'>
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                isActive(item.path)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'dark:text-gray-300'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className='flex items-center gap-4 md:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors z-50'
          >
            {isOpen ? (
              <X className='w-6 h-6 dark:text-white' />
            ) : (
              <Menu className='w-6 h-6 dark:text-white' />
            )}
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                x: '100%',
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: '100%',
              }}
              transition={{
                type: 'tween',
                duration: 0.3,
              }}
              className='fixed inset-0 bg-white dark:bg-gray-900 pt-20 px-4 md:hidden'
            >
              <div className='flex flex-col items-center gap-6'>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                      isActive(item.path)
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'dark:text-gray-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
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
                className='absolute bottom-8 left-0 right-0 text-center text-sm text-gray-500 dark:text-gray-400'
              >
                © 2023 Portfolio
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

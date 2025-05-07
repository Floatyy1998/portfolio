/// <reference types="vite/client" />
import { Alert, Snackbar } from '@mui/material';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Contact() {
  const { t } = useLanguage();
  const form = useRef<HTMLFormElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY!);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;
      const name = formData.get('name') as string;

      try {
        const result = await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID!,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
          {
            subject: 'PORTFOLIO',
            'from-mail': email,
            message: message,
            'from-name': name,
          }
        );
        setSnackbarMessage(t('emailSuccess'));
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        console.log(result.text);
        form.current.reset();
      } catch (error) {
        setSnackbarMessage(t('emailError'));
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(JSON.stringify(error));
        }
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <main className='w-full min-h-screen bg-white dark:bg-gray-900 p-24 px-4 transition-colors duration-300'>
      <div className='max-w-5xl mx-auto'>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className='text-center mb-12'
        >
          <h1 className='text-4xl font-bold mb-4 dark:text-white'>
            {t('getInTouch')}
          </h1>
          <p className='text-gray-600 dark:text-gray-300'>
            {t('contactIntro')}
          </p>
        </motion.div>
        <div className='grid md:grid-cols-2 gap-12'>
          {/* Contact Information */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className='space-y-8'
          >
            <div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-6'>
              <h2 className='text-2xl font-bold mb-6 dark:text-white'>
                {t('contactInformation')}
              </h2>
              <div className='space-y-4'>
                <div className='flex items-center gap-4 text-gray-600 dark:text-gray-300'>
                  <div className='w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center'>
                    <Mail className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <p className='font-medium dark:text-white'>{t('email')}</p>
                    <a
                      href='mailto:your@email.com'
                      className='hover:text-blue-500'
                    >
                      mail.konrad-dinges.de
                    </a>
                  </div>
                </div>
                <div className='flex items-center gap-4 text-gray-600 dark:text-gray-300'></div>
                <div className='flex items-center gap-4 text-gray-600 dark:text-gray-300'>
                  <div className='w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center'>
                    <MapPin className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <p className='font-medium dark:text-white'>
                      {t('location')}
                    </p>
                    <p>Meeder, DE</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Contact Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.4,
            }}
          >
            <form ref={form} onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                >
                  {t('name')}
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all'
                  placeholder={t('yourName')}
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                >
                  {t('email')}
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all'
                  placeholder='your@email.com'
                />
              </div>
              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                >
                  {t('message')}
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={5}
                  className='w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all'
                  placeholder={t('yourMessage')}
                ></textarea>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                type='submit'
                className='w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors'
              >
                <Send size={20} />
                {t('sendMessage')}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
  );
}

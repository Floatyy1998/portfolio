/// <reference types="vite/client" />
import { motion, useScroll, useTransform } from 'framer-motion';
import emailjs from 'emailjs-com';
import { Mail, MapPin, Send, MessageSquare, User, Github, Linkedin, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Contact() {
  const { t } = useLanguage();
  const form = useRef<HTMLFormElement>(null);
  const ref = useRef(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY!);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.current && formStatus !== 'sending') {
      setFormStatus('sending');
      const formData = new FormData(form.current);
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;
      const name = formData.get('name') as string;

      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID!,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
          {
            subject: 'PORTFOLIO',
            'from-mail': email,
            message: message,
            'from-name': name,
          }
        );
        setFormStatus('success');
        form.current.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } catch (error) {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-indigo-950/20 to-black" />
      
      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6"
        style={{ opacity }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400">{t('letWorkTogether')}</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('getInTouch')}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('contactIntro')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              {/* Email Card */}
              <motion.div
                className="relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.05] border border-white/10 backdrop-blur-sm hover:from-white/[0.05] hover:to-white/[0.08] transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-2">{t('email')}</p>
                    <a
                      href="mailto:mail@konrad-dinges.de"
                      className="text-xl text-white hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text transition-all"
                    >
                      mail@konrad-dinges.de
                    </a>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 transition-all duration-300 pointer-events-none" />
              </motion.div>

              {/* Location Card */}
              <motion.div
                className="relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.05] border border-white/10 backdrop-blur-sm hover:from-white/[0.05] hover:to-white/[0.08] transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-2">{t('location')}</p>
                    <p className="text-xl text-white">
                      {t('meederGermany') || 'Meeder, Deutschland'}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300 pointer-events-none" />
              </motion.div>

              {/* Social Links */}
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/Floatyy1998"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-4 rounded-xl bg-gradient-to-br from-white/[0.02] to-white/[0.05] border border-white/10 backdrop-blur-sm hover:from-white/[0.05] hover:to-white/[0.08] transition-all duration-300 flex items-center justify-center gap-3 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-gray-400 group-hover:text-white transition-colors">GitHub</span>
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/konrad-dinges-803098296"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-4 rounded-xl bg-gradient-to-br from-white/[0.02] to-white/[0.05] border border-white/10 backdrop-blur-sm hover:from-white/[0.05] hover:to-white/[0.08] transition-all duration-300 flex items-center justify-center gap-3 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-gray-400 group-hover:text-white transition-colors">LinkedIn</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form ref={form} onSubmit={handleSubmit} className="relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.05] border border-white/10 backdrop-blur-sm">
              <div className="space-y-6">
                {/* Name Field */}
                <motion.div
                  animate={{ 
                    scale: focusedField === 'name' ? 1.02 : 1 
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm text-gray-400 mb-2">
                    {t('name')}
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:bg-black/50 transition-all outline-none"
                      placeholder={t('yourName')}
                    />
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  animate={{ 
                    scale: focusedField === 'email' ? 1.02 : 1 
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm text-gray-400 mb-2">
                    {t('email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:bg-black/50 transition-all outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </motion.div>

                {/* Message Field */}
                <motion.div
                  animate={{ 
                    scale: focusedField === 'message' ? 1.02 : 1 
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm text-gray-400 mb-2">
                    {t('message')}
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-3 w-5 h-5 text-gray-500" />
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:bg-black/50 transition-all outline-none resize-none"
                      placeholder={t('yourMessage')}
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-3 ${
                    formStatus === 'sending'
                      ? 'bg-gray-600 cursor-not-allowed'
                      : formStatus === 'success'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                      : formStatus === 'error'
                      ? 'bg-gradient-to-r from-red-600 to-pink-600'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                  }`}
                  whileHover={{ scale: formStatus === 'idle' ? 1.02 : 1 }}
                  whileTap={{ scale: formStatus === 'idle' ? 0.98 : 1 }}
                >
                  {formStatus === 'sending' ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>{t('sending') || 'Sende...'}</span>
                    </>
                  ) : formStatus === 'success' ? (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>{t('emailSuccess')}</span>
                    </>
                  ) : formStatus === 'error' ? (
                    <span>{t('emailError')}</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('sendMessage')}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
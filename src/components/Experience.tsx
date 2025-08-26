import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Briefcase, GraduationCap, Code2, Folder, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Haba from '../assets/Haba.png';
import Huk from '../assets/Huk2.svg';
import Kapp from '../assets/Kapp.svg';

export function Experience() {
  const ref = useRef(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const experiences = [
    {
      id: 'web-developer-huk-2025',
      title: t('webDeveloperHUKCoburg'),
      company: t('HUKCoburg'),
      location: t('coburgGermany') || 'Coburg, Deutschland',
      period: t('julyPresent') || 'Juli 2025 - Heute',
      description: t('webDeveloperHUKCoburgDescription'),
      technologies: ['Angular', 'TypeScript', 'Jenkins', 'AWS'],
      icon: Briefcase,
      color: 'from-blue-600 to-cyan-600',
      image: Huk,
      url: 'https://www.huk.de',
      current: true
    },
    {
      id: 'apprenticeship-huk-2022',
      title: t('apprenticeshipHUKCoburg'),
      company: t('HUKCoburg'),
      location: t('coburgGermany') || 'Coburg, Deutschland',
      period: t('septemberJune') || 'Sept. 2022 - Juni 2025',
      description: t('apprenticeshipHUKCoburgDescription'),
      technologies: ['Angular', 'TypeScript', 'CI/CD', 'AWS'],
      icon: GraduationCap,
      color: 'from-purple-600 to-pink-600',
      image: Huk,
      url: 'https://www.huk.de'
    },
    {
      id: 'internship-kapp-2020',
      title: t('internshipKapp'),
      company: 'KAPP NILES',
      location: t('coburgGermany') || 'Coburg, Deutschland',
      period: t('aprilJune2020') || 'Apr. 2020 - Jun. 2020',
      description: t('internshipKappDescription'),
      technologies: ['HTML', 'CSS', 'JavaScript', 'MongoDB'],
      icon: Code2,
      color: 'from-orange-600 to-red-600',
      image: Kapp,
      url: 'https://www.kapp-niles.com'
    },
    {
      id: 'internship-haba-2013',
      title: t('internshipHaba'),
      company: 'HABA',
      location: t('badRodachGermany') || 'Bad Rodach, Deutschland',
      period: t('october2013') || 'Okt. 2013',
      description: t('internshipHabaDescription'),
      technologies: ['Java'],
      icon: Folder,
      color: 'from-green-600 to-emerald-600',
      image: Haba,
      url: 'https://habafamilygroup.com'
    }
  ];

  return (
    <section
      ref={ref}
      id="experience"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-indigo-900/20 to-gray-900" />
      
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
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
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('experience')}
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('experienceSubtitle') || 'My professional journey and growth as a developer'}
          </p>
        </motion.div>

        {/* Experience cards */}
        <div className="grid gap-8 md:gap-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.05] border border-white/10 backdrop-blur-sm hover:from-white/[0.05] hover:to-white/[0.08] transition-all duration-500">
                {/* Current indicator */}
                {exp.current && (
                  <div className="absolute -top-3 right-8">
                    <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-green-400 font-medium">{t('current') || 'Aktuell'}</span>
                    </span>
                  </div>
                )}

                <div className="grid md:grid-cols-[auto,1fr] gap-6">
                  {/* Company logo */}
                  <div className="flex items-start">
                    <a href={exp.url} target="_blank" rel="noopener noreferrer" className="relative group/logo">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/10 p-3 group-hover/logo:scale-110 transition-transform duration-300 cursor-pointer">
                        <img src={exp.image} alt={exp.company} className="w-full h-full object-contain" />
                      </div>
                      <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-lg bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg`}>
                        <exp.icon className="w-5 h-5 text-white" />
                      </div>
                    </a>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-blue-400">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 text-gray-300 hover:border-white/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover effect gradient */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105"
          >
            {t('letWorkTogether') || "Let's work together"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
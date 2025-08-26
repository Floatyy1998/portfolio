import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import { useRef } from 'react';
import Portfolio from '../assets/Portfolio.jpg';
import Serien from '../assets/Serien.jpg';
import WatchRadar from '../assets/WatchRadar.jpg';
import { useLanguage } from '../context/LanguageContext';

export function Projects() {
  const { t } = useLanguage();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const projects = [
    {
      title: t('SeriesTitle'),
      description: t('SeriesDescription'),
      tech: ['React', 'Node.js', 'Firebase', 'Material-UI', 'TypeScript'],
      github: 'https://github.com/Floatyy1998/Serien-Ranking',
      live: 'https://tv-rank.de',
      image: Serien,
      features: [
        t('responsiveDesign'),
        t('firebaseAuth'),
        t('realTimeUpdates'),
      ],
      color: 'from-blue-500 to-purple-500',
    },
    {
      title: t('WatchRadarTitle'),
      description: t('WatchRadarDescription'),
      tech: ['React', 'Node.js', 'Firebase', 'Tailwind CSS', 'TypeScript'],
      github: 'https://github.com/Floatyy1998/WatchRadar',
      live: 'https://watchradar.konrad-dinges.de',
      image: WatchRadar,
      features: [t('modernUI'), t('cloudStorage'), t('userAuthentication')],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: t('portfolioWebsiteTitle'),
      description: t('portfolioWebsiteDescription'),
      tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'TypeScript'],
      github: 'https://github.com/Floatyy1998/portfolio',
      live: 'https://konrad-dinges.de',
      image: Portfolio,
      features: [t('animations'), t('darkMode'), t('multiLanguage')],
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <section
      ref={ref}
      id='projects'
      className='relative py-32 bg-gradient-to-b from-gray-900 to-slate-900'
    >
      <motion.div className='max-w-7xl mx-auto px-6' style={{ opacity }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-20'
        >
          <h2 className='text-5xl md:text-6xl font-bold mb-4'>
            <span className='text-gradient'>{t('projects')}</span>
          </h2>
          <div className='w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500' />
        </motion.div>

        {/* Featured projects grid */}
        <div className='space-y-32'>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${
                index % 2 === 0 ? '' : 'lg:flex-row-reverse'
              }`}
            >
              <div className='grid lg:grid-cols-2 gap-12 items-center'>
                {/* Project image */}
                <div className='relative group overflow-hidden rounded-2xl'>
                  <a
                    href={project.live}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500 z-10`}
                    />
                    <div className='aspect-video bg-white/5 rounded-2xl overflow-hidden'>
                      <img
                        src={project.image}
                        alt={project.title}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                      />
                    </div>
                  </a>
                </div>

                {/* Project details */}
                <div className={index % 2 === 0 ? '' : 'lg:order-first'}>
                  <h3 className='text-3xl font-bold text-white mb-4'>
                    {project.title}
                  </h3>

                  <p className='text-white/60 mb-6 leading-relaxed'>
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className='flex flex-wrap gap-3 mb-6'>
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className='px-3 py-1 text-xs glass-card rounded-full text-white/60'
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className='flex flex-wrap gap-3 mb-8'>
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className='px-4 py-2 glass-card rounded-lg text-sm text-white/80 hover:bg-white/[0.05] transition-colors'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className='flex gap-4 mt-6'>
                    {project.github && (
                      <a
                        href={project.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all'
                      >
                        <Github className='w-5 h-5' />
                        <span>{t('viewCode') || 'View Code'}</span>
                      </a>
                    )}
                    <a
                      href={project.live}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-400 hover:from-blue-600/30 hover:to-purple-600/30 hover:border-blue-500/50 transition-all group'
                    >
                      <span>{t('liveDemo') || 'Live Demo'}</span>
                      <ArrowRight className='w-5 h-5 transition-transform group-hover:translate-x-1' />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mt-24 text-center'
        >
          <p className='text-white/60 mb-6'>
            {t('moreProjectsText') || 'Want to see more of my work?'}
          </p>
          <a
            href='https://github.com/Floatyy1998'
            className='inline-flex items-center gap-2 professional-button text-white'
          >
            <Github className='w-5 h-5' />
            {t('viewMoreOnGitHub')}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

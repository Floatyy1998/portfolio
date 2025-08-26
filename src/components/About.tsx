import { motion } from 'framer-motion';
import { Code2, Palette, Rocket, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function About() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Code2,
      title: t('cleanCode'),
      description: t('cleanCodeDesc'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: t('modernDesign'),
      description: t('modernDesignDesc'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Rocket,
      title: t('performance'),
      description: t('performanceDesc'),
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Heart,
      title: t('userFocused'),
      description: t('userFocusedDesc'),
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section id="about" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('aboutMe')}
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            {t('aboutDescription')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.05] border border-white/10 hover:from-white/[0.05] hover:to-white/[0.08] transition-all h-full flex flex-col">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 flex-grow">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.05] border border-white/10"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                3+
              </div>
              <div className="text-gray-400 mt-2">{t('yearsExperience')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                15+
              </div>
              <div className="text-gray-400 mt-2">{t('projectsCompleted')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                10+
              </div>
              <div className="text-gray-400 mt-2">{t('technologiesMastered')}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
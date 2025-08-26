import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, 
  SiTailwindcss, SiFirebase, SiGit, SiDocker,
  SiPython, SiMongodb, SiPostgresql, SiAmazon,
  SiAngular, SiVuedotjs, SiNextdotjs, SiFigma
} from 'react-icons/si';

export function Skills() {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: t('frontend'),
      skills: [
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'Angular', icon: SiAngular, color: '#DD0031' },
        { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      ]
    },
    {
      title: t('backend'),
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'Python', icon: SiPython, color: '#3776AB' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
        { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
      ]
    },
    {
      title: t('tools'),
      skills: [
        { name: 'Git', icon: SiGit, color: '#F05032' },
        { name: 'Docker', icon: SiDocker, color: '#2496ED' },
        { name: 'AWS', icon: SiAmazon, color: '#232F3E' },
        { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      ]
    }
  ];

  return (
    <section id="skills" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-900/10 to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('techStack')}
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('techStackDescription')}
          </p>
        </motion.div>

        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-8 text-center">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <div className="p-6 rounded-xl bg-gradient-to-br from-white/[0.02] to-white/[0.05] border border-white/10 hover:from-white/[0.05] hover:to-white/[0.08] transition-all text-center">
                      <skill.icon 
                        className="w-12 h-12 mx-auto mb-3 transition-all group-hover:scale-110"
                        style={{ color: skill.color }}
                      />
                      <p className="text-sm text-gray-300">{skill.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
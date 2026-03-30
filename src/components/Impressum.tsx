import { motion } from 'framer-motion'
import { LuArrowLeft as ArrowLeft } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function TextBlock({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          <br />
        </span>
      ))}
    </>
  )
}

export function Impressum() {
  const { t } = useLanguage()

  const sections = [
    { title: t.impressum.legalNoticeTitle, text: t.impressum.legalNoticeText },
    {
      title: t.impressum.liabilityContentTitle,
      text: t.impressum.liabilityContentText,
    },
    {
      title: t.impressum.liabilityLinksTitle,
      text: t.impressum.liabilityLinksText,
    },
    { title: t.impressum.copyrightTitle, text: t.impressum.copyrightText },
    {
      title: t.impressum.dataProtectionTitle,
      text: t.impressum.dataProtectionText,
    },
  ]

  return (
    <main className="min-h-screen bg-bg text-text px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm mb-12"
          >
            <ArrowLeft size={16} />
            {t.nav.home}
          </Link>

          <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight mb-12">
            {t.impressum.title}
          </h1>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              >
                <h2 className="font-display font-bold text-xl text-text mb-4">
                  {section.title}
                </h2>
                <div className="text-text-muted text-sm leading-relaxed">
                  <TextBlock text={section.text} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}

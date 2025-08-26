import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { ScrollProgress } from './components/ScrollProgress';
import { SplashScreen } from './components/SplashScreen';
import { Footer } from './components/Footer';
import { Impressum } from './components/Impressum';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showImpressum, setShowImpressum] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <SplashScreen key="splash" onComplete={handleLoadingComplete} />
      ) : showImpressum ? (
        <Impressum onClose={() => setShowImpressum(false)} />
      ) : (
        <>
          <ScrollProgress />
          <Navigation />
          <main className="relative bg-black text-white overflow-hidden">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
            <Footer onImpressumClick={() => setShowImpressum(true)} />
          </main>
        </>
      )}
    </AnimatePresence>
  );
}
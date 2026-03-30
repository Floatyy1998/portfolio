import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Loader } from './components/Loader'
import { Desktop } from './components/Desktop'
import { Impressum } from './components/Impressum'
import { Resume } from './components/Resume'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const skipLoader = location.pathname === '/resume' || location.pathname === '/impressum'

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && !skipLoader ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Desktop />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        )}
      </AnimatePresence>
    </>
  )
}

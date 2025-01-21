import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { About } from './components/About';
import { Career } from './components/Career';
import { Contact } from './components/Contact';
import { Header } from './components/Header';
import { Projects } from './components/Projects';
export function App() {
  return (
    <Router>
      <div className='w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300'>
        <Header />
        <Routes>
          <Route path='/' element={<About />} />
          <Route path='/career' element={<Career />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

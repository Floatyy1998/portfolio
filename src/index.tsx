import { createRoot } from 'react-dom/client';
import { App } from './App';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <LanguageProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </LanguageProvider>
);

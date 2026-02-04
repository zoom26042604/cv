
'use client';

import { useEffect, useRef, useState } from 'react';
import { Moon, Sun, Printer, Download, ExternalLink } from 'lucide-react';

export default function Toolbar() {
  const [isDark, setIsDark] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = localStorage.getItem('cv-theme');
    if (stored) {
      setIsDark(stored === 'dark');
    } else {
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('cv-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handlePrint = () => {
    window.print();
  };

  // Un seul bouton orange pour télécharger le PDF
  return (
    <div className="no-print fixed top-6 right-8 z-50" style={{ pointerEvents: 'none' }}>
      <a
        href="/cv.pdf"
        download="CV_Nathan_FERRE.pdf"
        className="cv-download-btn"
        style={{
          background: '#fab387',
          color: '#24273a',
          fontSize: 15,
          fontWeight: 700,
          padding: '0 22px',
          height: 48,
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          transition: 'all 0.15s',
          boxShadow: '0 2px 8px #0002',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7em',
          marginRight: 0,
          marginTop: 0,
          pointerEvents: 'auto',
        }}
      >
        <Download size={20} />
        Télécharger le CV en PDF
      </a>
    </div>
  );
}

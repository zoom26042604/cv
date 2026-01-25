
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

  // react-to-print gère l'impression PDF
  return (
    <div className="no-print fixed top-4 right-4 flex items-center gap-2 z-50">
      <button
        onClick={() => setIsDark(!isDark)}
        className="p-2 rounded-lg bg-[var(--cv-surface)] border border-[var(--cv-border)] text-[var(--cv-text)] hover:border-[var(--cv-primary)] transition-colors"
        title={isDark ? 'Light Mode' : 'Dark Mode'}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <a
        href="/cv.pdf"
        download="CV_Nathan_FERRE.pdf"
        className="p-2 rounded-lg bg-[var(--cv-surface)] border border-[var(--cv-border)] text-[var(--cv-text)] hover:border-[var(--cv-primary)] transition-colors"
        title="Télécharger PDF (A4, haute qualité)"
      >
        <Download size={20} />
      </a>

      <button
        onClick={handlePrint}
        className="p-2 rounded-lg bg-[var(--cv-surface)] border border-[var(--cv-border)] text-[var(--cv-text)] hover:border-[var(--cv-primary)] transition-colors"
        title="Imprimer"
      >
        <Printer size={20} />
      </button>

      <a
        href="https://nathan-ferre.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-[var(--cv-surface)] border border-[var(--cv-border)] text-[var(--cv-text)] hover:border-[var(--cv-primary)] transition-colors"
        title="Voir Portfolio"
      >
        <ExternalLink size={20} />
      </a>
    </div>
  );
}

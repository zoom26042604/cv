"use client";

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download } from 'lucide-react';

export default function PdfPrintButton() {
  const contentRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "CV_Nathan_FERRE",
  });

  // On utilise useEffect pour assigner la ref au bon élément
  if (typeof window !== 'undefined') {
    const cvContent = document.getElementById('cv-content');
    if (cvContent && contentRef.current !== cvContent) {
      (contentRef as any).current = cvContent;
    }
  }

  return (
    <button
      onClick={handlePrint}
      className="p-2 rounded-lg bg-[var(--cv-surface)] border border-[var(--cv-border)] text-[var(--cv-text)] hover:border-[var(--cv-primary)] transition-colors"
      title="Télécharger PDF"
    >
      <Download size={20} />
    </button>
  );
}

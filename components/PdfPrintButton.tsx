"use client";

import * as ReactToPrintModule from 'react-to-print';
const ReactToPrint = ReactToPrintModule.default || ReactToPrintModule;
import { Download } from 'lucide-react';

export default function PdfPrintButton() {
  return (
    <ReactToPrint
      trigger={() => (
        <button
          className="p-2 rounded-lg bg-[var(--cv-surface)] border border-[var(--cv-border)] text-[var(--cv-text)] hover:border-[var(--cv-primary)] transition-colors"
          title="Télécharger PDF"
        >
          <Download size={20} />
        </button>
      )}
      content={() => document.getElementById('cv-content') as HTMLDivElement}
      documentTitle="CV_Nathan_FERRE"
      pageStyle="@page { size: A4; margin: 0; }"
    />
  );
}

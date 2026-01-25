'use client';

import { cvData } from '@/data/cv-data';

export default function LanguagesAndInterests() {
  const { languages, interests } = cvData;

  return (
    <>
      {/* Languages */}
      <section className="cv-section">
        <h2 className="cv-section-title">Langues</h2>
        {languages.map((lang) => (
          <div key={lang.name} className="cv-language-item">
            <span className="cv-language-name">{lang.name}</span>
            <span className="cv-language-level">{lang.level}</span>
          </div>
        ))}
      </section>

      {/* Interests */}
      {interests && interests.length > 0 && (
        <section className="cv-section">
          <h2 className="cv-section-title">Centres d'intérêt</h2>
          <div className="cv-skills-grid">
            {interests.map((interest, i) => (
              <span key={i} className="cv-skill-tag">{interest}</span>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

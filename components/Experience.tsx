'use client';

import { cvData } from '../data/cv-data';

const TYPE_CONFIG = {
  student:      { label: 'Étudiant' },
  personal:     { label: 'Personnel' },
  professional: { label: 'Professionnel' },
};

export default function Experience() {
  const { experience } = cvData;

  return (
    <section className="cv-section">
      <h2 className="cv-section-title">Expérience</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {experience.map((exp) => {
          const cfg = exp.type ? TYPE_CONFIG[exp.type] : null;

          return (
            <div key={exp.id} className="cv-project-card">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <div className="cv-entry-title">{exp.position}</div>
                  {cfg && <span className="cv-project-badge">{cfg.label}</span>}
                </div>
                <span className="cv-entry-date" style={{ flexShrink: 0 }}>
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>

              <div className="cv-entry-subtitle" style={{ marginBottom: '0.25rem' }}>
                {exp.company} · {exp.location}
              </div>

              <div className="cv-entry-description" style={{ marginBottom: exp.technologies?.length ? '0.4rem' : 0 }}>
                <ul>
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {exp.technologies && exp.technologies.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="cv-tech-tag">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

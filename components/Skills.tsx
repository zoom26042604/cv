'use client';

import { cvData } from '../data/cv-data';

export default function Skills() {
  const { skills } = cvData;

  return (
    <section className="cv-section">
      <h2 className="cv-section-title">Compétences</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {skills.map((skillGroup) => (
          <div key={skillGroup.category} style={{ marginBottom: 0 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.35rem' }}>
              {skillGroup.category}
            </div>
            <div className="cv-skills-grid">
              {skillGroup.items.map((skill, i) => (
                <span key={i} className="cv-skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

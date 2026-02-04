'use client';

import { cvData } from '../data/cv-data';

export default function Experience() {
  const { experience } = cvData;

  return (
    <section className="cv-section">
      <h2 className="cv-section-title">Expérience</h2>

      {experience.map((exp) => (
        <div key={exp.id} className="cv-entry">
          <div className="cv-entry-header">
            <div>
              <div className="cv-entry-title">{exp.position}</div>
              <div className="cv-entry-subtitle">{exp.company} • {exp.location}</div>
            </div>
            <span className="cv-entry-date">
              {exp.startDate} – {exp.endDate}
            </span>
          </div>

          <div className="cv-entry-description">
            <ul>
              {exp.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {exp.technologies && (
            <div className="cv-skills-grid" style={{ marginTop: '0.5rem' }}>
              {exp.technologies.map((tech, i) => (
                <span key={i} className="cv-skill-tag">{tech}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

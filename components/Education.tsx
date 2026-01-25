'use client';

import { cvData } from '@/data/cv-data';

export default function Education() {
  const { education } = cvData;

  return (
    <section className="cv-section">
      <h2 className="cv-section-title">Formation</h2>
      {education.map((edu) => (
        <div key={edu.id} className="cv-entry">
          <div className="cv-entry-header">
            <div>
              <div className="cv-entry-title">{edu.degree} - {edu.field}</div>
              <div className="cv-entry-subtitle">{edu.institution} • {edu.location}</div>
            </div>
            <span className="cv-entry-date">
              {edu.startDate} – {edu.endDate}
            </span>
          </div>
          {edu.description && (
            <p className="cv-entry-description" style={{ fontStyle: 'italic', marginTop: '0.3rem' }}>{edu.description}</p>
          )}
          {edu.gpa && (
            <p className="cv-entry-description">
              Moyenne: {edu.gpa}
            </p>
          )}
          {edu.achievements && edu.achievements.length > 0 && (
            <div className="cv-entry-description">
              <ul>
                {edu.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

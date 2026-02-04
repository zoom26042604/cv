'use client';

import { ExternalLink, Github } from 'lucide-react';
import { cvData } from '../data/cv-data';

export default function Projects() {
  const { projetsPerso, projetsEtudiant } = cvData;

  function getProjectDuration(project) {
    if (!project.startDate) return '';
    const start = new Date(project.startDate);
    const end = project.endDate ? new Date(project.endDate) : new Date();
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (diffMonths < 1) return "moins d'un mois";
    if (diffMonths < 12) return `${diffMonths} mois`;
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    return months > 0 ? `${years} an${years > 1 ? 's' : ''} et ${months} mois` : `${years} an${years > 1 ? 's' : ''}`;
  }

  return (
    <>
      <section className="cv-section">
        <h2 className="cv-section-title">Projets Étudiant</h2>
        {projetsEtudiant.map((project) => (
          <div key={project.id} className="cv-entry">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="cv-entry-title">{project.name}</span>
              <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                {getProjectDuration(project)}
              </span>
            </div>
            <p className="cv-entry-description" style={{ marginBottom: '0.25rem' }}>
              {project.description}
            </p>
          </div>
        ))}
      </section>
      <section className="cv-section">
        <h2 className="cv-section-title">Projets Personnels</h2>
        {projetsPerso.map((project) => (
            <div key={project.id} className="cv-entry">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span className="cv-entry-title">{project.name}</span>
                <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                  {getProjectDuration(project)}
                </span>
                <span style={{ display: 'flex', gap: '0.5rem' }}>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-link"
                      title="Démo"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-link"
                      title="GitHub"
                    >
                      <Github size={14} />
                    </a>
                  )}
                </span>
              </div>
              <p className="cv-entry-description" style={{ marginBottom: '0.25rem' }}>
                {project.description}
              </p>
            </div>
        ))}
      </section>
    </>
  );
}

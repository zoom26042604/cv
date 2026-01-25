import Header from '@/components/Header';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import LanguagesAndInterests from '@/components/LanguagesAndInterests';
import ToolbarClientWrapper from '@/components/ToolbarClientWrapper';
import { cvData } from '@/data/cv-data';

export default function Home() {
  return (
    <>
      <ToolbarClientWrapper />
      
      <main className="cv-container">
        <div className="cv-paper" id="cv-content">
          <Header />
          
          {/* Summary */}
          <div className="cv-body">
            <div className="col-span-2" style={{ gridColumn: '1 / -1' }}>
              <section className="cv-section">
                <h2 className="cv-section-title">Profil</h2>
                <p className="cv-entry-description">{cvData.personal.summary}</p>
              </section>
            </div>
          </div>
          
          {/* Main Content - Two columns */}
          <div className="cv-body" style={{ paddingTop: 0 }}>
            {/* Colonne gauche */}
            <div>
              <Projects />
              {/* Langues en bas à gauche */}
              <section className="cv-section">
                <h2 className="cv-section-title">Langues</h2>
                {cvData.languages.map((lang) => (
                  <div key={lang.name} className="cv-language-item">
                    <span className="cv-language-name">{lang.name}</span>
                    <span className="cv-language-level">{lang.level}</span>
                  </div>
                ))}
              </section>
            </div>
            {/* Colonne droite */}
            <div>
              <Skills />
              <Education />
              {/* Centres d'intérêt sous les formations */}
              {cvData.interests && cvData.interests.length > 0 && (
                <section className="cv-section">
                  <h2 className="cv-section-title">Centres d'intérêt</h2>
                  <div className="cv-skills-grid">
                    {cvData.interests.map((interest, i) => (
                      <span key={i} className="cv-skill-tag">{interest}</span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

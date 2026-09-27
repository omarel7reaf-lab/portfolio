import { education } from '../data/portfolioData';
import TiltCard from './TiltCard';

export default function Education() {
  if (!education || (!education.milestones && !education.degree && !education.university)) {
    return null;
  }

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__label">// CHRONOLOGICAL PROGRESSION</span>
          <h2 className="section__title">Educational Journey & Milestones</h2>
          <p className="section__subtitle">
            Step-by-step milestones charting my progression through frontend technologies.
          </p>
        </div>

        {/* Visual Learning Path Stepper with 3D Tilt */}
        {education.learningPath && education.learningPath.length > 0 && (
          <TiltCard
            maxTilt={8}
            className="education__path-card fade-in"
            style={{ marginBottom: '48px', padding: '24px 32px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    display: 'block',
                    marginBottom: '4px',
                    letterSpacing: '1px',
                  }}
                >
                  🚀 LEARNING PIPELINE
                </span>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--heading)', fontWeight: 700 }}>
                  Evolution of Web Engineering Skills
                </h4>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                {education.learningPath.map((step, index) => (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        background:
                          step === 'Bootstrap'
                            ? 'rgba(168, 85, 247, 0.2)'
                            : 'rgba(0, 240, 255, 0.12)',
                        border:
                          step === 'Bootstrap'
                            ? '1px solid rgba(168, 85, 247, 0.5)'
                            : '1px solid rgba(0, 240, 255, 0.3)',
                        color: step === 'Bootstrap' ? '#d8b4fe' : 'var(--primary)',
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {step} {step === 'Bootstrap' && '✔'}
                    </span>
                    {index < education.learningPath.length - 1 && (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>➔</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        )}

        {/* Milestones Timeline */}
        <div className="timeline">
          {education.milestones && education.milestones.length > 0 ? (
            education.milestones.map((item, i) => (
              <div
                key={`${item.year}-${i}`}
                className="timeline__item fade-in"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="timeline__dot" />
                <TiltCard
                  maxTilt={10}
                  className="timeline__content"
                  style={{ padding: '28px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                    <span className="timeline__date">{item.year}</span>
                    {item.badge && (
                      <span className="neon-lab-badge">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="timeline__role">{item.title}</h3>
                  <p className="timeline__desc" style={{ marginTop: '10px', lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                </TiltCard>
              </div>
            ))
          ) : null}
        </div>
      </div>
    </section>
  );
}

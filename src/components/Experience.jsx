import { experience } from '../data/portfolioData';
import TiltCard from './TiltCard';

export default function Experience() {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__label">// HANDS-ON PRACTICAL LAB</span>
          <h2 className="section__title">Experience & Practice</h2>
          <p className="section__subtitle">
            A track record of persistent project-based engineering, code optimization, and interface building.
          </p>
        </div>

        <div className="timeline">
          {experience.map((exp, i) => (
            <div
              key={`${exp.company}-${i}`}
              className="timeline__item fade-in"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="timeline__dot" />
              <TiltCard
                maxTilt={10}
                className="timeline__content"
                style={{ padding: '28px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <span className="timeline__date">{exp.date}</span>
                  <span className="neon-lab-badge">VERIFIED LEARNING</span>
                </div>

                <h3 className="timeline__role">{exp.position}</h3>
                <p className="timeline__company" style={{ color: 'var(--primary-light)', fontWeight: 600 }}>
                  {exp.company}
                </p>

                <p className="timeline__desc" style={{ marginBottom: '16px', lineHeight: 1.7 }}>
                  {exp.description}
                </p>

                {/* Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {exp.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                        }}
                      >
                        <span style={{ color: 'var(--primary)', marginTop: '2px' }}>▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="timeline__tech">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="timeline__tech-tag"
                        style={{
                          border: '1px solid rgba(0, 240, 255, 0.25)',
                          color: 'var(--text)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

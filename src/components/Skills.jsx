import { useState } from 'react';
import { skills } from '../data/portfolioData';
import TiltCard from './TiltCard';

/* Skill icon mapping */
const skillIcons = {
  html5: '🌐',
  css3: '🎨',
  javascript: '⚡',
  responsive: '📱',
  bootstrap: '🅱️',
  react: '⚛️',
  git: '🔀',
  github: '🐙',
  vscode: '💻',
};

export default function Skills() {
  const categories = ['All', ...new Set(skills.map((s) => s.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__label">// TECH STACK & ARSENAL</span>
          <h2 className="section__title">Skills & Technologies</h2>
          <p className="section__subtitle">
            Core frontend tools and frameworks I leverage to engineer responsive, dynamic web solutions.
          </p>
        </div>

        {/* Categories (if applicable) */}
        {categories.length > 2 && (
          <div className="skills__categories fade-in">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`skills__cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* 3D Tilt Skills Grid */}
        <div className="skills__grid">
          {filtered.map((skill, i) => (
            <TiltCard
              key={skill.name}
              maxTilt={14}
              className="skill-card fade-in"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="skill-card__header">
                <div
                  className="skill-card__icon"
                  style={{
                    boxShadow: '0 0 16px rgba(0, 240, 255, 0.25)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                  }}
                >
                  {skillIcons[skill.icon] || '💻'}
                </div>
                <div className="skill-card__info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h4 style={{ margin: 0 }}>{skill.name}</h4>
                    {skill.tag && <span className="neon-tag">{skill.tag}</span>}
                  </div>
                  <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                    {skill.category}
                  </span>
                </div>
              </div>

              <p className="skill-card__desc" style={{ marginTop: '12px', lineHeight: 1.6 }}>
                {skill.description}
              </p>

              <div className="skill-card__bar" style={{ marginTop: '16px' }}>
                <div
                  className="skill-card__bar-fill"
                  style={{
                    width: `${skill.level}%`,
                    background: 'var(--gradient-primary)',
                    boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
                  }}
                />
              </div>

              <div
                className="skill-card__level"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: 'var(--primary)',
                }}
              >
                {skill.level}%
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

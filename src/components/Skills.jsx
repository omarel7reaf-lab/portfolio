import { useState } from 'react';
import { skills } from '../data/portfolioData';
import TiltCard from './TiltCard';
import { playClickSound, playHoverSound } from '../utils/cyberAudio';

/* High-tech icons mapping */
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

export default function Skills({ hyperMode }) {
  const categories = ['All', ...new Set(skills.map((s) => s.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const filtered =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const handleCatSelect = (cat) => {
    playClickSound();
    setActiveCategory(cat);
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Section Header with Bold Heavy Typography */}
        <div className="section__header">
          <div className="section__kicker-badge">
            <span className="kicker-dot" />
            <span>[ 01 // TECHNICAL ARSENAL ]</span>
          </div>
          <h2 className="section__title">
            Skills &amp; <span className="text-gradient">Technologies</span>
          </h2>
          <p className="section__subtitle">
            Core frontend engineering stack tuned for lightning performance, modular scalability, and modern web standards.
          </p>
        </div>

        {/* Categories Bar */}
        {categories.length > 2 && (
          <div className="skills__categories fade-in">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`skills__cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCatSelect(cat)}
                onMouseEnter={playHoverSound}
              >
                <span className="cat-bullet">/</span>
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* 3D Holographic Tilt Skills Grid */}
        <div className="skills__grid">
          {filtered.map((skill, i) => {
            const isHovered = hoveredSkill === skill.name;
            return (
              <TiltCard
                key={skill.name}
                maxTilt={16}
                className={`skill-card fade-in ${hyperMode ? 'skill-card--hyper' : ''}`}
                style={{ transitionDelay: `${i * 0.05}s` }}
                onMouseEnter={() => {
                  playHoverSound();
                  setHoveredSkill(skill.name);
                }}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Holographic scanner top light */}
                <div className="skill-card__scanlight" />

                <div className="skill-card__header">
                  <div
                    className="skill-card__icon"
                    style={{
                      boxShadow: isHovered
                        ? '0 0 25px rgba(0, 240, 255, 0.6), 0 0 50px rgba(168, 85, 247, 0.4)'
                        : '0 0 16px rgba(0, 240, 255, 0.2)',
                    }}
                  >
                    {skillIcons[skill.icon] || '💻'}
                  </div>
                  <div className="skill-card__info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h4 className="skill-card__name">{skill.name}</h4>
                      {skill.tag && <span className="neon-tag">{skill.tag}</span>}
                    </div>
                    <span className="skill-card__category">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <p className="skill-card__desc">
                  {skill.description}
                </p>

                {/* Animated Electric Progress Bar */}
                <div className="skill-card__bar-wrap">
                  <div className="skill-card__bar">
                    <div
                      className="skill-card__bar-fill"
                      style={{
                        width: `${skill.level}%`,
                      }}
                    >
                      <span className="bar-spark" />
                    </div>
                  </div>
                  <div className="skill-card__bar-meta">
                    <span className="bar-label">PROFICIENCY</span>
                    <span className="bar-percent">{skill.level}%</span>
                  </div>
                </div>

                {/* Cyber footer status */}
                <div className="skill-card__footer">
                  <span className="skill-status-light" />
                  <span className="skill-status-text">
                    {skill.level >= 90
                      ? 'ADVANCED MASTERY'
                      : skill.level >= 80
                      ? 'PRODUCTION READY'
                      : 'ACTIVE EVOLUTION'}
                  </span>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

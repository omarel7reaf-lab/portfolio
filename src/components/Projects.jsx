import { useState } from 'react';
import { projects, projectCategories } from '../data/portfolioData';
import TiltCard from './TiltCard';
import { playClickSound, playHoverSound } from '../utils/cyberAudio';

export default function Projects({ onProjectClick, hyperMode }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredCard, setHoveredCard] = useState(null);

  if (!projects || projects.length === 0) return null;

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleFilterClick = (cat) => {
    playClickSound();
    setActiveFilter(cat);
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'React':
        return '#00f0ff';
      case 'Bootstrap':
        return '#a855f7';
      case 'JavaScript':
        return '#fbbf24';
      default:
        return '#00ff9d';
    }
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section__header">
          <div className="section__kicker-badge">
            <span className="kicker-dot" />
            <span>[ 02 // PROVEN BUILDS &amp; ARCHITECTURE ]</span>
          </div>
          <h2 className="section__title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section__subtitle">
            Engineered web applications, high-performance user interfaces, and interactive prototypes built for speed and elegance.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="projects__filters fade-in">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              className={`projects__filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => handleFilterClick(cat)}
              onMouseEnter={playHoverSound}
            >
              <span className="filter-bullet">◆</span>
              {cat === 'All' ? 'All Builds' : cat}
            </button>
          ))}
        </div>

        {/* 3D Holographic Tilt Project Cards Grid */}
        <div className="projects__grid">
          {filtered.map((project, i) => {
            const isHovered = hoveredCard === project.id;
            const catColor = getCategoryColor(project.category);

            return (
              <TiltCard
                key={project.id}
                maxTilt={14}
                className={`project-card fade-in ${hyperMode ? 'project-card--hyper' : ''}`}
                style={{ transitionDelay: `${i * 0.07}s`, padding: 0 }}
                onClick={() => {
                  playClickSound();
                  onProjectClick(project);
                }}
                onMouseEnter={() => {
                  playHoverSound();
                  setHoveredCard(project.id);
                }}
                onMouseLeave={() => setHoveredCard(null)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    playClickSound();
                    onProjectClick(project);
                  }
                }}
                aria-label={`View details for ${project.name}`}
              >
                {/* Holographic foil sheen overlay */}
                <div className="project-card__sheen" />

                {/* Visual Preview Header */}
                <div
                  className="project-card__image"
                  style={{
                    background:
                      project.category === 'React'
                        ? 'radial-gradient(circle at 50% 30%, rgba(0,240,255,0.25) 0%, rgba(168,85,247,0.15) 60%, rgba(10,11,26,0.95) 100%)'
                        : project.category === 'Bootstrap'
                        ? 'radial-gradient(circle at 50% 30%, rgba(168,85,247,0.25) 0%, rgba(217,70,239,0.15) 60%, rgba(10,11,26,0.95) 100%)'
                        : 'radial-gradient(circle at 50% 30%, rgba(251,191,36,0.25) 0%, rgba(0,240,255,0.12) 60%, rgba(10,11,26,0.95) 100%)',
                  }}
                >
                  {/* Cyber Grid Texture */}
                  <div className="project-card__grid-bg" />

                  {/* Corner cyber brackets */}
                  <span className="card-corner card-corner--tl" />
                  <span className="card-corner card-corner--tr" />

                  <div className="project-card__badge-row">
                    <span
                      className="category-pill"
                      style={{
                        borderColor: `${catColor}55`,
                        color: catColor,
                        background: `${catColor}15`,
                      }}
                    >
                      <span className="category-dot" style={{ background: catColor }} />
                      {project.category}
                    </span>
                    <span className="id-tag">#{String(i + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="project-card__icon-display">
                    <span className="proj-icon">
                      {project.category === 'React'
                        ? '⚛️'
                        : project.category === 'Bootstrap'
                        ? '🅱️'
                        : '⚡'}
                    </span>
                    <h3 className="proj-headline">{project.name}</h3>
                  </div>

                  {/* Laser line on hover */}
                  <div className="project-card__laser" />
                </div>

                {/* Card Content */}
                <div className="project-card__body">
                  <p className="project-card__desc">
                    {project.shortDescription || project.description || ''}
                  </p>

                  {/* Tech stack pill tags */}
                  <div className="project-card__tech">
                    {(project.technologies || project.tech || []).map((t) => (
                      <span key={t} className="tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Card Action Footer */}
                  <div className="project-card__footer">
                    <div className="project-card__cta-hint">
                      <span>VIEW SPECS &amp; CODE</span>
                      <span className="cta-arrow">→</span>
                    </div>

                    <div className="project-card__links" onClick={(e) => e.stopPropagation()}>
                      {(project.liveUrl || project.demoUrl) && (
                        <a
                          href={project.liveUrl || project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card__ext-btn"
                          title="Open Live Deployment"
                          onClick={() => playClickSound()}
                          onMouseEnter={playHoverSound}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          <span>LIVE</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card__ext-btn"
                          title="Inspect Source Code"
                          onClick={() => playClickSound()}
                          onMouseEnter={playHoverSound}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          <span>REPO</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

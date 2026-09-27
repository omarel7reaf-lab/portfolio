import { useState } from 'react';
import { projects, projectCategories } from '../data/portfolioData';
import TiltCard from './TiltCard';

export default function Projects({ onProjectClick }) {
  const [activeFilter, setActiveFilter] = useState('All');

  if (!projects || projects.length === 0) return null;

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__label">// PROVEN CODE WORK</span>
          <h2 className="section__title">Featured Projects</h2>
          <p className="section__subtitle">
            A showcase of web applications and prototypes built with HTML, CSS, JavaScript, Bootstrap, and React.
          </p>
        </div>

        {/* Filters */}
        <div className="projects__filters fade-in">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              className={`projects__filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat === 'All' ? 'All Projects' : cat}
            </button>
          ))}
        </div>

        {/* 3D Tilt Project Cards Grid */}
        <div className="projects__grid">
          {filtered.map((project, i) => (
            <TiltCard
              key={project.id}
              maxTilt={14}
              className="project-card fade-in"
              style={{ transitionDelay: `${i * 0.08}s`, padding: '0' }}
              onClick={() => onProjectClick(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onProjectClick(project);
                }
              }}
              aria-label={`View details for ${project.name}`}
            >
              {/* Visual Preview Header */}
              <div
                className="project-card__image"
                style={{
                  background:
                    project.category === 'React'
                      ? 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(168,85,247,0.25))'
                      : project.category === 'Bootstrap'
                      ? 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(217,70,239,0.2))'
                      : 'linear-gradient(135deg, rgba(234,179,8,0.2), rgba(0,240,255,0.2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '180px',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                      'radial-gradient(rgba(0,240,255,0.15) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />
                <div style={{ textAlign: 'center', zIndex: 1, padding: '16px' }}>
                  <span style={{ fontSize: '2.4rem', display: 'block', marginBottom: '8px' }}>
                    {project.category === 'React'
                      ? '⚛️'
                      : project.category === 'Bootstrap'
                      ? '🅱️'
                      : '⚡'}
                  </span>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: '1rem',
                      color: 'var(--heading)',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {project.name}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="project-card__body" style={{ padding: '24px' }}>
                <span className="project-card__category" style={{ color: 'var(--primary)' }}>
                  {project.category}
                </span>
                <h3 className="project-card__name">{project.name}</h3>
                <p className="project-card__desc" style={{ lineHeight: 1.7 }}>
                  {project.shortDescription}
                </p>
                <div className="project-card__tech" style={{ marginTop: '16px' }}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className="project-card__tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

import { personalInfo } from '../data/portfolioData';
import SocialLinks from './SocialLinks';
import TiltCard from './TiltCard';

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Background Neon Effects */}
      <div className="hero__bg">
        <div
          className="hero__bg-gradient hero__bg-gradient--1"
          style={{
            background: 'radial-gradient(circle, rgba(0,240,255,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="hero__bg-gradient hero__bg-gradient--2"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
          }}
        />
        <div className="hero__bg-grid" />
      </div>

      <div className="container">
        <div className="hero__inner">
          {/* Content */}
          <div className="hero__content">
            {/* Availability Badge */}
            {personalInfo.availabilityBadge && (
              <div className="hero__badge fade-in">
                <span className="hero__badge-dot" />
                {personalInfo.availabilityBadge}
              </div>
            )}

            <p className="hero__greeting fade-in">
              Hello world, I'm <span style={{ color: 'var(--primary)' }}>//</span>
            </p>

            <h1 className="hero__name fade-in">
              <span className="hero__name-gradient">{personalInfo.name}</span>
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <p className="hero__title fade-in" style={{ margin: 0 }}>
                {personalInfo.jobTitle}
              </p>
              <span
                style={{
                  background: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  color: 'var(--primary)',
                  padding: '2px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                }}
              >
                AGE: 11
              </span>
            </div>

            <p className="hero__description fade-in">
              {personalInfo.heroDescription}
            </p>

            {/* Quick Tech Highlights Badge Bar */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }} className="fade-in">
              {['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'React.js'].map((tech) => (
                <span
                  key={tech}
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--card-border)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                  }}
                >
                  ⚡ {tech}
                </span>
              ))}
            </div>

            <div className="hero__buttons fade-in">
              <a
                href="#projects"
                className="btn btn--primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
                Explore Projects
              </a>

              <a
                href="#contact"
                className="btn btn--outline"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                Let's Talk
              </a>
            </div>

            <div style={{ marginTop: '8px' }}>
              <SocialLinks className="hero__social fade-in" />
            </div>
          </div>

          {/* Interactive 3D Avatar Image with Tilt */}
          <div className="hero__image-wrapper fade-in">
            <TiltCard
              maxTilt={14}
              style={{
                borderRadius: 'var(--radius-xl)',
                padding: '0',
                background: 'transparent',
                border: 'none',
              }}
            >
              <div className="hero__image-container">
                <div
                  className="hero__image-glow"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,240,255,0.4), rgba(168,85,247,0.3))',
                    filter: 'blur(50px)',
                  }}
                />

                <img
                  src="/avatar.jpg"
                  alt={personalInfo.name}
                  className="hero__image"
                  style={{
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-xl)',
                    border: '2px solid rgba(0, 240, 255, 0.4)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(0, 240, 255, 0.3)',
                  }}
                />

                {/* Floating 3D Tech Cards */}
                <div className="hero__float-card hero__float-card--1">
                  <span className="hero__float-icon">⚛️</span>
                  <span>React.js</span>
                </div>
                <div className="hero__float-card hero__float-card--2">
                  <span className="hero__float-icon">🅱️</span>
                  <span>Bootstrap 5</span>
                </div>
                <div className="hero__float-card hero__float-card--3">
                  <span className="hero__float-icon">⚡</span>
                  <span>JavaScript</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}

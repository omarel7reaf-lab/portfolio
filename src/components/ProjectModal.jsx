import { useEffect, useCallback } from 'react';
import { playClickSound, playHoverSound } from '../utils/cyberAudio';

export default function ProjectModal({ project, onClose }) {
  /* Close on Escape */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    const timer = setTimeout(() => {
      document.querySelector('.modal-overlay')?.classList.add('open');
    }, 10);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [handleKeyDown]);

  /* Close on overlay click */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const isValidUrl = (url) => {
    if (!url) return false;
    return !['YOUR_', 'PLACEHOLDER', '#', ''].some((p) =>
      url.toUpperCase().startsWith(p)
    );
  };

  return (
    <div
      className="modal-overlay open"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.name}`}
    >
      <div className="modal" role="document">
        {/* Close Button */}
        <button
          className="modal__close"
          onClick={() => {
            playClickSound();
            onClose();
          }}
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header Visual Banner */}
        <div
          className="modal__image"
          style={{
            background: 'linear-gradient(135deg, rgba(0,240,255,0.3), rgba(168,85,247,0.35))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '160px',
            fontSize: '1.2rem',
            fontWeight: 800,
            color: '#fff',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>
            {project.category === 'React' ? '⚛️' : project.category === 'Bootstrap' ? '🅱️' : '⚡'}
          </span>
          <span style={{ fontFamily: 'var(--font-heading)' }}>{project.name}</span>
        </div>

        {/* Body */}
        <div className="modal__body">
          <span className="modal__category" style={{ color: 'var(--primary)' }}>
            {project.category}
          </span>
          <h2 className="modal__title">{project.name}</h2>
          <p className="modal__desc" style={{ lineHeight: 1.8 }}>
            {project.fullDescription}
          </p>

          {/* Technologies */}
          <div className="modal__section">
            <h3 className="modal__section-title">Technologies Used</h3>
            <div className="modal__tech">
              {project.technologies.map((tech) => (
                <span key={tech} className="modal__tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="modal__section">
              <h3 className="modal__section-title">Key Engineering Features</h3>
              <div className="modal__features">
                {project.features.map((feature) => (
                  <div key={feature} className="modal__feature">
                    <span className="modal__feature-icon" style={{ color: 'var(--primary)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problems Solved */}
          {project.problemsSolved && (
            <div className="modal__section">
              <h3 className="modal__section-title">Challenges & Solutions</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {project.problemsSolved}
              </p>
            </div>
          )}

          {/* Results */}
          {project.results && (
            <div className="modal__section">
              <h3 className="modal__section-title">Key Takeaways & Results</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {project.results}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="modal__buttons" style={{ marginTop: '24px' }}>
            {isValidUrl(project.liveUrl) ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
                Live Demo
              </a>
            ) : null}

            {isValidUrl(project.githubUrl) ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View Code (GitHub)
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

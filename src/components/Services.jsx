import { services } from '../data/portfolioData';
import TiltCard from './TiltCard';

const serviceIcons = {
  code: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  layout: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  zap: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

export default function Services() {
  if (!services || services.length === 0) return null;

  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__label">// WHAT I BRING TO THE TABLE</span>
          <h2 className="section__title">Services & Solutions</h2>
          <p className="section__subtitle">
            Focused capabilities in building modern, responsive, and engaging web applications.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, i) => (
            <TiltCard
              key={service.title}
              maxTilt={13}
              className="service-card fade-in"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className="service-card__icon"
                style={{
                  color: 'var(--primary)',
                  boxShadow: '0 0 16px rgba(0, 240, 255, 0.25)',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                }}
              >
                {serviceIcons[service.icon] || serviceIcons.code}
              </div>

              <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                <span className="neon-tag">{service.category || 'FRONTEND'}</span>
              </div>

              <h3 className="service-card__title" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>
                {service.title}
              </h3>

              <p className="service-card__desc" style={{ lineHeight: 1.8 }}>
                {service.description}
              </p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

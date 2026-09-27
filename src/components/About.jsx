import { useState, useEffect, useRef } from 'react';
import { aboutData, personalInfo } from '../data/portfolioData';
import TiltCard from './TiltCard';

/* Bi-directional animated counter hook */
function useBiDirectionalCounter(target, duration = 1200) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const currentValRef = useRef(0);
  const animFrameRef = useRef(null);
  const targetNum = typeof target === 'string' ? parseInt(target, 10) : target;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let targetValue = -1;

    const animateTo = (newTarget) => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      const startValue = currentValRef.current;
      const change = newTarget - startValue;
      if (change === 0) return;

      const startTime = performance.now();
      const animDuration = Math.min(duration, Math.max(500, Math.abs(change) * 20));

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / animDuration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startValue + change * eased);
        currentValRef.current = current;
        setDisplayValue(current);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        }
      };
      animFrameRef.current = requestAnimationFrame(step);
    };

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // In viewport reading zone
      const isInView = rect.top < windowHeight * 0.88 && rect.bottom > windowHeight * 0.12;
      const desiredTarget = isInView ? targetNum : 0;

      if (desiredTarget !== targetValue) {
        targetValue = desiredTarget;
        animateTo(desiredTarget);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetNum, duration]);

  const suffix =
    typeof target === 'string' && target.includes('%')
      ? '%'
      : typeof target === 'string' && target.includes('+')
      ? '+'
      : '';

  return [ref, `${displayValue}${suffix}`];
}

function StatCard({ stat }) {
  const [ref, value] = useBiDirectionalCounter(stat.value);
  return (
    <TiltCard maxTilt={10} className="about__stat" style={{ padding: '20px', minHeight: 'auto' }}>
      <div ref={ref} style={{ width: '100%' }}>
        <div className="about__stat-value" style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
          {value}
        </div>
        <div className="about__stat-label">{stat.label}</div>
      </div>
    </TiltCard>
  );
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__label">// DISCOVER THE CREATOR</span>
          <h2 className="section__title">About Me</h2>
          <p className="section__subtitle">
            Crafting futuristic, high-performance web experiences with code and relentless curiosity.
          </p>
        </div>

        <div className="about__inner">
          {/* Avatar with 3D Tilt */}
          <div className="about__image-section fade-in-left">
            <TiltCard
              maxTilt={12}
              style={{
                maxWidth: '380px',
                margin: '0 auto',
                padding: '0',
                background: 'transparent',
                border: 'none',
              }}
            >
              <div style={{ position: 'relative', width: '100%' }}>
                <img
                  src="/avatar.jpg"
                  alt={personalInfo.name}
                  className="about__image"
                  style={{
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-xl)',
                    border: '2px solid rgba(0, 240, 255, 0.4)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(168, 85, 247, 0.25)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-14px',
                    left: '20px',
                    background: 'var(--card)',
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    boxShadow: 'var(--shadow-glow)',
                  }}
                >
                  🚀 11 YEARS OLD // FRONTEND DEV
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Content */}
          <div className="about__content fade-in-right">
            <h3 style={{ fontSize: '1.4rem', color: 'var(--heading)', fontWeight: 700, marginBottom: '16px' }}>
              {aboutData.headline}
            </h3>

            <p className="about__text" style={{ marginBottom: '16px', lineHeight: 1.8 }}>
              {aboutData.biography}
            </p>

            <p className="about__text" style={{ marginBottom: '24px', lineHeight: 1.8 }}>
              {aboutData.biographyPart2}
            </p>

            <div className="about__highlights" style={{ marginBottom: '28px' }}>
              {aboutData.interests.map((interest) => (
                <div key={interest} className="about__highlight-item">
                  <span className="about__highlight-icon" style={{ color: 'var(--primary)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{interest}</span>
                </div>
              ))}
            </div>

            {/* Philosophy Callout */}
            {aboutData.philosophy && (
              <div
                style={{
                  borderLeft: '3px solid var(--primary)',
                  paddingLeft: '16px',
                  marginBottom: '32px',
                  background: 'var(--gradient-subtle)',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <p className="about__text" style={{ fontStyle: 'italic', margin: 0, color: 'var(--heading)' }}>
                  "{aboutData.philosophy}"
                </p>
              </div>
            )}

            {/* Stats with 3D Tilt */}
            {aboutData.stats && aboutData.stats.length > 0 && (
              <div className="about__stats">
                {aboutData.stats.map((stat) => (
                  <StatCard key={stat.label} stat={stat} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

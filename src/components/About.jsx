import { useState, useEffect, useRef } from 'react';
import { aboutData, personalInfo } from '../data/portfolioData';
import TiltCard from './TiltCard';
import { playHoverSound } from '../utils/cyberAudio';

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
    <TiltCard
      maxTilt={12}
      className="about__stat"
      style={{ padding: '22px', minHeight: 'auto' }}
      onMouseEnter={playHoverSound}
    >
      <div ref={ref} style={{ width: '100%' }}>
        <div
          className="about__stat-value"
          style={{
            color: 'var(--primary)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: '2.4rem',
            letterSpacing: '-1px',
          }}
        >
          {value}
        </div>
        <div className="about__stat-label" style={{ fontWeight: 700, letterSpacing: '0.5px' }}>
          {stat.label}
        </div>
      </div>
    </TiltCard>
  );
}

export default function About({ hyperMode }) {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section__header">
          <div className="section__kicker-badge">
            <span className="kicker-dot" />
            <span>[ 03 // ORIGIN &amp; PHILOSOPHY ]</span>
          </div>
          <h2 className="section__title">
            About <span className="text-gradient">The Creator</span>
          </h2>
          <p className="section__subtitle">
            Crafting futuristic, high-performance web experiences with code and relentless curiosity.
          </p>
        </div>

        <div className="about__inner">
          {/* Avatar Column with 3D Holographic Card */}
          <div className="about__image-section fade-in-left">
            <TiltCard
              maxTilt={14}
              style={{
                maxWidth: '380px',
                margin: '0 auto',
                padding: '0',
                background: 'transparent',
                border: 'none',
              }}
            >
              <div style={{ position: 'relative', width: '100%' }}>
                {/* Cyber corner brackets */}
                <span className="card-corner card-corner--tl" />
                <span className="card-corner card-corner--tr" />
                <span className="card-corner card-corner--bl" />
                <span className="card-corner card-corner--br" />

                <img
                  src="/avatar.jpg"
                  alt={personalInfo.name}
                  className="about__image"
                  style={{
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-xl)',
                    border: '2px solid rgba(0, 240, 255, 0.4)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(168, 85, 247, 0.3)',
                    display: 'block',
                    width: '100%',
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
                    border: '1px solid rgba(0, 240, 255, 0.4)',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    color: 'var(--primary)',
                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.35)',
                    letterSpacing: '1px',
                  }}
                >
                  ⚡ 11 YEARS OLD // FRONTEND PRODIGY
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Content Column */}
          <div className="about__content fade-in-right">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--primary)',
                fontWeight: 700,
              }}
            >
              <span>// MISSION DIRECTIVE</span>
            </div>

            <h3
              style={{
                fontSize: '1.75rem',
                color: 'var(--heading)',
                fontWeight: 800,
                marginBottom: '18px',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '-0.5px',
                lineHeight: 1.3,
              }}
            >
              {aboutData.headline}
            </h3>

            <p className="about__text" style={{ marginBottom: '16px', lineHeight: 1.8, fontSize: '1.05rem' }}>
              {aboutData.biography}
            </p>

            <p className="about__text" style={{ marginBottom: '24px', lineHeight: 1.8, fontSize: '1.05rem' }}>
              {aboutData.biographyPart2}
            </p>

            <div className="about__highlights" style={{ marginBottom: '28px' }}>
              {aboutData.interests.map((interest) => (
                <div
                  key={interest}
                  className="about__highlight-item"
                  onMouseEnter={playHoverSound}
                >
                  <span className="about__highlight-icon" style={{ color: 'var(--primary)' }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span style={{ fontWeight: 600 }}>{interest}</span>
                </div>
              ))}
            </div>

            {/* Philosophy Callout */}
            {aboutData.philosophy && (
              <div
                style={{
                  borderLeft: '4px solid var(--primary)',
                  padding: '18px 24px',
                  marginBottom: '32px',
                  background: 'var(--gradient-subtle)',
                  borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                  boxShadow: '0 0 30px rgba(0, 240, 255, 0.05)',
                }}
              >
                <p
                  className="about__text"
                  style={{
                    fontStyle: 'italic',
                    margin: 0,
                    color: 'var(--heading)',
                    fontSize: '1.05rem',
                    fontWeight: 500,
                  }}
                >
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

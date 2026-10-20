import { useEffect, useRef, useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import SocialLinks from './SocialLinks';
import TiltCard from './TiltCard';
import { playClickSound, playHoverSound, playWarpSound } from '../utils/cyberAudio';

export default function Hero({ onOpenTerminal, hyperMode }) {
  const nameRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [decipherText, setDecipherText] = useState('FRONTEND ENGINEER & UI/UX ARCHITECT');

  // Cyber decipher text effect
  useEffect(() => {
    const target = 'FRONTEND ENGINEER & UI/UX ARCHITECT';
    const chars = '01#@$%&*<>~/\\';
    let iter = 0;
    const interval = setInterval(() => {
      setDecipherText((prev) =>
        target
          .split('')
          .map((char, index) => {
            if (index < iter) return target[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      if (iter >= target.length) {
        clearInterval(interval);
      }
      iter += 1 / 2;
    }, 28);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) {
      setIsLoaded(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.1,
        onComplete: () => setIsLoaded(true),
      });

      // Badge entrance
      tl.fromTo(
        '.hero__badge',
        { opacity: 0, y: -20, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(2)' }
      );

      // Greeting
      tl.fromTo(
        '.hero__greeting',
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' },
        '-=0.15'
      );

      // Name entrance
      if (nameRef.current) {
        tl.fromTo(
          nameRef.current,
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power4.out' },
          '-=0.15'
        );
      }

      // Title
      tl.fromTo(
        '.hero__title-box',
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' },
        '-=0.15'
      );

      // Description
      tl.fromTo(
        '.hero__description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
        '-=0.2'
      );

      // Stats bar
      tl.fromTo(
        '.hero__stats-bar',
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' },
        '-=0.15'
      );

      // Buttons
      tl.fromTo(
        '.hero__buttons .btn',
        { opacity: 0, y: 15, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.35, ease: 'back.out(1.8)' },
        '-=0.15'
      );

      // Social links
      const socialLinksEl = document.querySelectorAll('.hero__social .social-link');
      if (socialLinksEl && socialLinksEl.length > 0) {
        tl.fromTo(
          socialLinksEl,
          { opacity: 0, y: 10, scale: 0.7 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.3, ease: 'back.out(2)' },
          '-=0.15'
        );
      }

      // Image container
      tl.fromTo(
        '.hero__image-container',
        { opacity: 0, scale: 0.85, rotation: 3 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'power4.out' },
        '-=0.5'
      );

      // Float cards
      tl.fromTo(
        '.hero__float-card',
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, stagger: 0.08, duration: 0.4, ease: 'back.out(2.5)' },
        '-=0.25'
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="home" className={`hero ${hyperMode ? 'hero--hyper' : ''}`}>
      {/* Dynamic Background Neon Pulses */}
      <div className="hero__bg">
        <div
          className="hero__bg-gradient hero__bg-gradient--1"
          style={{
            background: 'radial-gradient(circle, rgba(0,240,255,0.28) 0%, transparent 70%)',
          }}
        />
        <div
          className="hero__bg-gradient hero__bg-gradient--2"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.24) 0%, transparent 70%)',
          }}
        />
        <div className="hero__bg-grid" />
      </div>

      <div className="container">
        <div className="hero__inner">
          {/* Left Content Column */}
          <div className="hero__content" ref={contentRef}>
            {/* Availability Badge */}
            {personalInfo.availabilityBadge && (
              <div
                className="hero__badge"
                onMouseEnter={playHoverSound}
              >
                <span className="hero__badge-dot" />
                <span className="hero__badge-kicker">STATUS:</span>
                {personalInfo.availabilityBadge}
              </div>
            )}

            <p className="hero__greeting">
              SYSTEM ONLINE <span style={{ color: 'var(--primary)' }}>//</span> DISPATCH
            </p>

            {/* Massive Bold Heading */}
            <h1 className="hero__name">
              <span
                className="hero__name-gradient"
                ref={nameRef}
                data-text={personalInfo.name}
              >
                {personalInfo.name}
              </span>
            </h1>

            {/* Decipher Title + Age Tag */}
            <div className="hero__title-box">
              <p className="hero__title-decipher">
                {decipherText}
              </p>
              <span className="hero__age-chip">
                ⚡ AGE 11 PRODIGY
              </span>
            </div>

            {/* Bio Description */}
            <p className="hero__description">
              Obsessed with ultra-fast web experiences, 60fps physics, and cutting-edge frontend architecture.
              Crafting interactive digital experiences with <strong style={{ color: 'var(--primary)' }}>React</strong>, <strong style={{ color: 'var(--accent)' }}>JavaScript ES6+</strong>, and <strong style={{ color: 'var(--secondary)' }}>Advanced CSS</strong>.
            </p>

            {/* Live Performance Stats Bar */}
            <div className="hero__stats-bar">
              <div className="stat-item" onMouseEnter={playHoverSound}>
                <span className="stat-val">60 FPS</span>
                <span className="stat-lbl">BUTTERY PHYSICS</span>
              </div>
              <div className="stat-separator" />
              <div className="stat-item" onMouseEnter={playHoverSound}>
                <span className="stat-val">&lt; 0.5s</span>
                <span className="stat-lbl">RENDER SPEED</span>
              </div>
              <div className="stat-separator" />
              <div className="stat-item" onMouseEnter={playHoverSound}>
                <span className="stat-val">100%</span>
                <span className="stat-lbl">RESPONSIVE</span>
              </div>
              <div className="stat-separator" />
              <div className="stat-item" onMouseEnter={playHoverSound}>
                <span className="stat-val">REACT 19</span>
                <span className="stat-lbl">NEXT-GEN CORE</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero__buttons">
              <a
                href="#projects"
                className="btn btn--primary btn--glow"
                onClick={() => {
                  playWarpSound();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={playHoverSound}
              >
                <span>EXPLORE WORK</span>
                <span className="btn-icon">⚡</span>
              </a>

              <button
                className="btn btn--secondary"
                onClick={() => {
                  playClickSound();
                  onOpenTerminal();
                }}
                onMouseEnter={playHoverSound}
              >
                <span>&gt;_ OPEN TERMINAL</span>
              </button>

              <a
                href="#contact"
                className="btn btn--ghost"
                onClick={() => {
                  playClickSound();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={playHoverSound}
              >
                <span>GET IN TOUCH</span>
                <span>💬</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="hero__social">
              <SocialLinks />
            </div>
          </div>

          {/* Right Column: 3D Holographic Avatar Card */}
          <div className="hero__visual">
            <div className="hero__image-container" ref={imageRef}>
              <TiltCard maxTilt={18} className="hero__card-wrap">
                <div className="hero__image-card">
                  {/* Holographic scanner laser line */}
                  <div className="hero__scanner-line" />

                  {/* Corner cyber brackets */}
                  <span className="bracket bracket--tl" />
                  <span className="bracket bracket--tr" />
                  <span className="bracket bracket--bl" />
                  <span className="bracket bracket--br" />

                  {/* Image */}
                  <img
                    src={personalInfo.avatar || '/avatar.jpg'}
                    alt={personalInfo.name}
                    className="hero__avatar-img"
                    loading="eager"
                  />

                  {/* Hologram gradient overlay */}
                  <div className="hero__hologram-overlay" />

                  {/* Image bottom badge */}
                  <div className="hero__avatar-footer">
                    <span className="status-indicator">
                      <span className="status-dot" />
                      AVAILABLE FOR HIRE
                    </span>
                    <span className="status-code">ID: #OMAR-2026</span>
                  </div>
                </div>
              </TiltCard>

              {/* Floating Badge 1: Experience & Age */}
              <div
                className="hero__float-card hero__float-card--1 float-animation"
                onMouseEnter={playHoverSound}
              >
                <span className="float-icon">🚀</span>
                <div>
                  <div className="float-title">AGE 11 DEV</div>
                  <div className="float-subtitle">CODING SINCE 9</div>
                </div>
              </div>

              {/* Floating Badge 2: Tech Mastery */}
              <div
                className="hero__float-card hero__float-card--2 float-animation-delayed"
                onMouseEnter={playHoverSound}
              >
                <span className="float-icon">⚛️</span>
                <div>
                  <div className="float-title">REACT & JS</div>
                  <div className="float-subtitle">SPEED ARCHITECT</div>
                </div>
              </div>

              {/* Floating Badge 3: 60 FPS Clean Code */}
              <div
                className="hero__float-card hero__float-card--3 float-animation"
                onMouseEnter={playHoverSound}
              >
                <span className="float-icon">💎</span>
                <div>
                  <div className="float-title">CLEAN CODE</div>
                  <div className="float-subtitle">PIXEL-PERFECT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

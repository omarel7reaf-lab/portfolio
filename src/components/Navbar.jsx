import { useState, useEffect, useCallback } from 'react';
import { personalInfo, navLinks } from '../data/portfolioData';
import { playClickSound, playHoverSound, playWarpSound } from '../utils/cyberAudio';

export default function Navbar({
  theme,
  toggleTheme,
  activeSection,
  hyperMode,
  setHyperMode,
  soundEnabled,
  toggleSound,
  onOpenTerminal,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 960) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    playClickSound();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleHyperToggle = () => {
    playWarpSound();
    setHyperMode((prev) => !prev);
  };

  const handleSoundToggle = () => {
    toggleSound();
  };

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''} ${hyperMode ? 'navbar--hyper' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar__inner">
        {/* Logo */}
        <a
          href="#home"
          className="navbar__logo"
          onClick={(e) => handleNavClick(e, '#home')}
          onMouseEnter={playHoverSound}
        >
          <span
            className="navbar__logo-icon"
            style={{
              background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
              boxShadow: hyperMode
                ? '0 0 25px rgba(0, 240, 255, 0.8), 0 0 40px rgba(168, 85, 247, 0.5)'
                : '0 0 16px rgba(0, 240, 255, 0.4)',
            }}
          >
            ⚡
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span className="navbar__logo-name">
              {personalInfo.name}
            </span>
            <span
              style={{
                fontSize: '0.64rem',
                fontFamily: 'var(--font-mono)',
                color: hyperMode ? 'var(--hot)' : 'var(--primary)',
                letterSpacing: '1.5px',
                fontWeight: 600,
              }}
            >
              {hyperMode ? '⚡ OVERCLOCKED 3X' : 'NEON LAB // v4.2'}
            </span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${
                  activeSection === link.href.slice(1) ? 'active' : ''
                }`}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={playHoverSound}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions & Dynamic Speed Controls */}
        <div className="navbar__actions">
          {/* Hyper-Drive Speed Mode Toggle */}
          <button
            className={`navbar__hyper-btn ${hyperMode ? 'active' : ''}`}
            onClick={handleHyperToggle}
            onMouseEnter={playHoverSound}
            title={hyperMode ? 'Hyper Speed Active! Click to normalize' : 'Engage 3x Warp Speed!'}
            aria-label="Toggle Hyper Speed Mode"
          >
            <span className="hyper-icon">⚡</span>
            <span className="hyper-text">{hyperMode ? 'WARP 3X' : 'HYPER'}</span>
          </button>

          {/* Interactive Terminal Trigger */}
          <button
            className="navbar__terminal-btn"
            onClick={() => {
              playClickSound();
              onOpenTerminal();
            }}
            onMouseEnter={playHoverSound}
            title="Open Interactive Cyber Terminal [>_]"
            aria-label="Open Interactive Terminal"
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>&gt;_</span>
          </button>

          {/* Sound FX Audio Visualizer Toggle */}
          <button
            className={`navbar__sound-btn ${soundEnabled ? 'active' : ''}`}
            onClick={handleSoundToggle}
            onMouseEnter={playHoverSound}
            title={soundEnabled ? 'Sound FX: ON (Click to Mute)' : 'Sound FX: MUTED (Click to Enable)'}
            aria-label="Toggle Sound Effects"
          >
            {soundEnabled ? (
              <span className="sound-bars">
                <span className="bar bar--1" />
                <span className="bar bar--2" />
                <span className="bar bar--3" />
              </span>
            ) : (
              <span style={{ fontSize: '0.9rem', opacity: 0.5 }}>🔇</span>
            )}
          </button>

          {/* Theme Switcher */}
          <button
            className="navbar__theme-btn"
            onClick={() => {
              playClickSound();
              toggleTheme();
            }}
            onMouseEnter={playHoverSound}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          {/* CTA Button */}
          <a
            href="#contact"
            className="navbar__cta"
            onClick={(e) => handleNavClick(e, '#contact')}
            onMouseEnter={playHoverSound}
          >
            Let's Talk
          </a>

          {/* Hamburger Menu */}
          <button
            className={`navbar__hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => {
              playClickSound();
              setMobileOpen((p) => !p);
            }}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`navbar__mobile ${mobileOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', justifyContent: 'center' }}>
          <button
            className={`navbar__hyper-btn ${hyperMode ? 'active' : ''}`}
            onClick={handleHyperToggle}
          >
            ⚡ {hyperMode ? 'WARP 3X ON' : 'HYPER DRIVE'}
          </button>
          <button
            className="navbar__terminal-btn"
            onClick={() => {
              setMobileOpen(false);
              onOpenTerminal();
            }}
          >
            &gt;_ TERMINAL
          </button>
          <button
            className={`navbar__sound-btn ${soundEnabled ? 'active' : ''}`}
            onClick={handleSoundToggle}
          >
            {soundEnabled ? '🔊 SFX ON' : '🔇 MUTED'}
          </button>
        </div>

        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`navbar__link ${
              activeSection === link.href.slice(1) ? 'active' : ''
            }`}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="btn btn--primary"
          style={{ marginTop: 20 }}
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Let's Talk
        </a>
      </div>
    </nav>
  );
}

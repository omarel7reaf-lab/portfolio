import { useState, useEffect, useCallback } from 'react';
import { personalInfo, navLinks } from '../data/portfolioData';

export default function Navbar({ theme, toggleTheme, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Prevent body scroll when mobile nav is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar__inner">
        {/* Logo */}
        <a
          href="#home"
          className="navbar__logo"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          <span
            className="navbar__logo-icon"
            style={{
              background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
              boxShadow: '0 0 16px rgba(0, 240, 255, 0.4)',
            }}
          >
            OA
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>{personalInfo.name}</span>
            <span
              style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--primary)',
                letterSpacing: '1.5px',
              }}
            >
              NEON LAB // v2.6
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
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Theme Switcher */}
          <button
            className="navbar__theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          {/* CTA Button */}
          <a
            href="#contact"
            className="btn btn--primary navbar__cta"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Let's Talk
          </a>

          {/* Hamburger Menu */}
          <button
            className={`navbar__hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen((p) => !p)}
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
          style={{ marginTop: 24 }}
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Let's Talk
        </a>
      </div>
    </nav>
  );
}

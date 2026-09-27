import { personalInfo, navLinks } from '../data/portfolioData';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          {/* Brand Column */}
          <div className="footer__col">
            <h3 className="footer__brand-name">{personalInfo.name}</h3>
            <p className="footer__brand-title">{personalInfo.jobTitle}</p>
            <p className="footer__brand-desc">
              {personalInfo.shortBio || personalInfo.heroDescription}
            </p>
            <div style={{ marginTop: '16px' }}>
              <SocialLinks />
            </div>
          </div>

          {/* Navigation Column */}
          <div className="footer__col">
            <h4 className="footer__col-title">Navigation</h4>
            <ul className="footer__links">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer__link"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    <span>→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="footer__col">
            <h4 className="footer__col-title">Explore</h4>
            <ul className="footer__links">
              {navLinks.slice(4).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer__link"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    <span>→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer__col">
            <h4 className="footer__col-title">Direct Contact</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              📞 {personalInfo.phoneFormatted || personalInfo.phone}
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              ✉️ {personalInfo.email}
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              📍 {personalInfo.location}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {personalInfo.name} • Neon Lab. Engineered with HTML, CSS, JS, Bootstrap & React.
          </p>
          <a
            href="#home"
            className="footer__back-link"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

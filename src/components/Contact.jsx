import { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import SocialLinks from './SocialLinks';
import TiltCard from './TiltCard';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    if (navigator.clipboard && text) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please enter a subject';
    if (!formData.message.trim()) newErrors.message = 'Please enter your message';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    formData.subject || 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  const whatsappLink = `https://wa.me/201000308204?text=${encodeURIComponent(
    `Hi Omar, I am ${formData.name || 'a visitor'}.\nSubject: ${
      formData.subject || 'Portfolio Inquiry'
    }\nMessage: ${formData.message || ''}`
  )}`;

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__label">// TRANSMIT A MESSAGE</span>
          <h2 className="section__title">Get In Touch</h2>
          <p className="section__subtitle">
            Have a project in mind, feedback, or want to collaborate? I'd love to connect with you.
          </p>
        </div>

        <div className="contact__inner">
          {/* Left Info Column with 3D Tilt */}
          <TiltCard
            maxTilt={8}
            className="contact__info fade-in-left"
            style={{ padding: '36px' }}
          >
            <div>
              <h3 className="contact__info-title" style={{ fontSize: '1.4rem' }}>
                Let's Build Something Remarkable Together 🚀
              </h3>
              <p className="contact__info-desc" style={{ marginTop: '12px', lineHeight: 1.8 }}>
                Feel free to connect directly via phone call, WhatsApp, or email. I am always open to exploring new frontend challenges, code reviews, and creative web experiments.
              </p>
            </div>

            <div className="contact__details" style={{ marginTop: '24px' }}>
              {/* Phone */}
              {personalInfo.phone && (
                <div className="contact__detail">
                  <div className="contact__detail-icon" aria-hidden="true" style={{ color: 'var(--primary)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact__detail-label">Phone & WhatsApp</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <a href={`tel:${personalInfo.phone}`} className="contact__detail-value">
                        {personalInfo.phoneFormatted || personalInfo.phone}
                      </a>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                        style={{ fontSize: '0.78rem', color: 'var(--primary)', padding: '2px 6px' }}
                      >
                        {copiedKey === 'phone' ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Email */}
              {personalInfo.email && (
                <div className="contact__detail">
                  <div className="contact__detail-icon" aria-hidden="true" style={{ color: 'var(--primary)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact__detail-label">Email Address</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <a href={`mailto:${personalInfo.email}`} className="contact__detail-value">
                        {personalInfo.email}
                      </a>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(personalInfo.email, 'email')}
                        style={{ fontSize: '0.78rem', color: 'var(--primary)', padding: '2px 6px' }}
                      >
                        {copiedKey === 'email' ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Location */}
              {personalInfo.location && (
                <div className="contact__detail">
                  <div className="contact__detail-icon" aria-hidden="true" style={{ color: 'var(--primary)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact__detail-label">Location</div>
                    <div className="contact__detail-value">{personalInfo.location}</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: '24px' }}>
              <div className="contact__detail-label" style={{ marginBottom: '12px' }}>
                Follow My Tech Journey
              </div>
              <SocialLinks />
            </div>
          </TiltCard>

          {/* Right Form Column with 3D Tilt */}
          <TiltCard
            maxTilt={8}
            className="fade-in-right"
            style={{ padding: '36px' }}
          >
            <form onSubmit={handleSubmit} noValidate>
              <div className="contact__form-grid">
                <div className="contact__form-group">
                  <label className="contact__form-label" htmlFor="contact-name">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className={`contact__form-input ${errors.name ? 'error' : ''}`}
                    autoComplete="name"
                  />
                  {errors.name && <span className="contact__form-error">{errors.name}</span>}
                </div>

                <div className="contact__form-group">
                  <label className="contact__form-label" htmlFor="contact-email">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    className={`contact__form-input ${errors.email ? 'error' : ''}`}
                    autoComplete="email"
                  />
                  {errors.email && <span className="contact__form-error">{errors.email}</span>}
                </div>

                <div className="contact__form-group contact__form-group--full">
                  <label className="contact__form-label" htmlFor="contact-subject">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Frontend Collaboration"
                    className={`contact__form-input ${errors.subject ? 'error' : ''}`}
                  />
                  {errors.subject && <span className="contact__form-error">{errors.subject}</span>}
                </div>

                <div className="contact__form-group contact__form-group--full">
                  <label className="contact__form-label" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message, project idea, or inquiry here..."
                    className={`contact__form-textarea ${errors.message ? 'error' : ''}`}
                    rows={5}
                  />
                  {errors.message && <span className="contact__form-error">{errors.message}</span>}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn--primary contact__form-submit"
                disabled={isSubmitting}
                style={{ marginTop: '20px' }}
              >
                {isSubmitting ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>

              {/* Honest Transparent Feedback per instructions */}
              {submitted && (
                <div
                  className="card scale-in visible"
                  style={{
                    marginTop: '20px',
                    padding: '20px',
                    background: 'rgba(0, 240, 255, 0.08)',
                    borderColor: 'var(--primary)',
                  }}
                  role="status"
                >
                  <h4 style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '1rem', fontWeight: 700 }}>
                    ✔ Your message is ready to dispatch!
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
                    As this portfolio operates as a pure client-side Frontend Demo (without an external backend database), you can instantly transmit your prepared message directly via:
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a
                      href={mailtoLink}
                      className="btn btn--primary btn--sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ✉️ Open Mail Client
                    </a>
                    <a
                      href={whatsappLink}
                      className="btn btn--outline btn--sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      💬 Message on WhatsApp
                    </a>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="btn btn--outline btn--sm"
                    >
                      📞 Direct Call ({personalInfo.phone})
                    </a>
                  </div>
                </div>
              )}
            </form>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CyberBackground from './components/CyberBackground';
import NeonCursor from './components/NeonCursor';
import {
  experience,
  testimonials,
  education,
  services,
  skills,
  projects,
} from './data/portfolioData';

function App() {
  /* ── Theme ────────────────────────────────────────────── */
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) return saved;
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  /* ── Scroll Progress ──────────────────────────────────── */
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowBackToTop(scrollTop > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Slower, Buttery Smooth Damped Scroll ──────────────── */
  useEffect(() => {
    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let isMoving = false;
    let rafId = null;

    const onWheel = (e) => {
      // Don't intercept if modifier keys are pressed or modal is open or mobile
      if (e.ctrlKey || e.shiftKey || e.altKey || document.body.style.overflow === 'hidden') return;
      if (window.innerWidth < 768) return;

      e.preventDefault();
      // Controlled, slightly slower & damped delta
      const delta = e.deltaY * 0.72;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetY = Math.max(0, Math.min(maxScroll, targetY + delta));

      if (!isMoving) {
        isMoving = true;
        updateScroll();
      }
    };

    const updateScroll = () => {
      const diff = targetY - currentY;
      // Smooth lerp dampening
      currentY += diff * 0.088;

      if (Math.abs(diff) < 0.6) {
        currentY = targetY;
        window.scrollTo(0, currentY);
        isMoving = false;
      } else {
        window.scrollTo(0, currentY);
        rafId = requestAnimationFrame(updateScroll);
      }
    };

    const syncScroll = () => {
      if (!isMoving) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', syncScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', syncScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /* ── Dynamic Scroll Reveal (Bi-directional Smooth Opacity) ── */
  useEffect(() => {
    const selector =
      '.fade-in, .fade-in-left, .fade-in-right, .scale-in, .scroll-line-reveal, .section__header, .timeline__item';
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            // If scrolled above or out, allow dynamic re-fade
            const rect = entry.target.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
              entry.target.classList.remove('visible');
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });

  /* ── Project Modal ────────────────────────────────────── */
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  /* ── Active Section ───────────────────────────────────── */
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-72px 0px -40% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Conditional rendering checks ─────────────────────── */
  const hasExperience = experience && experience.length > 0;
  const hasTestimonials = testimonials && testimonials.length > 0;
  const hasEducation = education && (education.institution || education.degree || education.milestones);
  const hasServices = services && services.length > 0;
  const hasSkills = skills && skills.length > 0;
  const hasProjects = projects && projects.length > 0;

  return (
    <>
      {/* High-Tech Animated Cyber Background */}
      <CyberBackground />

      {/* Custom Neon Cursor */}
      <NeonCursor />

      {/* Glowing Neon Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />

        {/* Cyber Ticker Status Bar */}
        <div className="cyber-ticker-bar">
          <div className="cyber-ticker-content">
            <span>[STATUS: ONLINE]</span>
            <span>//</span>
            <span>CORE: HTML5 • CSS3 3D • JAVASCRIPT ES6+ • BOOTSTRAP 5 • REACT.JS</span>
            <span>//</span>
            <span>NEON LAB v2.6 ACTIVE</span>
            <span>//</span>
            <span>CREATOR: OMAR AMR REFAAT (AGE 11)</span>
            <span>//</span>
            <span>SYS_EFFICIENCY: 99.8%</span>
            <span>//</span>
            <span>STATUS: ONLINE</span>
            <span>//</span>
            <span>CORE: HTML5 • CSS3 3D • JAVASCRIPT ES6+ • BOOTSTRAP 5 • REACT.JS</span>
          </div>
        </div>

        <About />
        <div className="cyber-section-divider" />

        {hasSkills && <Skills />}
        <div className="cyber-section-divider" />

        {hasServices && <Services />}
        <div className="cyber-section-divider" />

        {hasExperience && <Experience />}
        <div className="cyber-section-divider" />

        {hasEducation && <Education />}
        <div className="cyber-section-divider" />

        {hasProjects && <Projects onProjectClick={setSelectedProject} />}
        <div className="cyber-section-divider" />

        {hasTestimonials && <Testimonials />}
        <Contact />
      </main>

      <Footer />

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Back to Top */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}

export default App;

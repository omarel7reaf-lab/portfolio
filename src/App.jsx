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
import CyberTerminal from './components/CyberTerminal';
import KineticTicker from './components/KineticTicker';
import {
  isSoundEnabled,
  toggleSound as toggleSoundFx,
  playClickSound,
  playHoverSound,
  playWarpSound,
} from './utils/cyberAudio';
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

  /* ── Hyper-Speed & Cyber Terminal Modes ───────────────── */
  const [hyperMode, setHyperMode] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => isSoundEnabled());

  const handleToggleSound = useCallback(() => {
    const next = toggleSoundFx();
    setSoundEnabled(next);
  }, []);

  // Keyboard shortcut: `~` or `Ctrl+/` opens terminal
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.ctrlKey && e.key === '/') || e.key === '`') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  /* ── Scroll Progress & Back to Top ────────────────────── */
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

  /* ── GSAP Scroll-Triggered Dynamic Animations ─────────── */
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section headers reveal
      gsap.utils.toArray('.section__header').forEach((header) => {
        const kicker = header.querySelector('.section__kicker-badge, .section__label');
        const title = header.querySelector('.section__title');
        const subtitle = header.querySelector('.section__subtitle');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });

        if (kicker) tl.fromTo(kicker, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' });
        if (title) tl.fromTo(title, { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power4.out' }, '-=0.2');
        if (subtitle) tl.fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.25');
      });

      // Cards staggered entrances
      gsap.utils.toArray('.skills__grid, .services__grid, .projects__grid').forEach((grid) => {
        const cards = grid.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: grid,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power3.out',
          }
        );
      });

      // Timeline items
      gsap.utils.toArray('.timeline__item').forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -35 },
          {
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: i * 0.05,
            ease: 'power3.out',
          }
        );
      });

      // About section elements
      const aboutImage = document.querySelector('.about__image-section');
      const aboutContent = document.querySelector('.about__content');
      if (aboutImage && aboutContent) {
        gsap.fromTo(
          aboutImage,
          { opacity: 0, x: -40, rotation: -2 },
          {
            scrollTrigger: {
              trigger: '.about__inner',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 0.6,
            ease: 'power3.out',
          }
        );
        gsap.fromTo(
          aboutContent,
          { opacity: 0, x: 40 },
          {
            scrollTrigger: {
              trigger: '.about__inner',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
          }
        );
      }
    });

    // Refresh triggers on resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  /* ── Interactive Project Modal ────────────────────────── */
  const [selectedProject, setSelectedProject] = useState(null);

  /* ── Active Section Tracking ──────────────────────────── */
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
      { threshold: 0.25, rootMargin: '-72px 0px -40% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const hasExperience = experience && experience.length > 0;
  const hasTestimonials = testimonials && testimonials.length > 0;
  const hasEducation =
    education && (education.institution || education.degree || education.milestones);
  const hasServices = services && services.length > 0;
  const hasSkills = skills && skills.length > 0;
  const hasProjects = projects && projects.length > 0;

  return (
    <div className={`app-root ${hyperMode ? 'hyper-mode' : ''}`}>
      {/* High-Tech Animated Cyber Background */}
      <CyberBackground hyperMode={hyperMode} matrixMode={matrixMode} />

      {/* Film Grain / Noise Overlay */}
      <div className="noise-overlay" />

      {/* Custom Neon Cursor */}
      <NeonCursor />

      {/* Glowing Neon Scroll Progress Bar */}
      <div
        className={`scroll-progress ${hyperMode ? 'scroll-progress--hyper' : ''}`}
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        hyperMode={hyperMode}
        setHyperMode={setHyperMode}
        soundEnabled={soundEnabled}
        toggleSound={handleToggleSound}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Hero
          onOpenTerminal={() => setIsTerminalOpen(true)}
          hyperMode={hyperMode}
        />

        {/* Dynamic Kinetic Marquee Ticker */}
        <KineticTicker hyperMode={hyperMode} />

        {/* About Section */}
        <About hyperMode={hyperMode} />
        <div className="cyber-section-divider" />

        {/* Skills & Arsenal */}
        {hasSkills && <Skills hyperMode={hyperMode} />}
        <div className="cyber-section-divider" />

        {/* Services & Capabilities */}
        {hasServices && <Services />}
        <div className="cyber-section-divider" />

        {/* Reverse Kinetic Ticker */}
        <KineticTicker
          reverse
          hyperMode={hyperMode}
          items={[
            '⚛️ REACT COMPONENT ARCHITECTURE',
            '⚡ ZERO DEPENDENCY AUDIO SYNTHESIS',
            '🚀 HARDWARE ACCELERATED GSAP',
            '🌐 SEMANTIC HTML5 & ACCESSIBILITY',
            '🔥 MODERN JAVASCRIPT ES6+',
            '🛡️ TESTED RESPONSIVE LAYOUTS',
          ]}
        />

        {/* Featured Projects */}
        {hasProjects && (
          <Projects
            onProjectClick={setSelectedProject}
            hyperMode={hyperMode}
          />
        )}
        <div className="cyber-section-divider" />

        {/* Experience & Journey */}
        {hasExperience && <Experience />}
        <div className="cyber-section-divider" />

        {/* Education & Milestones */}
        {hasEducation && <Education />}
        <div className="cyber-section-divider" />

        {/* Testimonials */}
        {hasTestimonials && <Testimonials />}

        {/* Contact Transmission */}
        <Contact />
      </main>

      <Footer />

      {/* Interactive Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Interactive Cyber Terminal CLI */}
      <CyberTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        hyperMode={hyperMode}
        setHyperMode={setHyperMode}
        matrixMode={matrixMode}
        setMatrixMode={setMatrixMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenProject={setSelectedProject}
      />

      {/* Floating Cyber HUD Pill Controls (Bottom Right) */}
      <div className="floating-hud">
        {/* Terminal Button */}
        <button
          className="hud-btn hud-btn--terminal"
          onClick={() => {
            playClickSound();
            setIsTerminalOpen((prev) => !prev);
          }}
          onMouseEnter={playHoverSound}
          title="Open Cyber Terminal [>_] or press ~"
          aria-label="Toggle Cyber Terminal"
        >
          <span className="hud-code">&gt;_</span>
        </button>

        {/* Hyper Speed Button */}
        <button
          className={`hud-btn hud-btn--hyper ${hyperMode ? 'active' : ''}`}
          onClick={() => {
            playWarpSound();
            setHyperMode((prev) => !prev);
          }}
          onMouseEnter={playHoverSound}
          title={hyperMode ? 'Warp Speed Active!' : 'Engage 3x Warp Speed!'}
          aria-label="Toggle Warp Speed"
        >
          <span>⚡</span>
        </button>

        {/* Back to top */}
        <button
          className={`hud-btn hud-btn--top ${showBackToTop ? 'visible' : ''}`}
          onClick={() => {
            playClickSound();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onMouseEnter={playHoverSound}
          title="Return to Orbit (Top)"
          aria-label="Back to top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;

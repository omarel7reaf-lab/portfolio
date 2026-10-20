import { useEffect, useRef } from 'react';

/**
 * NeonCursor — A GPU-composited custom cursor with:
 * - Main dot that snaps to mouse instantly
 * - Trailing ring that lags with lerp (smooth follow)
 * - Neon glow that reacts to hoverable elements
 * - Click ripple burst
 * - Hidden on touch / mobile devices
 */
export default function NeonCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let rafId;
    let isHover = false;
    let isDown = false;
    let isVisible = false;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!isVisible) {
        isVisible = true;
        rx = mx;
        ry = my;
        document.documentElement.style.cursor = 'none';
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      // Check if over an interactive element
      const target = e.target;
      isHover = !!(
        target && target.closest && target.closest('a, button, [role="button"], input, textarea, select, label, .neon-tilt-card, .project-card, .hud-btn')
      );
    };

    const onLeave = () => {
      isVisible = false;
      document.documentElement.style.cursor = '';
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onClick = () => {
      dot.classList.add('cursor-click');
      ring.classList.add('cursor-click');
      setTimeout(() => {
        dot.classList.remove('cursor-click');
        ring.classList.remove('cursor-click');
      }, 350);
    };

    const onDown = () => { isDown = true; };
    const onUp = () => { isDown = false; };

    // Initially hide custom cursor until first mouse move
    dot.style.opacity = '0';
    ring.style.opacity = '0';

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('click', onClick, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      // Lerp ring to mouse
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;

      // Dot — instant
      dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      // Ring — lagged
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;

      // Hover state
      if (isHover) {
        ring.classList.add('cursor-hover');
        dot.classList.add('cursor-hover');
      } else {
        ring.classList.remove('cursor-hover');
        dot.classList.remove('cursor-hover');
      }

      // Press state
      if (isDown) {
        ring.style.transform = `translate3d(${rx - 14}px, ${ry - 14}px, 0) scale(0.85)`;
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('click', onClick);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      {/* Instant dot */}
      <div ref={dotRef} className="neon-cursor-dot" aria-hidden="true" />
      {/* Lagging ring */}
      <div ref={ringRef} className="neon-cursor-ring" aria-hidden="true" />
    </>
  );
}

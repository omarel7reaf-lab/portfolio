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

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let rafId;
    let isHover = false;
    let isDown  = false;

    // Hide the system cursor
    document.documentElement.style.cursor = 'none';

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      // Check if over an interactive element
      const target = e.target;
      isHover = !!(
        target.closest('a, button, [role="button"], input, textarea, select, label, .neon-tilt-card, .project-card')
      );
    };

    const onClick = () => {
      dot.classList.add('cursor-click');
      ring.classList.add('cursor-click');
      setTimeout(() => {
        dot.classList.remove('cursor-click');
        ring.classList.remove('cursor-click');
      }, 400);
    };

    const onDown  = () => { isDown = true; };
    const onUp    = () => { isDown = false; };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      // Lerp ring to mouse
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;

      // Dot — instant
      dot.style.transform  = `translate(${mx - 4}px, ${my - 4}px)`;
      // Ring — lagged
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;

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
        ring.style.opacity = '0.4';
      } else {
        ring.style.opacity = '';
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
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

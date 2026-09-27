import { useEffect, useRef } from 'react';

/**
 * CyberBackground v2 — Mouse-reactive neon particles, scanlines, grid & aurora orbs.
 * Fully GPU-composited, zero layout impact.
 */
export default function CyberBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width  = (canvas.width  = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking
    const mouse = { x: width / 2, y: height / 2 };
    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      width  = canvas.width  = window.innerWidth;
      height = canvas.height = window.innerHeight;
      buildGrid();
    };
    window.addEventListener('resize', onResize);

    // ── Particles ───────────────────────────────────────────
    const COLORS = [
      [0, 240, 255],   // Neon Cyan
      [168, 85, 247],  // Neon Purple
      [0, 255, 157],   // Acid Green
      [255, 80, 200],  // Hot Pink
    ];

    const count = Math.min(Math.floor(width / 28), 55);
    const particles = Array.from({ length: count }, () => {
      const col = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x:  Math.random() * width,
        y:  Math.random() * height,
        ox: 0, oy: 0,           // offset from mouse repulsion
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r:  Math.random() * 2 + 0.7,
        col,
        alpha: Math.random() * 0.55 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        pulse: 0,
      };
    });

    // ── Grid nodes ──────────────────────────────────────────
    const GRID_COLS = Math.ceil(width / 90);
    const GRID_ROWS = Math.ceil(height / 90);
    let grid = [];

    const buildGrid = () => {
      grid = [];
      const cols = Math.ceil(width / 90);
      const rows = Math.ceil(height / 90);
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          grid.push({
            bx: (c / cols) * width,
            by: (r / rows) * height,
            ox: 0, oy: 0,
          });
        }
      }
    };
    buildGrid();

    // ── Aurora orbs (slow drifting) ─────────────────────────
    const orbs = [
      { x: width * 0.15, y: height * 0.25, r: 260, col: [0, 240, 255],  alpha: 0.07, vx: 0.08, vy: 0.05 },
      { x: width * 0.8,  y: height * 0.7,  r: 300, col: [168, 85, 247], alpha: 0.07, vx: -0.07, vy: -0.06 },
      { x: width * 0.5,  y: height * 0.5,  r: 200, col: [0, 255, 157],  alpha: 0.04, vx: 0.05, vy: -0.04 },
    ];

    let lastTime = performance.now();

    const render = (now) => {
      animId = requestAnimationFrame(render);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // ── Draw aurora orbs ─────────────────────────────────
      orbs.forEach((o) => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r)      o.x = width  + o.r;
        if (o.x > width + o.r) o.x = -o.r;
        if (o.y < -o.r)      o.y = height + o.r;
        if (o.y > height + o.r) o.y = -o.r;

        const [r, g, b] = o.col;
        const grd = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        grd.addColorStop(0,   `rgba(${r},${g},${b},${o.alpha})`);
        grd.addColorStop(0.5, `rgba(${r},${g},${b},${o.alpha * 0.4})`);
        grd.addColorStop(1,   `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── Mouse glow ───────────────────────────────────────
      const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
      mg.addColorStop(0,   'rgba(0,240,255,0.04)');
      mg.addColorStop(0.5, 'rgba(168,85,247,0.02)');
      mg.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = mg;
      ctx.fillRect(0, 0, width, height);

      // ── Particles ────────────────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse repulsion
        const mx = p.x - mouse.x, my = p.y - mouse.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 100) {
          const force = (100 - md) / 100;
          p.ox += (mx / md) * force * 1.8;
          p.oy += (my / md) * force * 1.8;
        }
        p.ox *= 0.9; p.oy *= 0.9;

        // Twinkle
        p.twinkle += p.twinkleSpeed;
        const tw = 0.5 + 0.5 * Math.sin(p.twinkle);
        const finalAlpha = p.alpha * (0.7 + 0.3 * tw);

        const px = p.x + p.ox, py = p.y + p.oy;
        const [r, g, b] = p.col;

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${finalAlpha})`;
        ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = px - (p2.x + p2.ox);
          const dy = py - (p2.y + p2.oy);
          const distSq = dx * dx + dy * dy;
          const MAX = 120;
          if (distSq < MAX * MAX) {
            const la = (1 - Math.sqrt(distSq) / MAX) * 0.14;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(p2.x + p2.ox, p2.y + p2.oy);
            ctx.strokeStyle = `rgba(0,240,255,${la})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.85 }}
      />

      {/* Subtle cyber grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.028) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 0%, transparent 100%)',
        }}
      />

      {/* Top scanline stripe */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,240,255,0.008) 3px, rgba(0,240,255,0.008) 4px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

import { useEffect, useRef } from 'react';

/**
 * CyberBackground v4 — Hyper-reactive particle physics, warp-speed stars,
 * aurora breathing orbs, audio-reactive energy pulses, and optional Matrix rain mode.
 */
export default function CyberBackground({ hyperMode = false, matrixMode = false }) {
  const canvasRef = useRef(null);
  const matrixCanvasRef = useRef(null);

  // ── Particle & Warp Field ────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse velocity & position
    const mouse = {
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0,
      prevX: width / 2,
      prevY: height / 2,
    };

    const onMouseMove = (e) => {
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - mouse.prevX;
      mouse.vy = mouse.y - mouse.prevY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const COLORS = [
      [0, 240, 255],   // Neon Cyan
      [168, 85, 247],  // Neon Purple
      [0, 255, 157],   // Acid Green
      [255, 51, 102],  // Hot Pink
      [251, 191, 36],  // Gold
    ];

    const count = Math.min(Math.floor(width / 18), hyperMode ? 100 : 65);
    const speedMult = hyperMode ? 2.4 : 1.0;

    const particles = Array.from({ length: count }, () => {
      const col = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        ox: 0,
        oy: 0,
        vx: (Math.random() - 0.5) * 0.8 * speedMult,
        vy: (Math.random() - 0.5) * 0.8 * speedMult,
        r: Math.random() * 2.4 + 0.8,
        col,
        alpha: Math.random() * 0.6 + 0.25,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: (Math.random() * 0.03 + 0.015) * speedMult,
        trail: [],
        maxTrail: hyperMode ? 10 : 5,
      };
    });

    // Aurora orbs
    const orbs = [
      { x: width * 0.15, y: height * 0.2,  r: 340, col: [0, 240, 255],  alpha: hyperMode ? 0.12 : 0.08, vx: 0.12, vy: 0.07, phase: 0 },
      { x: width * 0.82, y: height * 0.75, r: 380, col: [168, 85, 247], alpha: hyperMode ? 0.11 : 0.07, vx: -0.09, vy: -0.08, phase: Math.PI },
      { x: width * 0.5,  y: height * 0.45, r: 260, col: [0, 255, 157],  alpha: hyperMode ? 0.07 : 0.04, vx: 0.07, vy: -0.05, phase: Math.PI / 2 },
      { x: width * 0.3,  y: height * 0.8,  r: 220, col: [255, 51, 102], alpha: hyperMode ? 0.06 : 0.03, vx: -0.05, vy: 0.09, phase: Math.PI * 1.5 },
    ];

    // Shooting stars
    const shootingStars = [];
    let shootTimer = 0;

    const spawnStar = () => {
      const col = COLORS[Math.floor(Math.random() * COLORS.length)];
      const vel = (Math.random() * 5 + 4) * (hyperMode ? 2.0 : 1.0);
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.4,
        vx: vel * (Math.random() > 0.5 ? 1 : -1),
        vy: Math.random() * 2.5 + 1.2,
        life: 1,
        decay: (0.008 + Math.random() * 0.012) * (hyperMode ? 1.4 : 1.0),
        col,
        size: Math.random() * 2.5 + 1.2,
      });
    };

    let lastTime = performance.now();
    let globalTime = 0;

    const render = (now) => {
      animId = requestAnimationFrame(render);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      globalTime += dt * (hyperMode ? 1.8 : 1.0);

      ctx.clearRect(0, 0, width, height);

      // Aurora orbs
      orbs.forEach((o) => {
        o.x += o.vx * (hyperMode ? 1.6 : 1);
        o.y += o.vy * (hyperMode ? 1.6 : 1);
        if (o.x < -o.r) o.x = width + o.r;
        if (o.x > width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = height + o.r;
        if (o.y > height + o.r) o.y = -o.r;

        const breathe = 0.7 + 0.3 * Math.sin(globalTime * 0.6 + o.phase);
        const [r, g, b] = o.col;
        const grd = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * breathe);
        grd.addColorStop(0, `rgba(${r},${g},${b},${o.alpha * breathe})`);
        grd.addColorStop(0.4, `rgba(${r},${g},${b},${o.alpha * 0.4 * breathe})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r * breathe, 0, Math.PI * 2);
        ctx.fill();
      });

      // Dynamic mouse glow
      const mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
      const glowSize = (190 + Math.min(mouseSpeed * 3, 120)) * (hyperMode ? 1.4 : 1.0);
      const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowSize);
      mg.addColorStop(0, hyperMode ? 'rgba(0,240,255,0.12)' : 'rgba(0,240,255,0.06)');
      mg.addColorStop(0.35, hyperMode ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.03)');
      mg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = mg;
      ctx.fillRect(0, 0, width, height);

      // Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse attraction & repulsion
        const mx = p.x - mouse.x;
        const my = p.y - mouse.y;
        const md = Math.sqrt(mx * mx + my * my);
        const radius = hyperMode ? 190 : 140;
        if (md < radius) {
          const force = (radius - md) / radius;
          p.ox += (mx / md) * force * (hyperMode ? 3.5 : 2.2);
          p.oy += (my / md) * force * (hyperMode ? 3.5 : 2.2);
        }
        p.ox *= 0.88;
        p.oy *= 0.88;

        p.twinkle += p.twinkleSpeed;
        const tw = 0.5 + 0.5 * Math.sin(p.twinkle);
        const finalAlpha = p.alpha * (0.6 + 0.4 * tw) * (hyperMode ? 1.3 : 1.0);

        const px = p.x + p.ox;
        const py = p.y + p.oy;
        const [r, g, b] = p.col;

        // Trail (stretches dramatically in HyperMode)
        p.trail.push({ x: px, y: py });
        if (p.trail.length > p.maxTrail) p.trail.shift();

        for (let t = 0; t < p.trail.length - 1; t++) {
          const ta = (t / p.trail.length) * finalAlpha * (hyperMode ? 0.6 : 0.35);
          ctx.beginPath();
          ctx.moveTo(p.trail[t].x, p.trail[t].y);
          ctx.lineTo(p.trail[t + 1].x, p.trail[t + 1].y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${ta})`;
          ctx.lineWidth = p.r * (hyperMode ? 1.1 : 0.6);
          ctx.stroke();
        }

        // Particle dot with high intensity glow
        ctx.beginPath();
        ctx.arc(px, py, p.r * (hyperMode ? 1.25 : 1.0), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(finalAlpha, 1)})`;
        ctx.shadowColor = `rgba(${r},${g},${b},1)`;
        ctx.shadowBlur = hyperMode ? 20 : 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = px - (p2.x + p2.ox);
          const dy = py - (p2.y + p2.oy);
          const distSq = dx * dx + dy * dy;
          const MAX = hyperMode ? 150 : 130;
          if (distSq < MAX * MAX) {
            const la = (1 - Math.sqrt(distSq) / MAX) * (hyperMode ? 0.26 : 0.16);
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(p2.x + p2.ox, p2.y + p2.oy);
            ctx.strokeStyle = `rgba(0,240,255,${la})`;
            ctx.lineWidth = hyperMode ? 1.2 : 0.8;
            ctx.stroke();
          }
        }
      }

      // Shooting stars
      shootTimer += dt;
      const spawnInterval = hyperMode ? 1.5 : 3.5;
      if (shootTimer > spawnInterval + Math.random() * (hyperMode ? 1.5 : 3)) {
        shootTimer = 0;
        spawnStar();
      }

      for (let s = shootingStars.length - 1; s >= 0; s--) {
        const star = shootingStars[s];
        star.x += star.vx * dt * 60;
        star.y += star.vy * dt * 60;
        star.life -= star.decay;

        if (star.life <= 0) {
          shootingStars.splice(s, 1);
          continue;
        }

        const [r, g, b] = star.col;
        const tailLen = (hyperMode ? 55 : 32) * star.life;
        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - star.vx * tailLen * 0.5,
          star.y - star.vy * tailLen * 0.5
        );
        gradient.addColorStop(0, `rgba(${r},${g},${b},${star.life * 0.9})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.vx * tailLen * 0.5, star.y - star.vy * tailLen * 0.5);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.size * star.life * (hyperMode ? 1.5 : 1);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * star.life * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${star.life * 0.8})`;
        ctx.shadowColor = `rgba(${r},${g},${b},1)`;
        ctx.shadowBlur = hyperMode ? 22 : 14;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [hyperMode]);

  // ── Matrix Rain Canvas (Optional Mode) ───────────────────────
  useEffect(() => {
    if (!matrixMode) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = '01アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレオコソトノホモヨロヲン{}[]<>=/\\+*~#@$%&';
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(3, 3, 8, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ff9d';
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head character is glowing white/cyan
        if (Math.random() > 0.85) {
          ctx.fillStyle = '#ffffff';
          ctx.fillText(text, x, y);
          ctx.fillStyle = '#00ff9d';
        } else {
          ctx.fillText(text, x, y);
        }

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(drawMatrix, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', onResize);
    };
  }, [matrixMode]);

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
      {/* Particle & warp field */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.92,
        }}
      />

      {/* Matrix rain canvas */}
      {matrixMode && (
        <canvas
          ref={matrixCanvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.75,
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Cyber Grid */}
      <div
        className={`cyber-grid-overlay ${hyperMode ? 'cyber-grid--hyper' : ''}`}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,${hyperMode ? '0.04' : '0.02'}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,${hyperMode ? '0.04' : '0.02'}) 1px, transparent 1px)
          `,
          backgroundSize: hyperMode ? '40px 40px' : '60px 60px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 0%, transparent 100%)',
          transition: 'all 0.4s ease',
        }}
      />

      {/* Scanline overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,240,255,0.006) 3px, rgba(0,240,255,0.006) 4px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

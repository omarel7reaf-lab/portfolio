import { useRef, useState } from 'react';

/**
 * TiltCard — High-performance 3D interactive neon lab tilt card.
 * Where the mouse hovers, that part sinks in (tilts down),
 * while the opposite edge lifts up with 3D perspective depth,
 * accompanied by a dynamic cursor neon spotlight and shadow.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 12,
  style = {},
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)'
  );
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [shadow, setShadow] = useState('none');

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Relative offset [-1, 1]
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    // Sinking the cursor spot down, lifting opposite side
    const rotateX = percentY * maxTilt;
    const rotateY = -percentX * maxTilt;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) translateZ(8px)`
    );
    setMousePos({ x, y });

    // Dynamic neon shadow shifting away from the depressed side
    const shadowX = (-percentX * 16).toFixed(1);
    const shadowY = (-percentY * 16).toFixed(1);
    setShadow(
      `${shadowX}px ${shadowY}px 32px rgba(0, 240, 255, 0.2), 0 0 20px rgba(139, 92, 246, 0.15)`
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)');
    setShadow('none');
  };

  return (
    <div
      ref={cardRef}
      className={`neon-tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform,
        boxShadow: shadow !== 'none' ? shadow : undefined,
        transformStyle: 'preserve-3d',
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.15s ease-out'
          : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease',
        position: 'relative',
        ...style,
      }}
      {...props}
    >
      {/* Neon Cursor Spotlight Layer */}
      {isHovered && (
        <div
          className="neon-tilt-spotlight"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 1,
            background: `radial-gradient(circle 240px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.18), rgba(139, 92, 246, 0.08) 40%, transparent 80%)`,
          }}
        />
      )}

      {/* Card Content with 3D Depth */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {children}
      </div>
    </div>
  );
}

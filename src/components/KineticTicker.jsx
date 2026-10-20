import { playHoverSound } from '../utils/cyberAudio';

export default function KineticTicker({ reverse = false, speed = 'fast', items, hyperMode = false }) {
  const defaultItems = [
    '⚡ ULTRA HIGH VELOCITY',
    '⚛️ REACT 19 NEXT-GEN',
    '🌐 100% RESPONSIVE ARCHITECTURE',
    '🎨 TAILORED CSS & GSAP',
    '🚀 60 FPS GUARANTEED',
    '🛡️ CLEAN CODE DISCIPLINE',
    '💡 FUTURE TECH LEADER',
    '💎 PIXEL-PERFECT UI/UX',
  ];

  const list = items || defaultItems;
  // Duplicate for seamless infinite loop
  const loopItems = [...list, ...list, ...list];

  return (
    <div
      className={`kinetic-ticker ${reverse ? 'kinetic-ticker--reverse' : ''} ${
        hyperMode ? 'kinetic-ticker--hyper' : ''
      }`}
      onMouseEnter={playHoverSound}
      aria-hidden="true"
    >
      <div className="kinetic-ticker__track">
        {loopItems.map((item, idx) => (
          <span key={idx} className="kinetic-ticker__item">
            <span className="ticker-bullet">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

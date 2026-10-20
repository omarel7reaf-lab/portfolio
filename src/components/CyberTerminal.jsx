import { useState, useRef, useEffect } from 'react';
import { personalInfo, skills, projects } from '../data/portfolioData';
import { playClickSound, playTerminalBeep, playWarpSound } from '../utils/cyberAudio';

export default function CyberTerminal({
  isOpen,
  onClose,
  hyperMode,
  setHyperMode,
  matrixMode,
  setMatrixMode,
  soundEnabled,
  setSoundEnabled,
  onOpenProject,
}) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'NEON LAB OS v4.2 [Kernel: React 19.1.0 // High-Velocity Engine]',
    },
    {
      type: 'info',
      text: 'Type "help" to list available commands. Try "hyper" or "matrix"!',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    playTerminalBeep();
    setCommandHistory((prev) => [...prev, cmdStr]);
    setHistoryIdx(-1);

    const userEntry = { type: 'user', text: `> ${cmdStr}` };
    const newEntries = [userEntry];

    const [cmd, ...args] = trimmed.split(' ');

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'response',
          text: `AVAILABLE COMMANDS:
  help      - Display this command manual
  about     - Dossier & engineering profile
  skills    - Full technical arsenal & proficiency
  projects  - Featured web apps & prototypes
  hyper     - Toggle Hyper-Drive Speed Mode (CURRENT: ${hyperMode ? 'ENABLED ⚡' : 'DISABLED'})
  matrix    - Toggle Digital Rain Matrix overlay (CURRENT: ${matrixMode ? 'ON 🟢' : 'OFF'})
  sound     - Toggle Sci-Fi Audio Synthesis (CURRENT: ${soundEnabled ? 'ON 🔊' : 'MUTED 🔇'})
  whoami    - Visitor identity detection
  clear     - Wipe terminal logs
  hire      - Launch hiring & collaboration protocol`,
        });
        break;

      case 'about':
        newEntries.push({
          type: 'response',
          text: `NAME: ${personalInfo.name}
ROLE: ${personalInfo.jobTitle}
AGE: 11 Years Old (Engineering with modern web tech since age 9)
BIO: ${personalInfo.about}
PHILOSOPHY: Lightning-fast execution, clean responsive architecture, 60fps animations.`,
        });
        break;

      case 'skills':
        const skillList = skills
          .map((s) => `  [${s.level}%] ${s.name.padEnd(16)} // ${s.category}`)
          .join('\n');
        newEntries.push({
          type: 'response',
          text: `TECHNICAL ARSENAL:\n${skillList}`,
        });
        break;

      case 'projects':
        const projList = projects
          .map((p, idx) => `  #${idx + 1} [${p.category}] ${p.name}\n      → ${p.description}`)
          .join('\n\n');
        newEntries.push({
          type: 'response',
          text: `FEATURED BUILDS:\n${projList}`,
        });
        break;

      case 'hyper':
      case 'speed':
      case 'overclock':
        playWarpSound();
        setHyperMode((prev) => !prev);
        newEntries.push({
          type: 'accent',
          text: `⚡ HYPER-DRIVE STATUS: ${!hyperMode ? 'ENGAGED! Maximum velocity unlocked.' : 'DISENGAGED. Standard orbit restored.'}`,
        });
        break;

      case 'matrix':
        setMatrixMode((prev) => !prev);
        newEntries.push({
          type: 'accent',
          text: `🟢 MATRIX PROTOCOL: ${!matrixMode ? 'ONLINE. Code rain active.' : 'TERMINATED.'}`,
        });
        break;

      case 'sound':
      case 'audio':
        setSoundEnabled((prev) => !prev);
        newEntries.push({
          type: 'info',
          text: `🔊 AUDIO SYNTHESIS: ${!soundEnabled ? 'ENABLED' : 'MUTED'}`,
        });
        break;

      case 'whoami':
        newEntries.push({
          type: 'response',
          text: `USER: Elite Tech Recruiter / Curious Explorer\nUSER-AGENT: ${navigator.userAgent.slice(0, 45)}...\nCLEARANCE: Level 5 Access Granted.`,
        });
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        return;

      case 'hire':
      case 'contact':
        newEntries.push({
          type: 'accent',
          text: `🚀 INITIATING COLLABORATION DISPATCH:
  Email: ${personalInfo.email}
  WhatsApp: ${personalInfo.phone}
  Status: OPEN TO FREELANCE & INNOVATION OPPORTUNITIES!`,
        });
        window.location.hash = '#contact';
        break;

      default:
        newEntries.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for command matrix.`,
        });
    }

    setHistory((prev) => [...prev, ...newEntries]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIdx(nextIdx);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cyber-terminal-overlay" onClick={onClose}>
      <div
        className="cyber-terminal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Cyber Terminal"
      >
        {/* Terminal Header */}
        <div className="cyber-terminal__header">
          <div className="cyber-terminal__dots">
            <span className="dot dot--red" onClick={onClose} />
            <span className="dot dot--yellow" />
            <span
              className="dot dot--green"
              onClick={() => {
                playWarpSound();
                setHyperMode((p) => !p);
              }}
              title="Toggle Hyper Mode"
            />
          </div>
          <div className="cyber-terminal__title">
            <span className="terminal-icon">⚡</span>
            <span>omar@neon-lab-os:~ (speed: {hyperMode ? 'WARP 3X' : 'NORMAL'})</span>
          </div>
          <button
            className="cyber-terminal__close"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            aria-label="Close Terminal"
          >
            ✕
          </button>
        </div>

        {/* Quick action bar */}
        <div className="cyber-terminal__quick-bar">
          <button
            className={`quick-pill ${hyperMode ? 'active' : ''}`}
            onClick={() => {
              playWarpSound();
              handleCommand('hyper');
            }}
          >
            ⚡ Hyper {hyperMode ? 'ON' : 'OFF'}
          </button>
          <button
            className={`quick-pill ${matrixMode ? 'active' : ''}`}
            onClick={() => {
              playClickSound();
              handleCommand('matrix');
            }}
          >
            🟢 Matrix
          </button>
          <button
            className="quick-pill"
            onClick={() => {
              playClickSound();
              handleCommand('skills');
            }}
          >
            🛠️ Skills
          </button>
          <button
            className="quick-pill"
            onClick={() => {
              playClickSound();
              handleCommand('projects');
            }}
          >
            🚀 Projects
          </button>
          <button
            className="quick-pill"
            onClick={() => {
              playClickSound();
              handleCommand('help');
            }}
          >
            ❓ Help
          </button>
        </div>

        {/* Terminal Output */}
        <div className="cyber-terminal__body">
          {history.map((item, idx) => (
            <div key={idx} className={`terminal-line terminal-line--${item.type}`}>
              <pre>{item.text}</pre>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="cyber-terminal__input-row">
          <span className="terminal-prompt">root@omarlab:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help', 'hyper', 'skills'..."
            spellCheck="false"
            autoFocus
          />
          <button
            className="terminal-submit-btn"
            onClick={() => {
              handleCommand(inputVal);
              setInputVal('');
            }}
          >
            EXEC ↵
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

const useKonamiCode = () => {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];
  const [userInput, setUserInput] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setUserInput(prev => {
        const newInput = [...prev, event.code].slice(-konamiCode.length);
        
        if (newInput.length === konamiCode.length && 
            newInput.every((key, index) => key === konamiCode[index])) {
          setKonamiActivated(true);
          console.log('🎮 KONAMI CODE ACTIVATED! Welcome to secret developer mode!');
          return [];
        }
        
        return newInput;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return konamiActivated;
};

interface FloatingCode {
  id: number;
  symbol: string;
  x: number;
  y: number;
  rotation: number;
  speed: number;
}

export const EasterEggs = () => {
  const konamiActivated = useKonamiCode();
  const [matrixMode, setMatrixMode] = useState(false);
  const [secretTheme, setSecretTheme] = useState(false);
  const [floatingCodes, setFloatingCodes] = useState<FloatingCode[]>([]);

  // Console messages
  useEffect(() => {
    console.log('%c👋 Hello there, fellow developer!', 'color: #a855f7; font-size: 16px; font-weight: bold;');
    console.log('%c🎯 Try the Konami Code: ↑↑↓↓←→←→BA', 'color: #06b6d4; font-size: 14px;');
    console.log('%c🔮 Click on my name 5 times for a surprise!', 'color: #10b981; font-size: 14px;');
    console.log('%c💫 Press M for Matrix mode!', 'color: #f59e0b; font-size: 14px;');
    console.log('%c🎨 Press T to toggle secret theme!', 'color: #ef4444; font-size: 14px;');
    
    const asciiArt = `
    ╔═══════════════════════════════════════╗
    ║           DEVELOPER PORTFOLIO         ║
    ║                                       ║
    ║   ┌─┐┌─┐┌┬┐┌─┐  ┌─┐┌─┐┌─┐┌┬┐┌─┐┬─┐   ║
    ║   ├─┤│   │ ├┤   ├─┤├┤ ├┤  │ ├┤ ├┬┘   ║
    ║   ┴ ┴└─┘ ┴ └─┘  ┴ ┴└  └─┘ ┴ └─┘┴└─   ║
    ║                                       ║
    ╚═══════════════════════════════════════╝
    `;
    console.log('%c' + asciiArt, 'color: #8b5cf6; font-family: monospace;');
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm') {
        setMatrixMode(prev => !prev);
        console.log(matrixMode ? '🔴 Matrix mode OFF' : '🟢 Matrix mode ON');
      }
      if (e.key.toLowerCase() === 't') {
        setSecretTheme(prev => !prev);
        console.log(secretTheme ? '🌙 Normal theme' : '🌈 Rainbow theme activated!');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [matrixMode, secretTheme]);

  // Floating code symbols when Konami is activated
  useEffect(() => {
    if (!konamiActivated) return;

    const symbols = ['{ }', '< >', '[ ]', '( )', '&&', '||', '=>', '++', '--', '##'];
    const newCodes: FloatingCode[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: Math.random() * 360,
      speed: Math.random() * 2 + 1
    }));

    setFloatingCodes(newCodes);

    const interval = setInterval(() => {
      setFloatingCodes(prev => prev.map(code => ({
        ...code,
        rotation: code.rotation + 1,
        y: code.y < -50 ? window.innerHeight + 50 : code.y - code.speed
      })));
    }, 50);

    return () => clearInterval(interval);
  }, [konamiActivated]);

  // Apply secret theme
  useEffect(() => {
    if (secretTheme) {
      document.documentElement.style.setProperty('--primary', '330 81% 60%');
      document.documentElement.style.setProperty('--accent', '45 81% 60%');
      document.documentElement.style.setProperty('--gradient-primary', 'linear-gradient(135deg, hsl(330, 81%, 60%), hsl(45, 81%, 60%), hsl(200, 81%, 60%))');
    } else {
      document.documentElement.style.setProperty('--primary', '270 91% 65%');
      document.documentElement.style.setProperty('--accent', '180 91% 65%');
      document.documentElement.style.setProperty('--gradient-primary', 'linear-gradient(135deg, hsl(270, 91%, 65%), hsl(240, 91%, 70%))');
    }
  }, [secretTheme]);

  return (
    <>
      {/* Matrix Rain Effect */}
      {matrixMode && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="w-full h-full bg-black/90 flex items-center justify-center">
            <div className="text-green-400 font-mono text-sm animate-pulse">
              MATRIX MODE ACTIVATED - Press M to exit
            </div>
          </div>
        </div>
      )}

      {/* Floating Code Symbols */}
      {konamiActivated && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {floatingCodes.map(code => (
            <div
              key={code.id}
              className="absolute text-primary/30 font-mono text-xl"
              style={{
                left: code.x,
                top: code.y,
                transform: `rotate(${code.rotation}deg)`,
                transition: 'all 0.05s linear'
              }}
            >
              {code.symbol}
            </div>
          ))}
        </div>
      )}

      {/* Secret Theme Indicator */}
      {secretTheme && (
        <div className="fixed top-20 right-4 z-30 bg-gradient-primary text-white px-3 py-1 rounded-full text-sm animate-bounce">
          🌈 Rainbow Mode!
        </div>
      )}

      {/* Konami Mode Indicator */}
      {konamiActivated && (
        <div className="fixed top-20 left-4 z-30 bg-gradient-primary text-white px-3 py-1 rounded-full text-sm animate-pulse">
          🎮 Dev Mode Active
        </div>
      )}
    </>
  );
};
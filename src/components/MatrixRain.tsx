import { useEffect, useRef, useState } from 'react';

interface MatrixChar {
  char: string;
  x: number;
  y: number;
  speed: number;
}

export const MatrixRain = ({ isActive }: { isActive: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chars, setChars] = useState<MatrixChar[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize characters
    const initialChars: MatrixChar[] = [];
    for (let i = 0; i < columns; i++) {
      initialChars.push({
        char: matrix[Math.floor(Math.random() * matrix.length)],
        x: i * fontSize,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 1
      });
    }
    setChars(initialChars);

    const animate = () => {
      ctx.fillStyle = 'rgba(20, 20, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      setChars(prev => prev.map(char => {
        ctx.fillText(char.char, char.x, char.y);
        
        return {
          ...char,
          y: char.y > canvas.height ? 0 : char.y + char.speed,
          char: Math.random() > 0.98 ? matrix[Math.floor(Math.random() * matrix.length)] : char.char
        };
      }));

      if (isActive) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 bg-black"
      style={{ pointerEvents: 'none' }}
    />
  );
};
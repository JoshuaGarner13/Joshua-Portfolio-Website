import { useRef, useEffect } from 'react';

export const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animated background grid
    const drawGrid = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 50;
      const offsetX = (time * 0.02) % gridSize;
      const offsetY = (time * 0.01) % gridSize;

      ctx.strokeStyle = 'hsl(270, 91%, 65%, 0.1)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = -gridSize + offsetX; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = -gridSize + offsetY; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Floating dots
      const numDots = 20;
      for (let i = 0; i < numDots; i++) {
        const x = (canvas.width / numDots) * i + Math.sin(time * 0.001 + i) * 50;
        const y = canvas.height / 2 + Math.cos(time * 0.002 + i) * 100;
        const radius = 2 + Math.sin(time * 0.003 + i) * 1;

        ctx.fillStyle = `hsl(${270 + i * 5}, 91%, 65%, 0.6)`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let animationId: number;
    const animate = (time: number) => {
      drawGrid(time);
      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
};
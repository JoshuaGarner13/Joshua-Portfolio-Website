import { useEffect, useRef } from 'react';

export default function ThankYou() {
  const confettiRef = useRef(null);

  useEffect(() => {
    const canvas = confettiRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;
    const confettiCount = 120;
    const confetti = Array.from({ length: confettiCount }).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H - H,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      tilt: Math.random() * 10 - 10
    }));
    let angle = 0;
    let tiltAngle = 0;
    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      angle += 0.01;
      tiltAngle += 0.1;
      for (let i = 0; i < confettiCount; i++) {
        const c = confetti[i];
        c.y += (Math.cos(angle + c.d) + 3 + c.r / 2) / 2;
        c.x += Math.sin(angle);
        c.tilt = Math.sin(tiltAngle - i / 3) * 15;
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 5);
        ctx.stroke();
      }
      frame++;
      if (frame < 120) {
        requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, W, H);
      }
    }
    draw();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">Thank You!</h1>
      <p className="text-lg md:text-2xl text-muted-foreground mb-8 text-center max-w-xl">Your message has been received. I appreciate your interest and will get back to you soon!</p>
      <a href="/" className="mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg hover:scale-105 transition-all duration-200">Back to Home</a>
      <canvas ref={confettiRef} className="fixed inset-0 pointer-events-none z-50" />
    </div>
  );
} 
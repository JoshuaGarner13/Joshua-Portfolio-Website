import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { techIcons } from '@/pages/Index';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const ProjectCard = ({ title, description, image, technologies, githubUrl, liveUrl }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 200, damping: 20 });
  const [isPressed, setIsPressed] = React.useState(false);

  // Mouse move for 3D tilt
  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cardX = e.clientX - rect.left;
    const cardY = e.clientY - rect.top;
    const percentX = (cardX / rect.width) * 2 - 1;
    const percentY = (cardY / rect.height) * 2 - 1;
    x.set(percentX * 15);
    y.set(-percentY * 15);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  // Click pulse
  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 300);
  };

  return (
    <motion.div
      ref={cardRef}
      tabIndex={0}
      className="group overflow-hidden focus-visible:ring-2 focus-visible:ring-accent transition-spring bg-card/50 backdrop-blur-sm border-border/50 flex flex-col relative cursor-pointer outline-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
      animate={isPressed ? { scale: 0.97 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      whileHover={{ zIndex: 10 }}
      style={{
        perspective: 1000,
        outline: 'none',
        rotateX: rotateX,
        rotateY: rotateY,
        boxShadow: '0 8px 32px 0 rgba(80,80,180,0.10), 0 1.5px 8px 0 rgba(80,80,180,0.10)',
      }}
    >
      {/* Shine effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{
          background: 'linear-gradient(120deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.10) 100%)',
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      {/* Click pulse */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none rounded-xl"
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 80%)' }}
        />
      )}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardHeader className="flex flex-col items-center justify-center pt-4 pb-0">
        <CardTitle className="group-hover:text-accent transition-smooth text-center text-lg md:text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-1 space-y-4 pb-6 pt-2">
        <p className="text-muted-foreground text-center text-sm md:text-base">{description}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-secondary/50 flex items-center gap-2 px-3 py-1 text-sm">
              {techIcons[tech]}
              <span>{tech}</span>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 pt-2 w-full justify-center">
          {githubUrl && (
            <Button size="sm" variant="outline" className="flex-1 min-w-[100px] max-w-[140px]" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button size="sm" className="flex-1 min-w-[100px] max-w-[140px] bg-gradient-primary hover:opacity-90" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </motion.div>
  );
};
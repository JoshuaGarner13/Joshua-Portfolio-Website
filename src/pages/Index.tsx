import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TypingEffect } from '@/components/TypingEffect';
import { SkillCard } from '@/components/SkillCard';
import { ProjectCard } from '@/components/ProjectCard';
import { ParticleSystem } from '@/components/ParticleSystem';
import { EasterEggs } from '@/components/EasterEggs';
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { useClickCounter } from '@/hooks/useClickCounter';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { 
  Code2, 
  Database, 
  Globe, 
  Smartphone, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin,
  Download,
  ChevronDown,
  Zap,
  Sparkles
} from 'lucide-react';

// Import project images
import project1 from '@/assets/project1.jpg';
import project2 from '@/assets/project2.jpg';
import project3 from '@/assets/project3.jpg';

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const { clicks, activated: clickEasterEgg, handleClick } = useClickCounter(5);
  const { playHoverSound, playClickSound, playSuccessSound } = useSoundEffects();
  const [showFireworks, setShowFireworks] = useState(false);

  // Cursor trail effect
  useEffect(() => {
    let trailId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setCursorTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailId++ }];
        return newTrail.slice(-10); // Keep last 10 positions
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Trigger fireworks when click easter egg is activated
  useEffect(() => {
    if (clickEasterEgg) {
      setShowFireworks(true);
      playSuccessSound();
      setTimeout(() => setShowFireworks(false), 3000);
    }
  }, [clickEasterEgg, playSuccessSound]);

  const scrollToSection = (sectionId: string) => {
    playClickSound();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleButtonHover = () => {
    playHoverSound();
  };

  const skills = [
    { icon: <Code2 />, title: "Frontend", level: 95 },
    { icon: <Database />, title: "Backend", level: 88 },
    { icon: <Globe />, title: "Full Stack", level: 92 },
    { icon: <Smartphone />, title: "Mobile", level: 80 },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with React, Node.js, and PostgreSQL featuring real-time inventory management and payment processing.",
      image: project1,
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redux"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time analytics dashboard with interactive charts, data visualization, and comprehensive reporting features.",
      image: project2,
      technologies: ["React", "D3.js", "Express", "MongoDB", "Socket.io"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with team features, real-time updates, and mobile responsiveness.",
      image: project3,
      technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Interactive Background */}
      <InteractiveBackground />
      
      {/* Particle System */}
      <ParticleSystem />
      
      {/* Easter Eggs */}
      <EasterEggs />
      
      {/* Cursor Trail */}
      {cursorTrail.map((point, index) => (
        <div
          key={point.id}
          className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-30"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: (index + 1) / cursorTrail.length * 0.5,
            transform: `scale(${(index + 1) / cursorTrail.length})`,
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
      
      {/* Fireworks Effect */}
      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `firework ${Math.random() * 2 + 1}s ease-out`
              }}
            >
              <Sparkles className="w-6 h-6 text-accent animate-spin" />
            </div>
          ))}
        </div>
      )}
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border/50 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 
            className="text-xl font-bold gradient-text cursor-pointer select-none relative"
            onClick={handleClick}
            onMouseEnter={handleButtonHover}
          >
            Portfolio
            {clicks > 0 && clicks < 5 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full text-xs flex items-center justify-center text-accent-foreground animate-bounce">
                {clicks}
              </span>
            )}
            {clickEasterEgg && (
              <Zap className="inline w-4 h-4 ml-1 text-accent animate-pulse" />
            )}
          </h1>
          <div className="hidden md:flex space-x-6">
            {['about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                onMouseEnter={handleButtonHover}
                className="text-muted-foreground hover:text-primary transition-smooth capitalize hover:scale-105"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 border border-primary/20 rotate-45 animate-float" />
          <div className="absolute top-3/4 right-1/4 w-16 h-16 border border-accent/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-gradient-primary opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        </div>
        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <p className="text-accent mb-2 animate-fade-in">Hello, I'm</p>
            <h1 
              className="text-5xl md:text-7xl font-bold mb-4 cursor-pointer select-none"
              onClick={handleClick}
              onMouseEnter={handleButtonHover}
            >
              <span className={`gradient-text transition-all duration-500 ${clickEasterEgg ? 'animate-pulse-glow' : ''}`}>
                Alex Johnson
              </span>
              {clickEasterEgg && <Sparkles className="inline w-8 h-8 ml-2 text-accent animate-spin" />}
            </h1>
            <div className="text-xl md:text-2xl text-muted-foreground mb-8 h-8">
              <TypingEffect text="Full Stack Developer & UI/UX Enthusiast" speed={80} />
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I craft digital experiences that blend beautiful design with powerful functionality. 
            Passionate about creating solutions that make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 glow-primary hover:scale-105 transition-spring"
              onClick={() => scrollToSection('projects')}
              onMouseEnter={handleButtonHover}
            >
              View My Work
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground hover:scale-105 transition-spring"
              onMouseEnter={handleButtonHover}
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>
          
          <div className="animate-bounce">
            <ChevronDown 
              className="w-6 h-6 mx-auto text-muted-foreground cursor-pointer" 
              onClick={() => scrollToSection('about')}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 fade-in-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                With over 5 years of experience in web development, I specialize in creating 
                responsive, user-friendly applications using modern technologies. I'm passionate 
                about clean code, innovative solutions, and continuous learning.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community.
              </p>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                San Francisco, CA
              </div>
            </div>
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-primary rounded-full animate-float glow-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 fade-in-section">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {skills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Technologies I Work With</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript", "TypeScript", "React", "Node.js", "Python", "PostgreSQL", 
                  "MongoDB", "AWS", "Docker", "Git", "Next.js", "Express", "GraphQL", "Redis"
                ].map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-secondary/50">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 fade-in-section">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 fade-in-section">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Have a project in mind? I'd love to hear about it. Let's create something amazing together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90" asChild>
              <a href="mailto:alex@example.com">
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </a>
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href="https://github.com" className="text-muted-foreground hover:text-primary transition-smooth">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" className="text-muted-foreground hover:text-primary transition-smooth">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:alex@example.com" className="text-muted-foreground hover:text-primary transition-smooth">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2024 Alex Johnson. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

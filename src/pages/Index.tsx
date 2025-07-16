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
import { motion } from 'framer-motion';
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
  Sparkles,
  Paintbrush2,
  Server,
  Cloud,
  Terminal,
  Layers,
  Figma,
  Cpu,
  BarChart3,
  ShieldCheck,
  GitBranch,
  Spline,
  Wrench,
  BookOpen,
  MonitorSmartphone,
  FileCode2,
  Feather,
  Palette,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator } from '@/components/ui/command';
import { useCallback } from 'react';

// Import project images
import project1 from '@/assets/project1.jpg';
import project2 from '@/assets/project2.jpg';
import project3 from '@/assets/project3.jpg';
import profilePhoto from '@/assets/Linkedin Photo.jpg';

const techIcons = {
  JavaScript: <Code2 className="text-yellow-400" />,
  TypeScript: <Code2 className="text-blue-500" />,
  React: <Globe className="text-cyan-400" />,
  MongoDB: <Database className="text-green-700" />,
  Git: <GitBranch className="text-orange-500" />,
  Docker: <Cloud className="text-blue-400" />,
  R: <Code2 className="text-blue-400" />,
  HTML: <FileCode2 className="text-orange-500" />,
  CSS: <Palette className="text-blue-500" />,
  'Node.js': <Server className="text-green-500" />,
  TailWind: <Feather className="text-cyan-400" />,
  Figma: <Figma className="text-pink-500" />,
  Java: <Code2 className="text-red-700" />,
  'C++': <Code2 className="text-blue-700" />,
  Python: <Code2 className="text-yellow-300" />,
};

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const { clicks, activated: clickEasterEgg, handleClick } = useClickCounter(5);
  const { playHoverSound, playClickSound, playSuccessSound } = useSoundEffects();
  const [showFireworks, setShowFireworks] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(() => typeof window !== 'undefined' ? (window.localStorage.getItem('sound') !== 'off') : true);

  const toggleSound = () => {
    setSoundOn(s => {
      const next = !s;
      if (typeof window !== 'undefined') window.localStorage.setItem('sound', next ? 'on' : 'off');
      return next;
    });
  };

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
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add('animate-fade-in');
  //         }
  //       });
  //     },
  //     { threshold: 0.1 }
  //   );

  //   const sections = document.querySelectorAll('.fade-in-section');
  //   sections.forEach((section) => observer.observe(section));

  //   return () => observer.disconnect();
  // }, []);

  // Trigger fireworks when click easter egg is activated
  useEffect(() => {
    if (clickEasterEgg) {
      setShowFireworks(true);
      playSuccessSound();
      setTimeout(() => setShowFireworks(false), 3000);
    }
  }, [clickEasterEgg, playSuccessSound]);

  // Keyboard shortcut: Ctrl+K or /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey)) {
        e.preventDefault();
        setCommandOpen(true);
      }
      if (e.key === 'Escape') setCommandOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommand = useCallback((action: string) => {
    setCommandOpen(false);
    switch (action) {
      case 'about':
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'skills':
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'projects':
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contact':
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'fun':
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
        break;
      case 'matrix':
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'm' }));
        break;
      case 'rainbow':
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 't' }));
        break;
      case '404':
        window.location.href = '/404';
        break;
      default:
        break;
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    playClickSound();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleButtonHover = () => {
    playHoverSound();
  };

  const skills = [
    { icon: <Code2 />, title: 'Frontend Development' },
    { icon: <Paintbrush2 />, title: 'UI/UX Design' },
    { icon: <Server />, title: 'Backend APIs' },
    { icon: <Database />, title: 'Databases' },
    { icon: <Layers />, title: 'Full Stack' },
    { icon: <MonitorSmartphone />, title: 'Mobile Apps' },
    { icon: <Figma />, title: 'Prototyping' },
    { icon: <BarChart3 />, title: 'Data Visualization' },
    { icon: <Zap />, title: 'Automation' },
    { icon: <ShieldCheck />, title: 'Security' },
    { icon: <GitBranch />, title: 'Version Control' },
    { icon: <BookOpen />, title: 'Documentation' },
  ];

  const projects = [
    {
      title: "Swift Signals (In Progress)",
      description: "A data-driven, simulation-powered traffic light optimization platform for urban environments. Built with a microservices architecture, containerization, and modern DevOps. Collaborating with Southern Cross Solutions and the University of Pretoria. Still in progress.",
      image: project1,
      technologies: ["TypeScript", "React", "Node.js", "MongoDB", "Docker", "Git", "Figma"],
      githubUrl: "https://github.com/COS301-SE-2025/Swift-Signals",
      liveUrl: undefined
    },
    {
      title: "Kudu Digital",
      description: "A modern, responsive website for a professional videographer. Designed to showcase a portfolio, attract new clients, and highlight creative work. Built with React, TypeScript, and Tailwind CSS for a seamless user experience across devices.",
      image: project2,
      technologies: ["TypeScript", "React", "TailWind", "Figma", "Git"],
      githubUrl: "https://github.com/JoshuaGarner13/Kudu-Digital",
      liveUrl: "https://kududigital.co.za/"
    },
    {
      title: "Machine Learning for Stock Purchase Prediction",
      description: "Developed and evaluated three machine learning models (Genetic Programming, Multi-Layer Perceptron, J48 Decision Tree) in Java to predict stock purchase decisions. Achieved 96% accuracy with the MLP model. Responsible for the neural network and statistical analysis.",
      image: project3, // Placeholder image
      technologies: ["Java", "Python", "Git", "R"],
      githubUrl: "https://github.com/JoshuaGarner13/Machine-Learning-for-Stock-Purchase-Prediction",
      liveUrl: undefined
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
      {/* Accent bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent z-[60]" />
      <nav className="fixed top-1 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between bg-background/95 shadow border-b border-border/40 rounded-b-xl animate-fade-in-up">
          {/* Name/logo with animated accent */}
          <div className="flex items-center gap-2">
            <h1
              className="text-lg sm:text-xl font-bold tracking-tight cursor-pointer select-none relative"
              onClick={handleClick}
              onMouseEnter={handleButtonHover}
            >
              Joshua Garner
            </h1>
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" title="Active" />
          </div>
          {/* Centered nav links (desktop) */}
          <div className="hidden md:flex flex-1 justify-center gap-8">
            {['about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                onMouseEnter={handleButtonHover}
                className="relative text-base font-medium text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1 transition-colors duration-200 capitalize group"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary opacity-0 group-hover:opacity-100 group-hover:h-1 transition-all duration-300 rounded-full" />
              </button>
            ))}
          </div>
          {/* Social icons (desktop) */}
          <div className="hidden md:flex gap-4 items-center ml-4">
            <a href="https://github.com/JoshuaGarner13" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/joshua-garner-a893ba286/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:joshua33garner33@gmail.com" className="text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200">
              <Mail className="w-5 h-5" />
            </a>
          </div>
          {/* Hamburger menu (mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-2 rounded focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Open navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
          {/* Hint for command palette shortcut */}
          <div className="hidden md:flex items-center ml-6">
            <span className="flex items-center gap-1 text-xs text-muted-foreground bg-background/80 border border-border rounded px-2 py-1 shadow-sm animate-fade-in-up" style={{ opacity: 0.7 }}>
              <kbd className="px-1 py-0.5 bg-muted rounded border text-xs font-mono">/</kbd>
              <span className="text-xs">or</span>
              <kbd className="px-1 py-0.5 bg-muted rounded border text-xs font-mono">Ctrl</kbd>
              <span className="text-xs">+</span>
              <kbd className="px-1 py-0.5 bg-muted rounded border text-xs font-mono">K</kbd>
              <span className="ml-1">for quick actions</span>
            </span>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-0 left-0 w-full h-full bg-background/95 z-50 flex flex-col items-center justify-center gap-8 animate-fade-in-up">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close navigation menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {['about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => { setMobileMenuOpen(false); scrollToSection(item); }}
                className="text-2xl font-semibold text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200 capitalize"
              >
                {item}
              </button>
            ))}
            <div className="flex gap-6 mt-4">
              <a href="https://github.com/JoshuaGarner13" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/joshua-garner-a893ba286/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:joshua33garner33@gmail.com" className="text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        )}
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
                Joshua Garner
              </span>
              {clickEasterEgg && <Sparkles className="inline w-8 h-8 ml-2 text-accent animate-spin" />}
            </h1>
            <div className="text-xl md:text-2xl text-muted-foreground mb-8 h-8">
              <TypingEffect text="Final year BSc Information & Knowledge Systems student" speed={80} />
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Passionate about building impactful digital solutions with a focus on clean code, usability, and modern technology.
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
              asChild
              onMouseEnter={handleButtonHover}
            >
              <a href="/Joshua Garner CV.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
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
      <motion.section 
        id="about" 
        className="py-20 fade-in-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I am a final year BSc Information & Knowledge Systems student at the University of Pretoria,
                with a passion for frontend development and creating clean, user-friendly interfaces that make
                technology feel effortless. I love crafting experiences that are not only functional, but also
                visually engaging and intuitive. My studies have equipped me with a strong foundation in Backend
                development, software architecture, and database management, but my heart lies in building responsive,
                accessible, and elegant frontend solutions.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Beyond programming, I serve in my local church, where I've learned the value of humility, responsibility,
                and fellowship. My desire is not merely to build software, but to honor Christ in all that I do - whether in
                code, in community, or in the quiet moments of learning. Ultimately, I hope to be a faithful steward of the 
                gifts God has entrusted to me.
              </p>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                Pretoria, South Africa
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 rounded-full animate-avatar-float z-0" style={{filter: 'blur(8px)'}}>
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary via-accent to-fuchsia-400 opacity-60 animate-avatar-gradient" />
                </div>
                <img
                  src={profilePhoto}
                  alt="Profile Photo"
                  className="w-64 h-64 object-cover rounded-full border-4 border-primary shadow-2xl relative z-10 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_0_rgba(180,120,255,0.25)]"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Skills Section */}
      <motion.section 
        id="skills" 
        className="py-20 fade-in-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Skills & Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {skills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 mt-8">
            <CardHeader>
              <CardTitle>Technologies I Work With</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } }
                }}
              >
                {[
                  "JavaScript", "TypeScript", "React", "MongoDB", "Git", "Docker", "R", "HTML", "CSS", "Node.js", "TailWind", "Figma", "Java", "C++", "Python"
                ].map((tech) => (
                  <motion.div
                    key={tech}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
                    }}
                  >
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2 px-4 py-2 bg-background/60 border border-primary/30 shadow-lg rounded-full text-base font-medium backdrop-blur-md transition-all duration-200 hover:scale-105 hover:shadow-[0_0_16px_0_rgba(80,80,180,0.15)] hover:border-accent/80 focus-visible:ring-2 focus-visible:ring-primary cursor-pointer select-none"
                    >
                      {techIcons[tech]}
                      <span>{tech}</span>
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </motion.section>
      {/* Projects Section */}
      <motion.section 
        id="projects" 
        className="py-20 fade-in-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </motion.section>
      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-20 fade-in-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Let's Work Together</h2>
          <p className="text-muted-foreground mb-8 text-lg text-center">
            Have a project in mind? I'd love to hear about it. Fill out the form below and I'll get back to you soon.
          </p>
          <ContactForm />
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative py-10 mt-12 border-t border-border/50 bg-gradient-to-br from-primary/20 via-background to-accent/20 overflow-hidden">
        {/* Glowing top border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary blur-sm opacity-70 animate-pulse" />
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6 animate-fade-in-up">
          {/* Quick nav links */}
          <nav className="flex gap-6 mb-2 text-sm font-medium">
            <a href="#about" className="text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200">About</a>
            <a href="#skills" className="text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200">Skills</a>
            <a href="#projects" className="text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200">Projects</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200">Contact</a>
          </nav>
          {/* Social icons */}
          <div className="flex gap-6 mb-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  href="https://github.com/JoshuaGarner13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200 relative"
                  whileHover={{ scale: 1.18, rotate: -8, boxShadow: '0 0 16px 4px hsl(270, 91%, 65%, 0.4)' }}
                  whileTap={{ scale: 0.92, boxShadow: '0 0 32px 8px hsl(270, 91%, 65%, 0.6)' }}
                  tabIndex={0}
                  aria-label="GitHub"
                >
                  <Github className="w-7 h-7" />
                  {/* Sparkle/shine effect */}
                  <motion.span
                    className="absolute left-1/2 top-1/2 w-8 h-8 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.7, x: '-50%', y: '-50%' }}
                    whileHover={{ opacity: 0.7, scale: 1.2 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{
                      background: 'radial-gradient(circle, hsl(270, 91%, 85%, 0.7) 0%, transparent 80%)',
                      borderRadius: '50%',
                      zIndex: 1,
                    }}
                  />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>GitHub</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  href="https://linkedin.com/in/joshua-garner-a893ba286/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200 relative"
                  whileHover={{ scale: 1.18, rotate: 8, boxShadow: '0 0 16px 4px hsl(180, 91%, 65%, 0.4)' }}
                  whileTap={{ scale: 0.92, boxShadow: '0 0 32px 8px hsl(180, 91%, 65%, 0.6)' }}
                  tabIndex={0}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-7 h-7" />
                  <motion.span
                    className="absolute left-1/2 top-1/2 w-8 h-8 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.7, x: '-50%', y: '-50%' }}
                    whileHover={{ opacity: 0.7, scale: 1.2 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{
                      background: 'radial-gradient(circle, hsl(180, 91%, 85%, 0.7) 0%, transparent 80%)',
                      borderRadius: '50%',
                      zIndex: 1,
                    }}
                  />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>LinkedIn</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  href="mailto:joshua33garner33@gmail.com"
                  className="group text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200 relative"
                  whileHover={{ scale: 1.18, rotate: -8, boxShadow: '0 0 16px 4px hsl(45, 91%, 65%, 0.4)' }}
                  whileTap={{ scale: 0.92, boxShadow: '0 0 32px 8px hsl(45, 91%, 65%, 0.6)' }}
                  tabIndex={0}
                  aria-label="Email"
                >
                  <Mail className="w-7 h-7" />
                  <motion.span
                    className="absolute left-1/2 top-1/2 w-8 h-8 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.7, x: '-50%', y: '-50%' }}
                    whileHover={{ opacity: 0.7, scale: 1.2 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{
                      background: 'radial-gradient(circle, hsl(45, 91%, 85%, 0.7) 0%, transparent 80%)',
                      borderRadius: '50%',
                      zIndex: 1,
                    }}
                  />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>Email</TooltipContent>
            </Tooltip>
          </div>
          {/* Tagline */}
          <p className="text-xs text-muted-foreground tracking-wide italic mb-2">Building playful, modern web experiences with a techy twist.</p>
          {/* Sound Toggle */}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={toggleSound}
              aria-label={soundOn ? 'Disable sound effects' : 'Enable sound effects'}
              className={`p-2 rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary ${soundOn ? 'bg-accent text-accent-foreground' : 'bg-background text-muted-foreground hover:bg-accent/20'}`}
            >
              {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <span className="text-xs text-muted-foreground">Sound {soundOn ? 'On' : 'Off'}</span>
          </div>
          {/* Copyright & Back to Top */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-2xl gap-2">
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Joshua Garner. All rights reserved.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-2 sm:mt-0 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold shadow hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200"
              aria-label="Back to Top"
            >
              ↑ Back to Top
            </button>
          </div>
        </div>
      </footer>
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => handleCommand('about')}>Go to About <CommandShortcut>A</CommandShortcut></CommandItem>
            <CommandItem onSelect={() => handleCommand('skills')}>Go to Skills <CommandShortcut>S</CommandShortcut></CommandItem>
            <CommandItem onSelect={() => handleCommand('projects')}>Go to Projects <CommandShortcut>P</CommandShortcut></CommandItem>
            <CommandItem onSelect={() => handleCommand('contact')}>Go to Contact <CommandShortcut>C</CommandShortcut></CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Easter Eggs & Fun">
            <CommandItem onSelect={() => handleCommand('fun')}>Toggle Fun Mode <CommandShortcut>B</CommandShortcut></CommandItem>
            <CommandItem onSelect={() => handleCommand('matrix')}>Matrix Mode <CommandShortcut>M</CommandShortcut></CommandItem>
            <CommandItem onSelect={() => handleCommand('rainbow')}>Rainbow Mode <CommandShortcut>T</CommandShortcut></CommandItem>
            <CommandItem onSelect={() => handleCommand('404')}>Go to 404 Page <CommandShortcut>404</CommandShortcut></CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Secret">
            <CommandItem onSelect={() => { setCommandOpen(false); alert('You found a secret! 🎉'); }}>Show Secret Alert</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

import { useForm } from 'react-hook-form';

function ContactForm() {
  const form = useForm({ mode: 'onTouched' });
  const [submitted, setSubmitted] = useState(false);
  const confettiRef = useRef(null);

  const launchConfetti = () => {
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
  };

  const onSubmit = (data) => {
    setSubmitted(true);
    launchConfetti();
    // Here you would send the data to your backend or email service
    // e.g., fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
  };

  return (
    <div className="relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto bg-card/60 p-8 rounded-xl shadow-lg border border-border/50" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />
          <FormField
            control={form.control}
            name="name"
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            rules={{ required: 'Email is required', pattern: { value: /.+@.+\..+/, message: 'Enter a valid email' } }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            rules={{ required: 'Message is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="How can I help you?" rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" size="lg" className="bg-gradient-primary w-full max-w-xs">Send Message</Button>
          </div>
          {submitted && (
            <div className="text-green-600 text-center font-medium pt-2">Thank you! Your message has been sent.</div>
          )}
        </form>
      </Form>
      <noscript>
        <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" hidden>
          <input type="hidden" name="form-name" value="contact" />
          <input type="text" name="name" />
          <input type="email" name="email" />
          <textarea name="message"></textarea>
          <input type="text" name="bot-field" />
        </form>
      </noscript>
      <canvas ref={confettiRef} className="fixed inset-0 pointer-events-none z-50" style={{display: submitted ? 'block' : 'none'}} />
    </div>
  );
}

export { techIcons };
export default Index;

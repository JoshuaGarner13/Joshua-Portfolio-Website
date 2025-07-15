import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TypingEffect } from '@/components/TypingEffect';
import { SkillCard } from '@/components/SkillCard';
import { ProjectCard } from '@/components/ProjectCard';
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
  ChevronDown
} from 'lucide-react';

// Import project images
import project1 from '@/assets/project1.jpg';
import project2 from '@/assets/project2.jpg';
import project3 from '@/assets/project3.jpg';

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);

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

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
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
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border/50 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold gradient-text">Portfolio</h1>
          <div className="hidden md:flex space-x-6">
            {['about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-muted-foreground hover:text-primary transition-smooth capitalize"
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
        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <p className="text-accent mb-2">Hello, I'm</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="gradient-text">Alex Johnson</span>
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
              className="bg-gradient-primary hover:opacity-90 glow-primary"
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </Button>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
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

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const ProjectCard = ({ title, description, image, technologies, githubUrl, liveUrl }: ProjectCardProps) => {
  return (
    <Card className="group overflow-hidden hover:glow-accent transition-spring hover:scale-105 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardHeader>
        <CardTitle className="group-hover:text-accent transition-smooth">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-secondary/50">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2 pt-2">
          {githubUrl && (
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button size="sm" className="flex-1 bg-gradient-primary hover:opacity-90" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SkillCardProps {
  icon: ReactNode;
  title: string;
  level: number;
}

export const SkillCard = ({ icon, title, level }: SkillCardProps) => {
  return (
    <Card className="group hover:glow-primary transition-spring hover:scale-105 bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4 text-4xl group-hover:text-primary transition-smooth">
          {icon}
        </div>
        <h3 className="font-semibold mb-3">{title}</h3>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${level}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground mt-2 block">{level}%</span>
      </CardContent>
    </Card>
  );
};
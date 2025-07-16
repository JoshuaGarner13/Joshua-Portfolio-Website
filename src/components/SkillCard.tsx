import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
}

export const SkillCard = ({ icon, title }: SkillCardProps) => {
  return (
    <Card className="group hover:glow-primary transition-spring hover:scale-105 bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4 text-4xl group-hover:text-primary transition-smooth">
          {icon}
        </div>
        <h3 className="font-semibold mb-0 text-lg">{title}</h3>
      </CardContent>
    </Card>
  );
};
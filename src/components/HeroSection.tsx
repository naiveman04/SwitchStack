
import React, { useRef } from 'react';
import { useScrollFade } from '@/hooks/use-scroll-fade';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  fadeOptions?: {
    startFade?: number;
    endFade?: number;
    startOpacity?: number;
    endOpacity?: number;
    reverse?: boolean;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  children,
  className = '',
  fadeOptions = {}
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const opacity = useScrollFade(heroRef, { 
    startFade: 0.2,
    endFade: 0.8,
    startOpacity: 1,
    endOpacity: 0.1,
    ...fadeOptions 
  });

  return (
    <div 
      ref={heroRef} 
      className={`hero-section min-h-[100vh] flex flex-col items-center justify-center ${className}`}
    >
      <div
        className="text-center transition-opacity duration-300 px-4"
        style={{ opacity }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{title}</h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
};

export default HeroSection;

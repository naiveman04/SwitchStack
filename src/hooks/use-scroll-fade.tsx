
import { useEffect, useState, RefObject } from 'react';

interface ScrollFadeOptions {
  startFade?: number; // Percentage of section height where fade starts (0-1)
  endFade?: number;   // Percentage of section height where fade ends (0-1)
}

export const useScrollFade = (
  ref: RefObject<HTMLElement>,
  options: ScrollFadeOptions = {}
) => {
  const [opacity, setOpacity] = useState(1);
  const { startFade = 0.5, endFade = 1 } = options;

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrollPosition = window.scrollY;
      const elementTop = rect.top + window.scrollY;
      
      // Calculate how far down the section we've scrolled (0 to 1)
      const scrollProgress = (scrollPosition - elementTop + window.innerHeight) / sectionHeight;
      
      // Calculate opacity based on scroll progress
      if (scrollProgress < startFade) {
        // Before fade starts, full opacity
        setOpacity(1);
      } else if (scrollProgress > endFade) {
        // After fade ends, zero opacity
        setOpacity(0);
      } else {
        // During fade, calculate opacity
        const fadeRange = endFade - startFade;
        const fadeProgress = (scrollProgress - startFade) / fadeRange;
        setOpacity(1 - fadeProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Run once on mount to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, startFade, endFade]);

  return opacity;
};

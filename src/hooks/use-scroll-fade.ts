
import { useState, useEffect, RefObject } from 'react';

interface ScrollFadeOptions {
  startFade: number; // Percentage of section height (0-1) where fade starts
  endFade: number;   // Percentage of section height (0-1) where fade ends
}

export const useScrollFade = (
  ref: RefObject<HTMLElement>,
  options: ScrollFadeOptions = { startFade: 0.5, endFade: 1 }
): number => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // When element is in view
      if (elementTop <= window.innerHeight && elementTop + elementHeight >= 0) {
        // Calculate how far we've scrolled into the element as a percentage
        const scrollPosition = window.innerHeight - elementTop;
        const scrollPercentage = scrollPosition / elementHeight;
        
        // Calculate opacity based on scroll percentage
        const { startFade, endFade } = options;
        const fadeRange = endFade - startFade;
        
        if (scrollPercentage <= startFade) {
          setOpacity(1);
        } else if (scrollPercentage >= endFade) {
          setOpacity(0);
        } else {
          // Linear interpolation for opacity between start and end fade points
          const fadePercentage = (scrollPercentage - startFade) / fadeRange;
          setOpacity(1 - fadePercentage);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, options]);

  return opacity;
};


import { useState, useEffect, RefObject } from 'react';

interface ScrollFadeOptions {
  startFade: number; // Percentage of section height (0-1) where fade starts
  endFade: number;   // Percentage of section height (0-1) where fade ends
  startOpacity?: number; // Initial opacity (default: 1)
  endOpacity?: number;   // Final opacity (default: 0)
  reverse?: boolean;     // If true, opacity increases while scrolling instead of decreasing
}

export const useScrollFade = (
  ref: RefObject<HTMLElement>,
  options: ScrollFadeOptions = { startFade: 0.5, endFade: 1 }
): number => {
  const { 
    startFade,
    endFade,
    startOpacity = 1, 
    endOpacity = 0,
    reverse = false 
  } = options;
  
  const [opacity, setOpacity] = useState(startOpacity);

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
        const fadeRange = endFade - startFade;
        
        if (scrollPercentage <= startFade) {
          setOpacity(reverse ? endOpacity : startOpacity);
        } else if (scrollPercentage >= endFade) {
          setOpacity(reverse ? startOpacity : endOpacity);
        } else {
          // Linear interpolation for opacity between start and end fade points
          const fadePercentage = (scrollPercentage - startFade) / fadeRange;
          const calculatedOpacity = reverse
            ? endOpacity + fadePercentage * (startOpacity - endOpacity)
            : startOpacity - fadePercentage * (startOpacity - endOpacity);
          setOpacity(calculatedOpacity);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, startFade, endFade, startOpacity, endOpacity, reverse]);

  return opacity;
};

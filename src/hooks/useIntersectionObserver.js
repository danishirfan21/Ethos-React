import { useEffect, useRef } from 'react';

/**
 * Custom hook for intersection observer
 * Adds 'visible' class when element intersects viewport
 *
 * @param {Object} options - IntersectionObserver options
 * @returns {React.RefObject} - Ref to attach to observed element
 */
export const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: options.threshold || 0.2,
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold]);

  return elementRef;
};

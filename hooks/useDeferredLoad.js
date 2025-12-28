'use client';

import { useEffect, useState, useRef } from 'react';

export const useDeferredLoad = (options = {}) => {
  const { rootMargin = '200px' } = options;
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (hasLoaded) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin, hasLoaded]);

  return { ref, hasLoaded };
};

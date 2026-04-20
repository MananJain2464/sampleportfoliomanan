import { useCallback, useRef, useState } from 'react';

export function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Callback ref — re-runs whenever the DOM node mounts/unmounts,
  // which handles conditionally rendered elements correctly.
  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!node) return;
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect(); // trigger once
          }
        },
        { threshold }
      );
      observerRef.current.observe(node);
    },
    [threshold]
  );

  return { ref, isInView };
}

import React, { useEffect, useRef, useState } from "react";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean; // animate only once by default
};

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  threshold = 0.12,
  rootMargin = "0px 0px -6% 0px",
  once = true,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once && observer && node) {
              observer.unobserve(node);
            }
          } else if (!once) {
            // if not once, toggle visibility
            setInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      try {
        observer.disconnect();
      } catch (e) {
        /* ignore */
      }
    };
  }, [threshold, rootMargin, once]);

  return React.createElement(
    "section",
    {
      ref: ref as any,
      className: `animate-section ${inView ? "in-view" : ""} ${className}`.trim(),
      "aria-hidden": false,
    },
    children
  );
};

export default AnimatedSection;

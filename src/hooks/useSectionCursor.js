import { useEffect, useRef } from "react";
import { useCursor } from "../context/CursorContext";

export default function useSectionCursor(mode) {
  const ref = useRef(null);
  const { setCursorMode } = useCursor();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCursorMode(mode);
        } else {
          // Exiting this section: revert to "default" if the cursor is still in this section's mode
          setCursorMode((curr) => (curr === mode ? "default" : curr));
        }
      },
      { 
        // Lower threshold ensures that tall sections like Projects trigger immediately 
        // when they enter the viewport, and clear cleanly as soon as they exit.
        threshold: 0.15 
      }
    );

    const target = ref.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [mode, setCursorMode]);

  return ref;
}
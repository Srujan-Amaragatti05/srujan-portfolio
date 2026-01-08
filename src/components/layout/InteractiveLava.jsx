import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function InteractiveLava() {
  const containerRef = useRef(null);
  
  const { scrollY } = useScroll();
  // Keeps the background visible, simply softening it a bit at the very top if desired, but sticking close to 1
  const bgOpacity = useTransform(scrollY, [0, 500], [0.8, 1]);

  useEffect(() => {
    const interBubble = containerRef.current;
    if (!interBubble) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    let timeoutId;
    let isVisible = false;

    // Movement speed tuning
    const ease = 0.05;

    const move = () => {
      // Linear interpolation for smooth trailing
      curX += (tgX - curX) * ease;
      curY += (tgY - curY) * ease;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    };

    const handleMouseMove = (event) => {
      tgX = event.clientX;
      tgY = event.clientY;

      if (!isVisible) {
        isVisible = true;
        interBubble.style.opacity = 1;
      }

      // Hide after rest
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isVisible = false;
        interBubble.style.opacity = 0;
      }, 500); // hide after 500ms of inactivity
    };

    const handleMouseLeave = () => {
      isVisible = false;
      interBubble.style.opacity = 0;
      clearTimeout(timeoutId);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="gradient-bg pointer-events-none fixed top-0 left-0 w-screen h-screen overflow-hidden">
      <div className="gradients-container w-full h-full relative">
        <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
        </motion.div>
        {/* Core trailing bubble */}
        <div
          ref={containerRef}
          className="interactive-bubble absolute rounded-full opacity-0 transition-opacity duration-700 top-[-50%] left-[-50%] w-[100%] h-[100%]"
        ></div>
      </div>
    </div>
  );
}

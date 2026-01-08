import { useEffect, useState } from "react";
import { useCursor } from "../../context/CursorContext";
import { motion, useSpring } from "framer-motion";

export default function CursorCore() {
  const { cursorMode } = useCursor();
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  // Smooth, floaty spring physics for custom trailing/lagging cursor movement
  const cursorX = useSpring(0, { stiffness: 450, damping: 28, mass: 0.25 });
  const cursorY = useSpring(0, { stiffness: 450, damping: 28, mass: 0.25 });

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  // Global hover detection for standard clickable elements to expand the cursor dynamically
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".magnetic-button") ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHoveringLink(!!isClickable);
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  const getCursorConfig = () => {
    switch (cursorMode) {
      case "hero":
        return { size: 32, text: "" };
      case "projects":
        return { size: 80, text: "VIEW" };
      case "skills":
        return { size: 48, text: "" };
      case "about":
        return { size: 32, text: "" };
      case "contact":
        return { size: 80, text: "HI!" };
      case "minimal":
        return { size: 12, text: "" };
      default:
        // Default minimalist cursor is a medium-sized solid circle
        return { size: 24, text: "" };
    }
  };

  const { size: baseSize, text } = getCursorConfig();

  // Scale up dynamically by 1.8x when hovering over interactive components, capping minimum size at 48px
  const size = isHoveringLink ? Math.max(baseSize * 1.8, 48) : baseSize;

  // Fully disable custom cursor on touch/mobile viewports where hover states are absent
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] flex items-center justify-center text-center font-mono font-bold tracking-wider overflow-hidden"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: "difference",
        backgroundColor: "white",
        color: "black", // Dark text inside white background for beautiful inversion contrast
      }}
      animate={{
        width: size,
        height: size,
        opacity: size > 0 ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      {text && (
        <motion.span
          className="text-xs uppercase tracking-widest pointer-events-none select-none font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {text}
        </motion.span>
      )}
    </motion.div>
  );
}
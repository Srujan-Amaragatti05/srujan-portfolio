import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const name = "SRUJAN AMARAGATTI";

export default function Loader({ onFinish }) {
  const controls = useAnimation();
  const containerControls = useAnimation();
  const [mounted, setMounted] = useState(true);
  const [isScattering, setIsScattering] = useState(false);

  useEffect(() => {
    async function sequence() {
      // 1. Animate letters in
      await controls.start("visible");
      
      // 2. Wait for a moment to let the user read it
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 3. Trigger the sand/dust scattering effect
      setIsScattering(true);
      controls.start("sand");
      
      // Wait for scattering to mostly finish before fading background
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 4. Fade out the background layer and complete
      await containerControls.start({ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } });
      
      setMounted(false);
      onFinish();
    }
    sequence();
  }, [controls, containerControls, onFinish]);

  if (!mounted) return null;

  // Variants for each individual character
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" }
    }),
    sand: () => ({
      y: [0, Math.random() * -40 - 20, Math.random() * 300 + 200], // Lift slightly then drop heavily
      x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 400], // Scatter sideways
      rotate: [0, (Math.random() - 0.5) * 90, (Math.random() - 0.5) * 720], // Tumble randomly
      scale: [1, 1.2, 0], // Swell then shrink to nothing
      opacity: [1, 1, 0], // Fade out
      filter: ["blur(0px)", "blur(4px)", "blur(20px)"], // Dissolve into dust
      transition: { 
        duration: 1.5,
        ease: "easeInOut",
        delay: Math.random() * 0.4 // Organic, unpredictable crumbling delay
      }
    })
  };

  const words = name.split(" ");
  let globalIndex = 0;

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-[1000] pointer-events-none select-none"
      style={{ background: "var(--bg-color, #0d0d0d)" }}
      animate={containerControls}
    >
      <div className="flex flex-col items-center justify-center text-center gap-6">
        {/* Hello, I'm */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isScattering ? 0 : 1, y: isScattering ? -10 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ color: "var(--secondary)" }}
          className="text-2xl md:text-3xl font-bold tracking-wide font-mono uppercase"
        >
          Hello, I'm
        </motion.div>

        {/* SRUJAN AMARAGATTI */}
        <div className="flex flex-wrap justify-center gap-x-4 my-2">
          {words.map((word, wordIdx) => (
            <div key={wordIdx} className="flex">
              {word.split("").map((char, i) => {
                const currentIndex = globalIndex++;
                return (
                  <motion.span
                    key={i}
                    custom={currentIndex}
                    variants={letterVariants}
                    initial="hidden"
                    animate={controls}
                    className="text-4xl md:text-6xl font-bold inline-block"
                    style={{
                      background: "linear-gradient(to right, var(--primary), var(--secondary))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Loading... with three animated dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isScattering ? 0 : 1, y: isScattering ? 10 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-1 font-mono text-sm tracking-widest mt-8 uppercase"
          style={{ color: "var(--secondary)" }}
        >
          <span className="text-2xl md:text-3xl">Loading</span>
          <span className="flex items-center gap-1 ml-1 text-2xl md:text-3xl">
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
            />
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
            />
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
            />
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
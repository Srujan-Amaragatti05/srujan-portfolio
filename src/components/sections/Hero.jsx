import { motion, useScroll, useTransform } from "framer-motion";

import useTypingEffect from "../../hooks/useTypingEffect";
import useSectionCursor from "../../hooks/useSectionCursor";
import MagneticButton from "../ui/MagneticButton";

export default function Hero() {
  const typed = useTypingEffect([
    "AI Engineer",
    "Full Stack Developer",
    "Problem Solver",
    "Backend Engineer",
    "Software Engineer",
    "System Designer",
    "System Architect"
  ]);

  const sectionRef = useSectionCursor("hero");
  
  // Parallax Scroll Tracking for Background Image
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], ["0%", "25%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >

      {/* ===== PARALLAX BACKGROUND PORTRAIT ===== */}
      <motion.div
        style={{ y }}
        className="absolute right-0 bottom-0 w-full md:w-[60%] h-screen z-[-5] pointer-events-none opacity-30 grayscale select-none overflow-hidden"
      >
        <img 
          src="/images/Image.png" 
          alt="Srujan Portrait" 
          className="w-full h-full object-contain object-right-bottom scale-110"
        />
      </motion.div>

      {/* ===== BACKGROUND LAYER ===== */}
      <motion.div
        className="absolute inset-0 z-[-20]"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, var(--primary) 0%, transparent 70%)",
            opacity: 0.06
          }}
        />
      </motion.div>

      {/* ===== CONTENT LAYER ===== */}
      <motion.div
        className="relative z-10 max-w-6xl w-full flex flex-col items-start justify-center gap-12 px-4 md:px-8"
      >

        {/* LEFT-ALIGNED TEXT */}
        <div className="max-w-3xl text-left z-20 text-white">
          <h2 style={{ color: "var(--secondary)" }} className="text-3xl md:text-3xl font-bold text-left">Hi, I'm</h2>
          {/* Cinematic Title */}
          <div className="overflow-visible">
            <motion.h1
              className="text-6xl md:text-8xl display-font leading-none tracking-tighter text-left"
              initial={{
                y: "100%",
                opacity: 0,
                filter: "blur(8px)",
                scale: 1.05
              }}
              animate={{
                y: "0%",
                opacity: 1,
                filter: "blur(0px)",
                scale: 1
              }}
              transition={{
                duration: 1.2,
                ease: [0.77, 0, 0.175, 1]
              }}
            >
              SRUJAN<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                AMARAGATTI
              </span>
            </motion.h1>
          </div>

          {/* Typing Subheading */}
          <motion.h2
            className="text-xl md:text-2xl font-light tracking-widest uppercase mt-6 text-left"
            style={{ color: "var(--secondary)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {typed}
          </motion.h2>

          {/* Description Bio */}
          <motion.p
            className="text-gray-400 font-sans font-light text-base md:text-lg max-w-2xl mt-6 leading-relaxed tracking-wide text-left"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Specializing in local-first developer intelligence, high-throughput distributed systems, and contextual automation. I engineer tools that decode codebase complexity into structured, explainable architectures.
          </motion.p>

          {/* Buttons */}
          <div className="mt-10 flex gap-6 justify-start">
            <MagneticButton 
              className="glass px-6 py-3 rounded-lg font-medium"
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Projects
            </MagneticButton>

            <MagneticButton
              className="px-6 py-3 rounded-lg font-medium border transition-colors duration-300 hover:bg-white hover:text-black"
              style={{
                borderColor: "var(--primary)"
              }}
            >
              <a href="https://drive.google.com/file/d/1ZpFFC6ihPz51RFZfo8qqLHFX44QiWKzQ/preview" target="_blank">
                Download Resume
              </a>
            </MagneticButton>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import useSectionCursor from "../../hooks/useSectionCursor";

function ScrollText({ children }) {
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["0 0.9", "1 0.7"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <motion.span ref={textRef} style={{ opacity }} className="mr-3">
      {children}
    </motion.span>
  );
}

export default function About() {
  const sectionRef = useSectionCursor("about");

  const text = "I FOCUS ON BUILDING INTELLIGENT SYSTEMS THAT ARE NOT ONLY ACCURATE, BUT SCALABLE, MAINTAINABLE, AND THOUGHTFULLY DESIGNED.";
  const words = text.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-48 px-6 z-10 bg-transparent"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1fr_3fr] gap-12">
          <div>
            <h2 className="text-xl font-mono text-[var(--secondary)] uppercase tracking-widest sticky top-32">
              [02] THE JOURNEY
            </h2>
          </div>

          <div className="space-y-24">
            <h3 className="text-4xl md:text-4xl lg:text-4xl display-font leading-tight font-bold text-white uppercase flex flex-wrap">
              {words.map((word, i) => (
                <ScrollText key={i}>{word}</ScrollText>
              ))}
            </h3>

            <div className="grid sm:grid-cols-2 gap-12 text-xs font-mono text-[var(--secondary)]">
              <div className="border-t border-[var(--glass-border)] pt-6">
                <p className="text-2xl md:text-2xl lg:text-2xl mb-4 text-white">ACADEMIC FOUNDATION</p>
                <p className="text-lg text-gray-400">Diploma in Computer Science(8.97 CGPA) — Built programming fundamentals, system logic, and disciplined problem-solving.</p>
                <p className="mt-4 text-lg text-gray-400">B.E. Information Science (7.54 CGPA) — Evolved from writing code to understanding sustainable systems.</p>
              </div>

              <div className="border-t border-[var(--glass-border)] pt-6">
                <p className="text-2xl md:text-2xl lg:text-2xl mb-4 text-white">CORE PHILOSOPHY</p>
                <p className="text-lg text-gray-400">Deeply curious about how intelligent models integrate into production — designing reliable end-to-end pipelines beyond just algorithms.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
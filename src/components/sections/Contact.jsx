import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import useSectionCursor from "../../hooks/useSectionCursor";
import MagneticButton from "../ui/MagneticButton";

export default function Contact() {
  const sectionRef = useSectionCursor("contact");
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] bg-transparent flex flex-col justify-end z-20">
      {/* Static intersection target for custom cursor to avoid motion-translation conflicts */}
      <div ref={sectionRef} className="absolute inset-0 pointer-events-none z-0" />
      
      <motion.div style={{ y }} className="w-full h-full flex flex-col justify-between pt-32 px-6 lg:px-12 flex-grow overflow-hidden">
        
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center gap-12 lg:pt-20">
            <div className="flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Have an idea?<br/>Let&apos;s build it.
                </h2>
                <p className="text-[var(--secondary)] font-mono text-lg max-w-md mb-12">
                    I&apos;m always open to discussing product design work or partnership opportunities.
                </p>
                
                <div>
                    <MagneticButton className="inline-block">
                        <a href="mailto:srujanatti7996@gmail.com" className="inline-flex items-center justify-center px-10 py-5 bg-white text-black hover:bg-[var(--primary)] hover:text-white rounded-full font-bold tracking-widest text-sm transition-colors duration-300">
                            START A PROJECT
                        </a>
                    </MagneticButton>
                </div>
            </div>

            <div className="flex flex-col items-center mt-6">
                <p className="text-[var(--secondary)] mb-6 tracking-widest uppercase font-mono text-xl hidden md:block">Connect</p>
                <div className="flex flex-wrap justify-center gap-6 font-mono text-white text-sm">
                    <MagneticButton>
                        <a href="https://github.com/Srujan-Amaragatti05" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 rounded-full border border-white/10 hover:bg-white/10 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all duration-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path></svg>
                            GITHUB
                        </a>
                    </MagneticButton>
                    <MagneticButton>
                        <a href="https://linkedin.com/in/srujan-amaragatti" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 rounded-full border border-white/10 hover:bg-[#0077b5]/10 hover:text-[#0077b5] hover:border-[#0077b5] transition-all duration-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            LINKEDIN
                        </a>
                    </MagneticButton>
                    <MagneticButton>
                        <a href="mailto:srujanatti7996@gmail.com" className="flex items-center gap-3 px-6 py-4 rounded-full border border-white/10 hover:bg-[#ea4335]/10 hover:text-[#ea4335] hover:border-[#ea4335] transition-all duration-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            EMAIL
                        </a>
                    </MagneticButton>
                    <MagneticButton>
                        <a href="https://instagram.com/onlysruj__.jpg" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 rounded-full border border-white/10 hover:bg-[#e1306c]/10 hover:text-[#e1306c] hover:border-[#e1306c] transition-all duration-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                            INSTAGRAM
                        </a>
                    </MagneticButton>
                </div>
            </div>
        </div>

        {/* BOTTOM TEXT */}
        <div className="w-full overflow-hidden mt-auto pb-12 pt-12 border-t border-white/[0.05]">
            <h1 className="text-[5vw] md:text-[6vw] leading-none mb-0 font-bold display-font text-center text-white tracking-tighter whitespace-nowrap">
                LET&apos;S WORK TOGETHER
            </h1>
        </div>

      </motion.div>
    </section>
  );
}
// portfolio-update-1768641504.0-914030

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import useSectionCursor from "../../hooks/useSectionCursor";
import MagneticButton from "../ui/MagneticButton";

const experiences = [
  {
    role: "Software Developer Intern",
    organization: "Samarth MediTech",
    period: "Oct 2023 – Nov 2023",
    highlights: [
      "Contributed to the development and maintenance of medical software solutions.",
      "Collaborated with senior developers to implement new features and resolve bugs.",
      "Resolved web interface performance bottlenecks and optimized frontend rendering.",
      "Gained hands-on experience utilizing Java, SQL, and RESTful APIs."
    ],
    learnt: [
      "Enterprise Architecture: Understood industrial codebase structure and maintenance patterns under senior guidance.",
      "Database Optimization: Mastered index strategy, query bottlenecks, and relational constraints in SQL.",
      "Quality Assurance: Learned to triage issues, isolate rendering bottlenecks, and write reliable bug resolutions.",
      "Collaboration Flow: Adapted to professional Git flows, pull request reviews, and agile sprint dynamics."
    ],
    certificate: "https://drive.google.com/file/d/1RVBvsY-TBgZqO7XlgRXr3St9RVGADpBr/preview"
  },
  {
    role: "Class Representative",
    organization: "Diploma in Computer Science",
    period: "2022 – 2024",
    highlights: [
      "Coordinated academic communication between faculty and students.",
      "Represented class concerns in structured discussions.",
      "Managed academic updates, schedules, and clarifications.",
      "Acted as the primary point of contact for institutional coordination."
    ],
    learnt: [
      "Communication: Bridged administration expectations with student body requirements under strict timelines.",
      "Conflict Resolution: Negotiated schedules, curriculum paces, and resource access amidst conflicting interests.",
      "Leadership: Managed delegation and communication channels for over 60+ student peers.",
      "Systematic Clarification: Designed efficient, noise-free announcement structures to reduce communication latency."
    ]
  }
];

function TypewriterLine({ text, delay = 0 }) {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        const nextChar = text.charAt(index);
        setDisplayedText((prev) => prev + nextChar);
        index++;
        if (index >= text.length) {
          clearInterval(interval);
        }
      }, 12); // Fast, premium type speed
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, text, delay]);

  return (
    <span ref={ref} className="font-mono">
      {displayedText}
      {displayedText.length < text.length && (
        <span className="inline-block w-1.5 h-3 bg-[var(--accent)] ml-0.5 animate-pulse" />
      )}
    </span>
  );
}

function LearningCard({ exp, index }) {
  return (
    <div className="p-8 md:p-10 rounded-3xl border border-[#5e6ad2]/20 bg-black/30 backdrop-blur-xl hover:bg-black/50 transition-all duration-500 hover:border-[#5e6ad2]/50 hover:shadow-[0_0_30px_rgba(94,106,210,0.15)] group flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between gap-4 mb-6 border-b border-[#5e6ad2]/20 pb-4">
          <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
            insight_engine://learnt.log
          </span>
          <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
            [SYS_OK_v1.0]
          </span>
        </div>

        <h4 className="text-lg md:text-xl font-mono text-white mb-6 tracking-tight">
          &gt; Decoded Knowledge:
        </h4>

        <ul className="space-y-6">
          {exp.learnt.map((point, i) => {
            const parts = point.split(": ");
            const category = parts[0];
            const detail = parts[1];
            
            // Stagger line rendering
            const delay = 500 + i * 1400;

            return (
              <li key={i} className="text-sm md:text-base leading-relaxed text-gray-400 flex items-start">
                <span className="text-[var(--accent)] mr-3 font-mono mt-0.5">&gt;_</span>
                <div className="flex flex-col">
                  <span className="text-[var(--accent)] font-mono text-xs uppercase tracking-wider mb-0.5">
                    <TypewriterLine text={category} delay={delay} />
                  </span>
                  <span className="text-gray-300 font-sans font-light">
                    <TypewriterLine text={detail} delay={delay + category.length * 15} />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 pt-4 border-t border-[var(--glass-border)] flex justify-between items-center text-[10px] font-mono text-white/30">
        <span>TARGET_ORG: {exp.organization.toUpperCase()}</span>
        <span>INDEX: 0{index + 1}</span>
      </div>
    </div>
  );
}

function TimelineItem({ exp, index, isLast }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 0.8", "1 0.2"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  const isEven = index % 2 === 0;

  return (
    <div className={`relative w-full mb-12 md:mb-24 flex flex-col md:flex-row gap-8 md:gap-32 items-stretch ${isEven ? '' : 'md:flex-row-reverse'}`}>
      {/* Desktop Central Line */}
      {!isLast && (
        <div className="hidden md:block absolute left-[50%] top-24 bottom-[-8rem] w-px bg-gradient-to-b from-[var(--glass-border)] via-white/10 to-transparent transform -translate-x-1/2 z-0" />
      )}
      
      {/* Mobile Left Line */}
      {!isLast && (
        <div className="md:hidden absolute left-[15px] top-20 bottom-[-4rem] w-px bg-gradient-to-b from-[var(--glass-border)] via-white/10 to-transparent z-0" />
      )}

      {/* Timeline Node Desktop */}
      <div className="hidden md:flex absolute left-[50%] top-16 w-12 h-12 rounded-full bg-black border border-[var(--glass-border)] transform -translate-x-1/2 z-10 items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-[var(--accent)] shadow-[0_0_15px_var(--accent)]" />
      </div>

      {/* Timeline Node Mobile */}
      <div className="md:hidden absolute left-0 top-12 w-8 h-8 rounded-full bg-black border border-[var(--glass-border)] z-10 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
      </div>

      {/* COLUMN 1: EXPERIENCE CARD */}
      <motion.div 
        ref={ref}
        style={{ opacity, scale }}
        className="relative pl-12 md:pl-0 w-full md:w-[calc(50%-4rem)]"
      >
        <div className="p-8 md:p-10 rounded-3xl border border-[var(--glass-border)] bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-all duration-500 hover:border-white/20 hover:shadow-2xl group h-full flex flex-col justify-between">
          <div>
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[var(--primary)] transition-colors">{exp.role}</h3>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[var(--secondary)] font-mono text-xs tracking-widest whitespace-nowrap w-fit">
                {exp.period}
              </span>
            </div>
            
            <h4 className="text-xl text-[var(--accent)] font-mono mb-8 pb-6 border-b border-[var(--glass-border)]">
              @ {exp.organization}
            </h4>

            <ul className="space-y-4">
              {exp.highlights.map((point, i) => (
                <li key={i} className="text-gray-400 text-base leading-relaxed flex items-start">
                  <span className="text-[var(--accent)] mr-4 mt-1 font-mono">&gt;</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {exp.certificate && (
            <div className="mt-8 pt-6 border-t border-[var(--glass-border)]">
              <MagneticButton>
                <a
                  href={exp.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--accent)]/30 hover:border-[var(--accent)] bg-[var(--accent)]/5 hover:bg-[var(--accent)]/10 text-white hover:text-[var(--accent)] font-mono text-xs uppercase tracking-wider transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                  [Access Certificate]
                </a>
              </MagneticButton>
            </div>
          )}
        </div>
      </motion.div>

      {/* COLUMN 2: WHAT I LEARNT CARD */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative pl-12 md:pl-0 w-full md:w-[calc(50%-4rem)]"
      >
        <LearningCard exp={exp} index={index} />
      </motion.div>
    </div>
  );
}

export default function Leadership() {
  const sectionRef = useSectionCursor("default");

  return (
    <section ref={sectionRef} className="py-40 px-6 relative z-10 bg-transparent">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--glass-border)] pb-12 mb-20 gap-8">
          <h2 className="text-5xl md:text-7xl lg:text-8xl display-font uppercase tracking-tighter text-white">
            EXPERIENCE<br />& RESPONSIBILITY.
          </h2>
          <p className="text-xl font-mono text-[var(--secondary)] uppercase tracking-widest">
            [04] STRUCTURING CHAOS INTO CLARITY.
          </p>
        </div>

        <div className="relative pt-10">
          {experiences.map((exp, i) => (
            <TimelineItem key={i} exp={exp} index={i} isLast={i === experiences.length - 1} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSectionCursor from "../../hooks/useSectionCursor";

/* ===============================
   Featured Project Card (CLI Vibe)
================================= */
function FeaturedProjectCard({ project }) {
  const Card = project.link ? motion.a : motion.div;
  const linkProps = project.link ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Card
      {...linkProps}
      className={`relative group overflow-hidden rounded-3xl p-8 md:p-12 flex flex-col justify-end border border-[#0f0]/30 bg-black/80 backdrop-blur-xl transition-all duration-500 min-h-[500px] vhs-effect block ${project.link ? 'cursor-pointer' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Image Layer */}
      {project.bgImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-30 transition-all duration-700 z-0 mix-blend-screen grayscale sepia hue-rotate-[90deg]"
          style={{ backgroundImage: `url(${project.bgImage})` }}
        />
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
      
      {/* Terminal decorative header */}
      <div className="absolute top-4 left-6 flex gap-2 z-20">
        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        <span className="ml-4 text-[#0f0] font-mono text-xs opacity-70">bash - project-brain</span>
      </div>

      <div className="relative z-20 flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
            {project.tech.split(" · ").map((t, i) => (
                <span key={i} className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-[#0f0]/10 rounded-sm border border-[#0f0]/30 text-[#0f0]">
                    &gt; {t}
                </span>
            ))}
        </div>
        
        <h3 className="text-4xl md:text-6xl font-mono leading-tight text-[#0f0] vhs-text-glitch">
          {project.title.split(" | ")[0]}
          <span className="block text-2xl font-mono text-[#0f0]/70 mt-2">
            | {project.title.split(" | ")[1]}
          </span>
        </h3>
        
        <div className="border-l-2 border-[#0f0]/50 pl-4 mt-2">
          <p className="text-[#0f0]/80 leading-relaxed font-mono text-sm md:text-base">
            <span className="text-white">&gt; problem:</span> {project.problem}<br/>
            <span className="text-white">&gt; approach:</span> {project.approach}<br/>
            <span className="text-white">&gt; result:</span> {project.result}
            <span className="inline-block w-2 h-4 bg-[#0f0] ml-2 animate-pulse" />
          </p>
        </div>
      </div>
    </Card>
  );
}

/* ===============================
   Marquee Project Card 
================================= */
function MarqueeProjectCard({ project, inGrid = false }) {
  const Card = project.link ? 'a' : 'div';
  const linkProps = project.link ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Card 
        {...linkProps}
        className={`relative group overflow-hidden rounded-3xl p-6 flex flex-col justify-end border border-[var(--glass-border)] bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-colors duration-500 block ${project.link ? 'cursor-pointer' : ''} ${inGrid ? 'w-full h-[400px]' : 'w-[300px] md:w-[400px] h-[350px] flex-shrink-0'}`}>
      
      {/* Background Image Layer */}
      {project.bgImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700 z-0 mix-blend-luminosity grayscale group-hover:grayscale-0"
          style={{ backgroundImage: `url(${project.bgImage})` }}
        />
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10" />
      
      <div className="relative z-20 flex flex-col gap-3">
        <div className="flex flex-wrap gap-1">
            {project.tech.split(" · ").slice(0, 3).map((t, i) => (
                <span key={i} className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-white/10 rounded-full border border-white/5 backdrop-blur-md text-gray-300">
                    {t}
                </span>
            ))}
            {project.tech.split(" · ").length > 3 && <span className="px-2 py-0.5 text-[10px] font-mono text-gray-300">+{project.tech.split(" · ").length - 3}</span>}
        </div>
        
        <h3 className="text-2xl md:text-3xl display-font leading-tight text-white group-hover:text-[var(--primary)] transition-colors">
          {project.title}
        </h3>
        
        <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
          <p className="text-gray-400 mt-2 leading-relaxed font-light text-sm line-clamp-3">
            {project.approach}
          </p>
        </div>
      </div>
    </Card>
  );
}

/* ===============================
   Projects Section
================================= */
export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useSectionCursor("projects");

  const projects = [
    {
      title: "project-brain | Python CLI Developer Intelligence Tool",
      problem: "Need for efficient codebase analysis and developer workflow management.",
      approach: "Developed a production-style Python CLI tool using Typer. Implemented AST-based static analysis, function-level Git change tracking, automated HTML reviews, and integrated multiple LLM providers (OpenAI, Ollama, Gemini).",
      tech: "Python · Typer · Git · YAML · LLM APIs · HTML · JS",
      result: "Modular architecture with analyzer, differ, and explainer.",
      bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
      link: "https://project-brain-web-gamma.vercel.app/"
    },
    {
      title: "CampusFlow | Hackathon Student Automation & Intelligence Platform",
      problem: "Manual activity tracking and academic schedule management for students is chaotic and fragmented.",
      approach: "Built a zero-touch conversational automation platform. Integrates Twilio WhatsApp webhook, Express backend, Groq AI (Llama3) for semantic parsing, Google Calendar API for automated event creation, Firebase Firestore for storage, and n8n webhooks for delayed reminder notifications.",
      tech: "Node.js · Express · Groq Llama3 · Twilio API · Google Calendar API · Firebase · n8n · HTML/JS",
      result: "Achieved automated real-time reminder scheduling, Google Calendar syncing, and a responsive web tracking dashboard.",
      bgImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
      link: "https://github.com/Srujan-Amaragatti05/CampusFlow"
    },
    {
      title: "Production-Grade Distributed File System",
      problem: "Large files require fault-tolerant and memory-efficient storage.",
      approach: "Built a Distributed File System (DFS) with chunk-based storage and replication. Implemented parallel chunk upload/download with streaming, and a self-healing replication mechanism with heartbeat-based failure detection.",
      tech: "Java · Spring Boot · PostgreSQL",
      result: "Reduced memory usage and improved performance.",
      bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
      link: "https://github.com/Srujan-Amaragatti05/dfs-java-project"
    },
    {
      title: "Signature Detection System",
      problem: "Manual signature verification lacks reliability.",
      approach: "Designed an ML pipeline involving image preprocessing, feature extraction, and classification.",
      tech: "Python · Flask · Scikit-learn · OpenCV",
      result: "85% validation accuracy.",
      bgImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
      link: "https://github.com/Srujan-Amaragatti05/SignatureDetectionUsingFlask" 
    },
    {
      title: "Hand Bone Fracture Detection",
      problem: "Manual X-ray fracture detection is time-consuming.",
      approach: "Built a CNN-based deep learning model trained on labeled X-ray images.",
      tech: "Python · TensorFlow · Keras",
      result: "90% inference accuracy.",
      bgImage: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1964&auto=format&fit=crop",
      link: "https://github.com/Srujan-Amaragatti05/HandBoneFactureDetectionFlask" 
    }
  ];

  const featuredProject = projects[0];
  const marqueeProjects = projects.slice(1);

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16 border-b border-[var(--glass-border)] pb-8">
            <h2 className="text-6xl md:text-8xl display-font uppercase tracking-tighter text-white">
            SELECTED<br />WORKS.
            </h2>
            <p className="text-xl font-mono text-[var(--secondary)] uppercase tracking-widest">
                [01] PROJECTS SHOWCASE <br/> FOCUSED ON INTELLIGENT ARCHITECTURES.
            </p>
        </div>

        <div className="mb-12">
          <FeaturedProjectCard project={featuredProject} />
        </div>

        <div className="flex justify-end mb-8">
          <button onClick={() => setIsModalOpen(true)} className="group flex items-center gap-3 text-white hover:text-[var(--primary)] transition-colors">
            <span className="font-mono text-sm uppercase tracking-widest">More Projects</span>
            <div className="w-10 h-10 rounded-full border border-[var(--glass-border)] bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Continuously Scrolling Marquee for remaining projects */}
      <div className="marquee-container">
        <div className="marquee-track">
          {/* We duplicate the array to ensure seamless looping */}
          {[...marqueeProjects, ...marqueeProjects].map((project, index) => (
            <MarqueeProjectCard key={index} project={project} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto bg-black border border-[var(--glass-border)] rounded-3xl p-8 hide-scrollbar"
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
            >
              <div className="flex justify-between items-center mb-10 border-b border-[var(--glass-border)] pb-6 sticky top-0 bg-black/90 backdrop-blur-xl z-30 -mt-2 pt-2">
                <h2 className="text-4xl md:text-5xl display-font uppercase tracking-tighter text-white">All Projects</h2>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {projects.map((p, i) => (
                   <MarqueeProjectCard key={i} project={p} inGrid={true} />
                 ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
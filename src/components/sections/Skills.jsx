import { motion } from "framer-motion";
import useSectionCursor from "../../hooks/useSectionCursor";

/* ===============================
   Premium Skill Card
================================= */

function SkillCard({ layer, index }) {
  return (
    <motion.div
      className={`relative group overflow-hidden rounded-3xl p-8 flex flex-col 
        border border-[var(--glass-border)] bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-colors duration-500
        ${layer.title === "AI & Data Science" ? "md:col-span-2" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent z-10 pointer-events-none" />

      <h3 className="text-2xl font-bold mb-8 text-white z-20">
        <span className="text-[var(--secondary)] mr-2 font-mono text-sm tracking-widest uppercase">
          [0{index + 1}] 
        </span>
        {layer.title}
      </h3>

      <div className="flex flex-wrap gap-4 z-20">
        {layer.skills.map((skill) => (
          <motion.div
            key={skill.name}
            className="flex-1 min-w-[100px] flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/[0.15] transition-colors duration-300"
            whileHover={{ scale: 1.05, y: -4 }}
            onClick={() => window.open(skill.link, "_blank")}
          >
            <img 
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}/${skill.icon}-${skill.version || 'original'}.svg`} 
              alt={skill.name} 
              className="w-12 h-12 mb-3 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
              onError={(e) => { e.target.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg" }}
            />
            <span className="text-xs font-mono text-[var(--secondary)] group-hover:text-white transition-colors text-center">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ===============================
   Skills Section
================================= */

export default function Skills() {
    const sectionRef = useSectionCursor("skills");

    const layers = [
        {
            title: "Core Programming",
            skills: [
                { name: "Python", icon: "python" , link:"https://www.python.org/"},
                { name: "JavaScript", icon: "javascript" , link:"https://www.javascript.com/"},
                { name: "Java", icon: "java" , link:"https://www.java.com/"},
                { name: "C", icon: "c" , link:"https://www.cprogramming.com/"}
            ]
        },
        {
            title: "Frontend System",
            skills: [
                { name: "HTML5", icon: "html5" , link:"https://www.w3schools.com/html/"},
                { name: "CSS3", icon: "css3" , link:"https://www.w3schools.com/css/"},
                { name: "React", icon: "react" , link:"https://react.dev/"},
                { name: "Tailwind", icon: "tailwindcss" , link:"https://tailwindcss.com/"}
            ]
        },
        {
            title: "Backend & APIs",
            skills: [
                { name: "Node.js", icon: "nodejs" , link:"https://nodejs.org/"},
                { name: "Express", icon: "express" , link:"https://expressjs.com/"},
                { name: "Flask", icon: "flask" , link:"https://flask.palletsprojects.com/"},
                { name: "FastAPI", icon: "fastapi" , link:"https://fastapi.tiangolo.com/"}
            ]
        },
        {
            title: "Data & Tools",
            skills: [
                { name: "MongoDB", icon: "mongodb" , link:"https://www.mongodb.com/"},
                { name: "MySQL", icon: "mysql" , link:"https://www.mysql.com/"},
                { name: "Git", icon: "git" , link:"https://git-scm.com/"},
                { name: "Docker", icon: "docker" , link:"https://www.docker.com/"},
                { name: "VS Code", icon: "vscode" , link:"https://code.visualstudio.com/"}
            ]
        },
        {
            title: "AI & Data Science",
            skills: [
                { name: "Scikit Learn", icon: "scikitlearn" , link:"https://scikit-learn.org/"},
                { name: "TensorFlow", icon: "tensorflow" , link:"https://www.tensorflow.org/"},
                { name: "Keras", icon: "keras" , link:"https://keras.io/"},
                { name: "Pandas", icon: "pandas" , link:"https://pandas.pydata.org/"},
                { name: "NumPy", icon: "numpy" , link:"https://numpy.org/"}
            ]
        }
    ];

    return (
        <section ref={sectionRef} className="py-32 px-6 relative z-10">
            <div className="max-w-7xl mx-auto space-y-16">

                <div className="flex items-end justify-between border-b border-[var(--glass-border)] pb-8">
                    <h2 className="text-6xl md:text-8xl display-font uppercase tracking-tighter text-white">
                        TECH<br />STACK.
                    </h2>
                    <p className="text-xl font-mono text-[var(--secondary)] uppercase tracking-widest">
                        [03] SYSTEM ARCHITECTURE <br/> TOOLS & LANGUAGES I USE.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {layers.map((layer, index) => (
                        <SkillCard key={index} layer={layer} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}
import { motion } from "framer-motion";
import { useRef } from "react";
import useSectionCursor from "../../hooks/useSectionCursor";

const principles = [
  {
    num: "01",
    category: "Mindset",
    title: "DISCIPLINE > MOTIVATION",
    desc: "Motivation is a fleeting emotion; discipline is an unbreakable system. I rely on relentless routines and consistent execution to push through boundaries.",
    colSpan: "md:col-span-2",
    customBg: "mindset"
  },
  {
    num: "02",
    category: "Architecture",
    title: "SYSTEMS > SHORTCUTS",
    desc: "I don't just patch bugs—I architect solutions. True engineering means designing resilient structures that scale elegantly and adapt flawlessly.",
    colSpan: "md:col-span-1",
    customBg: "architecture"
  },
  {
    num: "03",
    category: "Focus",
    title: "DEPTH > NOISE",
    desc: "In an era of endless scrolling, I choose deep work. Meaningful breakthroughs require intense focus, absolute immersion, and intentional study.",
    colSpan: "md:col-span-1",
    customBg: "focus"
  },
  {
    num: "04",
    category: "Balance",
    title: "RHYTHMS THAT MOVE ME",
    desc: "Music, Dance, and Chess aren't just hobbies; they are algorithms of life. They keep my thinking sharp, balanced, and fiercely creative.",
    colSpan: "md:col-span-2",
    customBg: "balance"
  }
];

/* ===============================
   Song Marquee Component
================================= */
const songs = [
  { title: "Lofi Focus", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&h=200&auto=format&fit=crop", audio: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3" },
  { title: "Deep Code", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200&h=200&auto=format&fit=crop", audio: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-738.mp3" },
  { title: "Ambient Loop", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&h=200&auto=format&fit=crop", audio: "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3" },
  { title: "Synthwave", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&h=200&auto=format&fit=crop", audio: "https://assets.mixkit.co/music/preview/mixkit-cbpd-400.mp3" },
];

function SongItem({ song }) {
  const audioRef = useRef(null);
  
  return (
    <div 
      className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl overflow-hidden relative cursor-pointer group/song border border-white/10 pointer-events-auto"
      onMouseEnter={() => {
        if(audioRef.current) {
          audioRef.current.volume = 0.2;
          audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
        }
      }}
      onMouseLeave={() => { audioRef.current?.pause(); if(audioRef.current) audioRef.current.currentTime = 0; }}
    >
      <img src={song.cover} alt={song.title} className="w-full h-full object-cover group-hover/song:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-black/60 group-hover/song:bg-black/10 transition-colors flex items-center justify-center backdrop-blur-[2px] group-hover/song:backdrop-blur-0">
         <svg className="w-8 h-8 text-white opacity-0 group-hover/song:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <audio ref={audioRef} src={song.audio} loop preload="none" />
    </div>
  );
}

function SongMarquee() {
  return (
    <div className="absolute bottom-6 left-0 right-0 overflow-hidden z-10 opacity-30 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
      <div className="marquee-track" style={{ animationDuration: '25s' }}>
        {[...songs, ...songs, ...songs, ...songs].map((song, i) => (
          <SongItem key={i} song={song} />
        ))}
      </div>
    </div>
  );
}

/* ===============================
   Principle Card
================================= */
function PrincipleCard({ p, index }) {
  const mediaRef = useRef(null);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (mediaRef.current) {
      mediaRef.current.volume = 0.3;
      mediaRef.current.play().catch(e => console.log(e));
    }
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log(e));
    }
  };

  const handleMouseLeave = () => {
    if (mediaRef.current) {
      mediaRef.current.pause();
      mediaRef.current.currentTime = 0;
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const isMindset = p.customBg === 'mindset';
  const animationProps = isMindset ? {
    whileHover: { x: [-2, 2, -2, 2, 0], y: [-1, 1, -1, 1, 0], transition: { duration: 0.2, repeat: Infinity } },
    whileTap: { scale: 0.95 }
  } : {};

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...animationProps}
      className={`relative group overflow-hidden rounded-3xl p-8 md:p-12 flex flex-col justify-between border border-[var(--glass-border)] bg-black/60 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-black/80 hover:shadow-2xl hover:shadow-[var(--accent)]/10 ${p.colSpan} ${isMindset ? 'cursor-pointer' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Background Media */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl z-0 pointer-events-none">
        {p.customBg === 'mindset' && (
          <div className="w-full h-full opacity-20 group-hover:opacity-50 transition-all duration-1000 group-hover:bg-[length:20px_20px] bg-[length:10px_10px]" 
               style={{ backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1.5px)' }}>
          </div>
        )}
        {p.customBg === 'architecture' && (
          <div className="w-full h-full opacity-30 group-hover:opacity-60 transition-all duration-1000 group-hover:bg-[length:50px_50px] bg-[length:40px_40px]"
               style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1.5px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)' }}>
              <img src="/images/code_rain.gif" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-1000 mix-blend-screen" alt="" />
          </div>
        )}
        {p.customBg === 'focus' && (
           <div className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-1000 flex items-center justify-center">
             <video ref={videoRef} src="/video/38137-415263669.mp4" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-1000 mix-blend-screen" loop muted playsInline />
             <div className="w-[150%] h-[150%] absolute rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] group-hover:scale-125 transition-transform duration-1000 animate-[pulse_6s_ease-in-out_infinite]"></div>
             <audio ref={mediaRef} src="/audio/peace.mp3" loop preload="none" />
           </div>
        )}
      </div>

      {p.customBg === 'balance' && (
        <>
          <SongMarquee />
          <audio ref={mediaRef} src="/audio/music.mp3" loop preload="none" />
        </>
      )}

      {/* Massive Background Number */}
      <div className="absolute -bottom-10 -right-6 text-[12rem] md:text-[16rem] font-black text-white/[0.03] font-mono leading-none group-hover:scale-110 group-hover:text-[var(--accent)]/[0.05] transition-all duration-700 pointer-events-none select-none z-0">
        {p.num}
      </div>

      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
      
      <div className="relative z-20 pointer-events-none">
        <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-16 flex items-center gap-4">
          <span className="w-8 h-px bg-[var(--accent)]" /> {p.category}
        </p>

        <div className="mt-auto">
          <h3 className="text-4xl md:text-5xl display-font font-bold mb-6 text-white leading-tight group-hover:text-white transition-colors drop-shadow-lg">
            {p.title}
          </h3>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light group-hover:text-gray-200 transition-colors drop-shadow-md">
            {p.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Principles() {
  const sectionRef = useSectionCursor("minimal");

  return (
    <section ref={sectionRef} className="py-40 px-6 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-20">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--glass-border)] pb-8 gap-8">
          <h2 className="text-5xl md:text-7xl lg:text-8xl display-font uppercase tracking-tighter text-white">
            PERSONAL<br />PHILOSOPHY.
          </h2>
          <p className="text-xl font-mono text-[var(--secondary)] uppercase tracking-widest">
            [05] THE MANIFESTO THAT DRIVES THE CRAFT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <PrincipleCard key={i} p={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
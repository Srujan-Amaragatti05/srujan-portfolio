import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Loader from "./components/loader/Loader";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Leadership from "./components/sections/Leadership";
import Principles from "./components/sections/Principles";
import Contact from "./components/sections/Contact";
import { CursorProvider } from "./context/CursorContext";
import CursorCore from "./components/cursor/CursorCore";
import NoiseOverlay from "./components/layout/NoiseOverlay";
import InteractiveLava from "./components/layout/InteractiveLava";
import "./interactiveLava.css";

function AppContent() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}

      {!loading && (
        <div className="min-h-screen w-full flex flex-col items-center relative overflow-hidden">
          <InteractiveLava />
          <NoiseOverlay />

          <Hero />
          <About />
          <Skills />
          <Projects />
          <Leadership />
          <Principles />
          <Contact />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CursorProvider>
        <CursorCore />
        <AppContent />
      </CursorProvider>
    </ThemeProvider>
  );
}
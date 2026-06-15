import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Snowflake, PartyPopper, Trash2, ArrowDown, ArrowUp, Info, HelpCircle } from "lucide-react";

interface Particle {
  id: string;
  type: "snowflake" | "balloon";
  x: number;      // horizontal starting percentage (0-100)
  size: number;   // dimensions in pixels
  duration: number; // travel time across screen (seconds)
  drift: number;  // lateral sway/drift value (offset percentage)
  color?: string; // custom color (specifically for balloons)
}

export default function App() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [snowflakesTime, setSnowflakesTime] = useState<number>(0);
  const [balloonsTime, setBalloonsTime] = useState<number>(0);
  
  // Premium Prestige Themes
  const [selectedTheme, setSelectedTheme] = useState<"ivory" | "charcoal" | "sage" | "navy">("ivory");

  // Multi-state timer countdown ticking every 100ms
  useEffect(() => {
    const timer = setInterval(() => {
      setSnowflakesTime((prev) => {
        if (prev <= 0) return 0;
        return Math.max(0, parseFloat((prev - 0.1).toFixed(1)));
      });
      setBalloonsTime((prev) => {
        if (prev <= 0) return 0;
        return Math.max(0, parseFloat((prev - 0.1).toFixed(1)));
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Snowflake generator trigger
  useEffect(() => {
    if (snowflakesTime <= 0) return;

    // Spawn high-fidelity snowflakes at a refined frequency
    const interval = setInterval(() => {
      const id = `snow-${Math.random().toString(36).substring(2, 11)}`;
      const newSnowflake: Particle = {
        id,
        type: "snowflake",
        x: Math.random() * 94 + 3, // avoid edge clipping
        size: Math.random() * 10 + 18, // 18px to 28px (medium size)
        duration: Math.random() * 1.5 + 3.5, // 3.5s to 5s descent
        drift: Math.random() * 12 - 6, // elegant subtle drift
      };
      setParticles((prev) => [...prev, newSnowflake]);
    }, 100); // 100ms spawning rhythm

    return () => clearInterval(interval);
  }, [snowflakesTime > 0]);

  // Balloon generator trigger
  useEffect(() => {
    if (balloonsTime <= 0) return;

    // Spawn prestigious balloons at a steady floating cadence
    const interval = setInterval(() => {
      const prestigiousColors = [
        "#C5A880", // Champagne Gold
        "#4A6B82", // Slate Mineral Blue
        "#B05C5C", // Antique Burgundy Rose
        "#4D7C5D", // Vintage Sage Green
        "#8A6F82", // Royal Velvet Plum
        "#1C1D1F", // Deep Charcoal
      ];
      const randomColor = prestigiousColors[Math.floor(Math.random() * prestigiousColors.length)];

      const id = `balloon-${Math.random().toString(36).substring(2, 11)}`;
      const newBalloon: Particle = {
        id,
        type: "balloon",
        x: Math.random() * 90 + 5, // keep nicely within widescreen frame
        size: Math.random() * 8 + 38, // 38px to 46px width (mid-sized balloon)
        duration: Math.random() * 2 + 4.5, // 4.5s to 6.5s float-up duration
        drift: Math.random() * 16 - 8, // gentle horizontal wander
        color: randomColor,
      };
      setParticles((prev) => [...prev, newBalloon]);
    }, 160); // Spaced spawning rate for balloon grand effect

    return () => clearInterval(interval);
  }, [balloonsTime > 0]);

  // Individual particle safety garbage collection
  const removeParticle = (id: string) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  };

  // Immediate sweep function
  const clearAllAtmosphere = () => {
    setParticles([]);
    setSnowflakesTime(0);
    setBalloonsTime(0);
  };

  // Trigger generators
  const triggerSnowflakes = () => {
    setSnowflakesTime(5.0);
  };

  const triggerBalloons = () => {
    setBalloonsTime(5.0);
  };

  // Theme styling mapping
  const themes = {
    ivory: {
      bg: "bg-[#FAFAF9]",
      card: "bg-white border-stone-200/90",
      text: "text-stone-900",
      secondaryText: "text-stone-500",
      accent: "border-amber-600/40 text-stone-800",
      divider: "bg-amber-600/30",
      btnSnow: "bg-stone-900 hover:bg-stone-800 text-white shadow-stone-900/10",
      btnBalloons: "bg-amber-700 hover:bg-amber-800 text-white shadow-amber-900/10",
    },
    charcoal: {
      bg: "bg-[#121212]",
      card: "bg-[#1E1E1E] border-neutral-800",
      text: "text-neutral-100",
      secondaryText: "text-neutral-400",
      accent: "border-yellow-600/40 text-neutral-200",
      divider: "bg-yellow-600/30",
      btnSnow: "bg-neutral-800 hover:bg-neutral-700 text-neutral-100 shadow-black/40",
      btnBalloons: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-950/40",
    },
    sage: {
      bg: "bg-[#F3F4F1]",
      card: "bg-white border-emerald-900/10",
      text: "text-emerald-950",
      secondaryText: "text-emerald-700/75",
      accent: "border-emerald-600/30 text-emerald-900",
      divider: "bg-emerald-600/20",
      btnSnow: "bg-emerald-900 hover:bg-emerald-800 text-emerald-50 shadow-emerald-950/10",
      btnBalloons: "bg-amber-700 hover:bg-amber-800 text-white shadow-amber-950/10",
    },
    navy: {
      bg: "bg-[#0B132B]",
      card: "bg-[#1C2541]/90 border-blue-900/20",
      text: "text-teal-50",
      secondaryText: "text-teal-100/60",
      accent: "border-blue-500/30 text-teal-200",
      divider: "bg-blue-500/20",
      btnSnow: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950/40",
      btnBalloons: "bg-[#BD93F9] hover:bg-[#AE7FF7] text-slate-950 shadow-[#BD93F9]/20",
    },
  };

  const activeT = themes[selectedTheme];

  return (
    <div id="app-root-container" className={`min-h-screen w-full relative transition-colors duration-700 font-sans flex flex-col justify-between overflow-hidden ${activeT.bg}`}>
      
      {/* IMMERSIVE ANIMATION VIEWPORT OVERLAY */}
      <div id="fx-particles-viewport" className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {particles.map((p) => {
            if (p.type === "snowflake") {
              return (
                <motion.div
                  key={p.id}
                  id={p.id}
                  initial={{ y: "-5vh", x: `${p.x}%`, opacity: 0, rotate: 0 }}
                  animate={{
                    y: "105vh",
                    x: `${p.x + p.drift}%`,
                    opacity: [0, 0.9, 0.9, 0.7, 0],
                    rotate: p.drift * 60, // drift spins the snowflake slightly
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: p.duration,
                    ease: "linear",
                  }}
                  onAnimationComplete={() => removeParticle(p.id)}
                  className="absolute pointer-events-none text-sky-400/70"
                  style={{ width: p.size, height: p.size }}
                >
                  <Snowflake 
                    style={{ width: p.size, height: p.size }} 
                    strokeWidth={1.8}
                    className="drop-shadow-[0_2px_4px_rgba(255,255,255,0.35)]"
                  />
                </motion.div>
              );
            } else {
              // Classic Oval Balloon design with responsive lighting and knot string
              return (
                <motion.div
                  key={p.id}
                  id={p.id}
                  initial={{ y: "105vh", x: `${p.x}%`, opacity: 0, rotate: 0 }}
                  animate={{
                    y: "-15vh",
                    x: `${p.x + p.drift}%`,
                    opacity: [0, 0.95, 0.95, 0.9, 0],
                    rotate: [-12, 12, -12, 12], // realistic gentle air currents
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    y: { duration: p.duration, ease: "linear" },
                    x: { duration: p.duration, ease: "easeInOut" },
                    opacity: { duration: p.duration, ease: "linear" },
                    rotate: {
                      repeat: Infinity,
                      duration: 2.8,
                      ease: "easeInOut",
                    },
                  }}
                  onAnimationComplete={() => removeParticle(p.id)}
                  className="absolute pointer-events-none"
                  style={{ width: p.size, height: p.size * 1.3 }}
                >
                  <div className="relative w-full h-full">
                    {/* Balloon Bubble Body */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: "100%",
                        height: "85%",
                        backgroundColor: p.color,
                        boxShadow: "inset -5px -6px 12px rgba(0,0,0,0.22), inset 4px 4px 6px rgba(255,255,255,0.45)",
                      }}
                    />
                    {/* Tiny Triangular Tie-knot */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 bottom-[13%] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px]"
                      style={{ borderBottomColor: p.color }}
                    />
                    {/* Curving Thread String */}
                    <svg
                      className="absolute left-1/2 -translate-x-1/2 top-[86%] overflow-visible"
                      width="2"
                      height="24"
                    >
                      <path
                        d="M1 0 C4 6, -2 12, 1 24"
                        fill="none"
                        stroke="rgba(110,120,130,0.5)"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </div>
                </motion.div>
              );
            }
          })}
        </AnimatePresence>
      </div>

      {/* HEADER SECTION */}
      <header id="console-header" className="pt-10 px-6 text-center select-none z-10 w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <span className={`text-[11px] font-sans font-semibold tracking-[0.25em] uppercase opacity-80 ${activeT.secondaryText}`}>
            The Royal Hall Atmospheric System
          </span>
          <h1 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-normal mt-3 tracking-wide leading-tight ${activeT.text}`}>
            Formal Effects Showcase
          </h1>
          <div className={`w-32 h-[1px] mt-6 mb-2 rounded-full ${activeT.divider}`} />
        </div>
      </header>

      {/* CENTRAL CONTROL CENTER */}
      <main id="effects-main" className="flex-grow flex items-center justify-center p-6 w-full max-w-4xl mx-auto z-10">
        <div className={`w-full border rounded-2xl p-8 md:p-12 shadow-[0_15px_42px_-10px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-all duration-500 ${activeT.card}`}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* COLUMN 1: INTENSITY & EFFECT SWITCHBOARD */}
            <div className="space-y-6 text-left">
              <div>
                <h3 className={`font-serif text-xl font-normal ${activeT.text}`}>
                  Atmospheric Triggers
                </h3>
                <p className={`text-xs mt-1 leading-relaxed ${activeT.secondaryText}`}>
                  Select a weather preset below to activate immediate full-screen visualization overlays. Each generator will remain active for 5.0 seconds.
                </p>
              </div>

              {/* ACTION TRIGGER BUTTONS */}
              <div className="space-y-4 pt-2">
                {/* SNOWFLAKES INITIATOR */}
                <button
                  id="trigger-snowflakes-button"
                  onClick={triggerSnowflakes}
                  className={`w-full py-4 px-6 rounded-xl font-sans font-medium text-sm flex items-center justify-between transition-all duration-300 relative group overflow-hidden active:scale-[0.98] cursor-pointer ${activeT.btnSnow}`}
                >
                  <span className="flex items-center gap-3">
                    <Snowflake className={`w-5 h-5 ${snowflakesTime > 0 ? "animate-spin" : "group-hover:rotate-12 transition-transform duration-300"}`} style={{ animationDuration: "5s" }} />
                    <span className="tracking-wide">Snowflakes</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-md">
                      Medium Size
                    </span>
                    <ArrowDown className="w-4 h-4 opacity-70 group-hover:translate-y-0.5 transition-transform" />
                  </div>
                </button>

                {/* BALLOONS INITIATOR */}
                <button
                  id="trigger-balloons-button"
                  onClick={triggerBalloons}
                  className={`w-full py-4 px-6 rounded-xl font-sans font-medium text-sm flex items-center justify-between transition-all duration-300 relative group overflow-hidden active:scale-[0.98] cursor-pointer ${activeT.btnBalloons}`}
                >
                  <span className="flex items-center gap-3">
                    <PartyPopper className={`w-5 h-5 ${balloonsTime > 0 ? "animate-bounce" : "group-hover:scale-110 transition-transform"}`} />
                    <span className="tracking-wide">Balloons</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider bg-black/10 px-2 py-0.5 rounded-md">
                      Medium Size
                    </span>
                    <ArrowUp className="w-4 h-4 opacity-70 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </button>
              </div>

              {/* AMBIENCE STYLING SWATCHES */}
              <div className="pt-4 border-t border-stone-200/40 dark:border-neutral-800/60">
                <span className={`text-[10px] font-sans font-semibold tracking-wider uppercase ${activeT.secondaryText}`}>
                  Visual Panel Aesthetics
                </span>
                <div className="flex gap-2.5 mt-2">
                  {(["ivory", "charcoal", "sage", "navy"] as const).map((themeName) => {
                    const activeBorder = selectedTheme === themeName ? "ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-[#121212]" : "border border-stone-300/30";
                    const bgClass = 
                      themeName === "ivory" ? "bg-[#FAFAF9]" :
                      themeName === "charcoal" ? "bg-[#1E1E1E]" :
                      themeName === "sage" ? "bg-[#E6E8E2]" : "bg-[#0B132B]";
                    return (
                      <button
                        key={themeName}
                        id={`theme-btn-${themeName}`}
                        onClick={() => setSelectedTheme(themeName)}
                        title={`Select ${themeName} styling`}
                        className={`w-7 h-7 rounded-full cursor-pointer transition-transform ${bgClass} ${activeBorder} hover:scale-110`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* COLUMN 2: TELEMETRY AND STATUS METERS */}
            <div className="p-6 md:p-8 rounded-xl bg-stone-500/5 border border-stone-200/20 space-y-6 flex flex-col justify-between self-stretch">
              
              {/* CURRENT STATUS */}
              <div className="space-y-4">
                <span className={`text-[10px] font-sans font-semibold tracking-[0.2em] uppercase opacity-75 ${activeT.secondaryText}`}>
                  ACTIVE GENERATOR STATUS
                </span>

                {/* SHOW GENERATOR FEEDBACK GRID */}
                <div className="space-y-3">
                  {/* SNOWFLAKE TIMER BLOCK */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${snowflakesTime > 0 ? "bg-cyan-500 animate-pulse" : "bg-stone-300"}`} />
                        <span className={`font-medium ${activeT.text}`}>Snowflakes Generation</span>
                      </span>
                      <span className="font-mono">{snowflakesTime.toFixed(1)}s</span>
                    </div>
                    {/* Custom thin formal progress indicator */}
                    <div className="w-full h-[3px] bg-stone-200/50 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-cyan-500"
                        animate={{ width: `${(snowflakesTime / 5) * 100}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                      />
                    </div>
                  </div>

                  {/* BALLOON TIMER BLOCK */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs">
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${balloonsTime > 0 ? "bg-amber-500 animate-pulse" : "bg-stone-300"}`} />
                        <span className={`font-medium ${activeT.text}`}>Balloons Generation</span>
                      </span>
                      <span className="font-mono">{balloonsTime.toFixed(1)}s</span>
                    </div>
                    {/* Custom thin formal progress indicator */}
                    <div className="w-full h-[3px] bg-stone-200/50 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-amber-500"
                        animate={{ width: `${(balloonsTime / 5) * 100}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* STATS COUNT */}
              <div className="bg-stone-500/5 dark:bg-neutral-900/40 p-4 rounded-lg flex items-center justify-between text-xs">
                <div className="space-y-0.5 text-left">
                  <p className={`font-semibold ${activeT.text}`}>Active Entities</p>
                  <p className={`text-[10px] ${activeT.secondaryText}`}>Statically animated particles</p>
                </div>
                <div className="text-right">
                  <span className={`font-mono text-2xl font-bold ml-auto px-3 py-1 rounded-md ${activeT.text}`}>
                    {particles.length}
                  </span>
                </div>
              </div>

              {/* ACTION SWEEP BAR */}
              <div className="flex items-center gap-3">
                <button
                  id="clear-all-button"
                  onClick={clearAllAtmosphere}
                  disabled={particles.length === 0}
                  className="w-full py-2.5 px-4 rounded-lg font-sans font-medium text-xs border border-stone-300/30 flex items-center justify-center gap-2 transition-all duration-300 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-stone-300/30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Immediate Clear</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* FOOTER SECTION */}
      <footer id="console-footer" className="w-full max-w-4xl mx-auto py-8 px-6 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className={`text-xs ${activeT.secondaryText}`}>
            Designed for Formal Presentation Environments • Fully Optimized
          </p>
          <div className="flex items-center gap-1.5 text-xs">
            <span className={`w-1.5 h-1.5 rounded-full bg-green-500 inline-block`} />
            <span className={`${activeT.secondaryText}`}>Render Core Ready</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

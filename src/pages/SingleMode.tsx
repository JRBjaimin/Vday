import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, PartyPopper, Pizza, Beer, Music, Crown, Zap, Flame, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import FireTransition from "@/components/TransitionOverlay";

/* ───── NEON PARTICLES ───── */
const NEON_ICONS = [Pizza, Beer, Music, Crown, Zap, Sparkles, Flame];

const NeonParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 25 }).map((_, i) => {
      const Icon = NEON_ICONS[i % NEON_ICONS.length];
      return (
        <motion.div
          key={i}
          className="absolute text-neon-blue/40 mix-blend-screen"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: i % 2 === 0 ? '#00f3ff' : '#ff00ff',
          }}
          animate={{
            y: [0, -100, 0],
            rotate: [0, 360],
            scale: [0.5, 1.2, 0.5],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          <Icon size={24 + Math.random() * 24} />
        </motion.div>
      );
    })}
  </div>
);

/* ───── DISCO BALL ───── */
const DiscoBall = () => (
  <motion.div
    className="absolute top-10 left-1/2 -translate-x-1/2 z-30"
    initial={{ y: -500 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 60, damping: 15, delay: 1.5 }}
  >
    {/* String */}
    <div className="w-1 h-20 bg-gray-300 mx-auto" />
    
    {/* The Ball */}
    <div className="relative w-48 h-48">
       {/* Spinning Surface */}
       <div className="absolute inset-0 rounded-full disco-ball-surface animate-spin-disco shadow-[0_0_60px_rgba(255,255,255,0.6)] border border-gray-400/50" />
       
       {/* Static Shine/Glint to make it look spherical */}
       <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/40 via-transparent to-white/60 pointer-events-none mix-blend-overlay" />
       <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/40 blur-xl rounded-full mix-blend-overlay" />
    </div>
  </motion.div>
);

/* ───── DISCO LIGHTS (INTENSIFIED) ───── */
const DiscoLights = ({ active }: { active: boolean }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-plus-lighter z-20">
    <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 animate-pulse ${active ? 'duration-75' : 'duration-1000'}`} />
    
    {/* Moving Beams - Faster when active */}
    <div className={`absolute top-0 left-1/4 w-[100px] h-[150vh] bg-gradient-to-b from-cyan-400/40 to-transparent origin-top -translate-x-1/2 rotate-45 animate-spotlight-left blur-2xl ${active ? 'animate-duration-[0.5s]' : ''}`} />
    <div className={`absolute top-0 right-1/4 w-[100px] h-[150vh] bg-gradient-to-b from-magenta-400/40 to-transparent origin-top translate-x-1/2 -rotate-45 animate-spotlight-right blur-2xl ${active ? 'animate-duration-[0.5s]' : ''}`} />
    
    {/* Extra beams for intensity */}
    <div className={`absolute top-0 left-3/4 w-[80px] h-[150vh] bg-gradient-to-b from-yellow-400/30 to-transparent origin-top -translate-x-1/2 rotate-[60deg] animate-spotlight-left blur-xl ${active ? 'mix-blend-screen opacity-100' : 'opacity-60'}`} style={{ animationDuration: active ? '0.6s' : '3s' }} />
    <div className={`absolute top-0 right-3/4 w-[80px] h-[150vh] bg-gradient-to-b from-green-400/30 to-transparent origin-top translate-x-1/2 -rotate-[60deg] animate-spotlight-right blur-xl ${active ? 'mix-blend-screen opacity-100' : 'opacity-60'}`} style={{ animationDuration: active ? '0.7s' : '3.5s' }} />
    
    {/* PARTY MODE BEAMS */}
    {active && (
      <>
         <div className="absolute top-0 left-1/2 w-[50px] h-[150vh] bg-white/50 origin-top animate-[spin_1s_linear_infinite] blur-md" />
         <div className="absolute top-0 left-1/2 w-[50px] h-[150vh] bg-red-500/50 origin-top animate-[spin_1.5s_linear_infinite_reverse] blur-md" />
         <div className="absolute inset-0 bg-white/10 animate-pulse mix-blend-overlay" style={{ animationDuration: '0.2s' }} />
      </>
    )}

    {/* Central Pulsing Light */}
    <div className="absolute top-[-10%] left-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] -translate-x-1/2 animate-pulse" />
  </div>
);

const MainContent = ({ onParty, onBack }: { onParty: () => void, onBack: () => void }) => (
    <>
      {/* HEADER */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.0, type: "spring" }} 
        className="relative z-10 mb-10 mt-32"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block mb-4"
        >
          <Crown size={80} className="text-yellow-400 fill-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.8)]" />
        </motion.div>
        
        <h1 className="text-7xl md:text-9xl font-bold font-serif-display text-transparent bg-clip-text bg-gradient-to-b from-white via-neon-blue to-purple-500 drop-shadow-[0_0_15px_rgba(0,243,255,0.5)] tracking-tighter mb-2 leading-[0.9]">
          SINGLE<br/>& ROCKS
        </h1>
        <p className="text-2xl md:text-3xl text-neon-green font-script mt-4 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(0,255,0,0.6)]">
          Self Love Club • Vip Access Only
        </p>
      </motion.div>

      {/* CHECKLIST */}
      <motion.div 
        className="relative z-10 grid gap-4 mb-12 w-full max-w-md text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        {[
          "No drama, just vibes 🎸",
          "Sleeping diagonally 🛌",
          "Money stays in MY pocket 💰",
          "Answering to NOBODY 🙅‍♂️"
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2.9 + i * 0.1, type: "spring" }}
            className="flex items-center gap-4 bg-black/40 backdrop-blur-md border border-neon-purple/50 p-4 rounded-xl hover:bg-neon-purple/20 transition-all group cursor-default shadow-lg hover:scale-105"
          >
            <div className="w-8 h-8 rounded-full border-2 border-neon-blue flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors">
               <Flame size={16} className="text-orange-500" />
            </div>
            <span className="text-xl text-white font-bold font-sans tracking-wide shadow-black drop-shadow-md">{item}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* ACTION BUTTONS */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6">
        <motion.button
          onClick={onParty}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ boxShadow: ["0 0 20px #ff00ff", "0 0 40px #00f3ff", "0 0 20px #ff00ff"] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="px-12 py-5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-black text-2xl border-2 border-white/30 relative overflow-hidden group uppercase tracking-widest"
        >
          <span className="relative z-10 flex items-center gap-3">
            Let's Rock! <Zap fill="currentColor" />
          </span>
          <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
        </motion.button>

        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-5 rounded-full bg-black/60 border-2 border-white/20 text-white/70 font-bold text-lg hover:bg-white/10 hover:text-white transition-colors"
        >
          BACK TO LOVE
        </motion.button>
      </div>
    </>
  );

const SingleMode = ({ onBack, songUrl }: { onBack: () => void; songUrl?: string | null }) => {
  const [partyActive, setPartyActive] = useState(false);
  const [fireActive, setFireActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Hide fire after transition
    const timer = setTimeout(() => setFireActive(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Play Rock/Disco music on mount
    const audio = new Audio(songUrl || "/rock_music.mp3"); 
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    
    // Attempt play
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Audio playing");
        })
        .catch((error) => {
          console.log("Audio autoplay blocked:", error);
          toast.info("Click Unmute to start the party! 🎵");
          setIsMuted(true);
        });
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [songUrl]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted; 
      if (audioRef.current.paused) {
         audioRef.current.play(); 
      }
      setIsMuted(!isMuted);
    }
  };

  const handleParty = () => {
    setPartyActive(true);
    toast.success("ROCK ON! 🤘🔥");
    setTimeout(() => setPartyActive(false), 2000);
  };

  return (
    <motion.div
      className="relative min-h-screen bg-[#10051e] overflow-hidden flex flex-col items-center justify-center text-center p-4 perspective-[1000px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence>
        {fireActive && <FireTransition />}
      </AnimatePresence>

      <DiscoLights active={partyActive} />
      <NeonParticles />
      <DiscoBall />
      
      {/* Audio Control */}
      <button 
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:bg-white/20 transition-all"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* RISING FIRE BACKGROUND */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-orange-600/20 via-red-600/10 to-transparent pointer-events-none" />

      {/* REFLECTION CONTAINER */}
      <div className="relative">
        {/* Main Content */}
        <div className="relative z-10">
          <MainContent onParty={handleParty} onBack={onBack} />
        </div>
        
        {/* Mirror Reflection */}
        <div className="absolute top-full left-0 right-0 mirror-mask mt-4 opacity-50">
          <MainContent onParty={handleParty} onBack={onBack} />
        </div>
      </div>

      {/* CONFETTI OVERLAY */}
      <AnimatePresence>
        {partyActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            {/* Blast from center */}
            {Array.from({ length: 100 }).map((_, i) => (
               <motion.div
                key={`confetti-${i}`}
                className="absolute w-3 h-3 rounded-full"
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{ 
                  x: (Math.random() - 0.5) * 1500, 
                  y: (Math.random() - 0.5) * 1500,
                  opacity: [1, 0],
                  scale: [0, 1.5, 0],
                  rotate: Math.random() * 720
                }}
                transition={{ duration: 1 + Math.random(), ease: "easeOut" }}
                style={{
                   backgroundColor: ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00'][Math.floor(Math.random() * 5)],
                   left: '50%',
                   top: '50%'
                }}
               />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default SingleMode;

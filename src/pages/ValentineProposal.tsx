import { useState, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Stars, PartyPopper } from "lucide-react";

/* ───── tiny helpers ───── */
const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

/* ───── floating emoji particles ───── */
const EMOJIS = ["💖", "💕", "💗", "✨", "🌹", "💘", "💝", "🥰", "😍", "💞"];

interface Particle {
  id: number;
  emoji: string;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

const makeParticles = (n: number): Particle[] =>
  Array.from({ length: n }, (_, i) => ({
    id: i,
    emoji: EMOJIS[i % EMOJIS.length],
    x: randomBetween(0, 100),
    size: randomBetween(18, 36),
    delay: randomBetween(0, 6),
    duration: randomBetween(6, 14),
  }));

/* ───── sparkle ring around the heart ───── */
const SparkleRing = () => (
  <div className="absolute inset-0 pointer-events-none">
    {Array.from({ length: 10 }).map((_, i) => {
      const angle = (360 / 10) * i;
      return (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-valentine-gold"
          style={{
            marginLeft: -4,
            marginTop: -4,
          }}
          animate={{
            x: [0, Math.cos((angle * Math.PI) / 180) * 80],
            y: [0, Math.sin((angle * Math.PI) / 180) * 80],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.15,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      );
    })}
  </div>
);

/* ───── confetti burst on YES ───── */
const Confetti = () => {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: randomBetween(-300, 300),
    y: randomBetween(-600, -100),
    rotate: randomBetween(0, 720),
    scale: randomBetween(0.5, 1.5),
    color: [
      "bg-valentine-rose",
      "bg-valentine-pink",
      "bg-valentine-gold",
      "bg-valentine-purple",
      "bg-valentine-blush",
    ][i % 5],
    delay: randomBetween(0, 0.6),
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute left-1/2 top-1/2 w-3 h-3 rounded-sm ${p.color}`}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: [1, 1, 0],
            rotate: p.rotate,
            scale: [0, p.scale, p.scale],
          }}
          transition={{
            duration: 2.5,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

/* ───── pulsing hearts background ───── */
const PulsingHearts = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {makeParticles(25).map((p) => (
      <motion.div
        key={p.id}
        className="absolute"
        style={{
          left: `${p.x}%`,
          fontSize: p.size,
        }}
        initial={{ y: "110vh", opacity: 0 }}
        animate={{
          y: "-10vh",
          opacity: [0, 0.6, 0],
          rotate: [0, 20, -20, 0],
          x: [0, 30, -30, 0],
        }}
        transition={{
          duration: p.duration,
          delay: p.delay,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {p.emoji}
      </motion.div>
    ))}
  </div>
);

/* ═══════════════════════════════════  MAIN PAGE  ═══════════════════════════════════ */

const ValentineProposal = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "My Love";

  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [noPosInitialized, setNoPosInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const DODGE_RADIUS = 150; // px – button flees before cursor gets this close

  /* place button at a random position that is far from the cursor */
  const dodgeNo = useCallback(
    (mouseX?: number, mouseY?: number) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const btnW = 140;
      const btnH = 56;
      const pad = 30;

      let x: number, y: number;
      let attempts = 0;
      do {
        x = randomBetween(pad, vw - btnW - pad);
        y = randomBetween(pad, vh - btnH - pad);
        attempts++;
      } while (
        mouseX !== undefined &&
        mouseY !== undefined &&
        Math.hypot(x + btnW / 2 - mouseX, y + btnH / 2 - mouseY) < DODGE_RADIUS * 2 &&
        attempts < 30
      );

      setNoPos({ x, y });
      if (!noPosInitialized) setNoPosInitialized(true);
    },
    [noPosInitialized]
  );

  /* initialise the button position once - DISABLED so it starts inline */
  /* useEffect(() => {
    if (!noPosInitialized) dodgeNo();
  }, [dodgeNo, noPosInitialized]); */

  /* global mousemove – dodge when cursor approaches */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!noBtnRef.current) return;
      const rect = noBtnRef.current.getBoundingClientRect();
      const btnCx = rect.left + rect.width / 2;
      const btnCy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - btnCx, e.clientY - btnCy);

      if (dist < DODGE_RADIUS) {
        dodgeNo(e.clientX, e.clientY);
      }
    };

    /* also handle touch */
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch || !noBtnRef.current) return;
      const rect = noBtnRef.current.getBoundingClientRect();
      const btnCx = rect.left + rect.width / 2;
      const btnCy = rect.top + rect.height / 2;
      const dist = Math.hypot(touch.clientX - btnCx, touch.clientY - btnCy);

      if (dist < DODGE_RADIUS) {
        dodgeNo(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [dodgeNo]);

  const handleYes = () => {
    setShowConfetti(true);
    setTimeout(() => setAccepted(true), 600);
  };

  /* ===== SUCCESS STATE ===== */
  if (accepted) {
    return (
      <div className="relative min-h-screen overflow-hidden gradient-valentine flex flex-col items-center justify-start">
        <PulsingHearts />

        {/* big celebration header */}
        <motion.div
          className="relative z-10 text-center pt-16 px-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <PartyPopper className="mx-auto text-valentine-gold mb-4" size={64} />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif-display text-primary-foreground text-glow leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            YAY!!!!
          </motion.h1>

          <motion.p
            className="mt-6 text-2xl md:text-4xl font-script text-valentine-gold text-glow-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            🎉🥳 This is the BEST decision ever! 🥳🎉
          </motion.p>

          <motion.div
            className="mt-4 flex justify-center gap-3 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring", bounce: 0.6 }}
          >
            {["😍", "🥰", "💖", "💘", "💝", "💕", "✨", "🌹", "💗", "💞"].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* romantic video */}
        <motion.div
          className="relative z-10 w-full max-w-2xl mx-auto mt-12 px-4"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="rounded-3xl overflow-hidden border-4 border-valentine-rose/40 box-glow shadow-2xl">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/rtOvBOTyX00?autoplay=1&mute=0&loop=1&playlist=rtOvBOTyX00"
                title="Romantic Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>

        {/* I Love You text */}
        <motion.div
          className="relative z-10 text-center mt-12 mb-16 px-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, type: "spring", bounce: 0.4 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold font-serif-display text-valentine-pink text-glow"
            animate={{
              scale: [1, 1.05, 1],
              textShadow: [
                "0 0 20px hsl(330 80% 70% / 0.6)",
                "0 0 40px hsl(330 80% 70% / 0.8)",
                "0 0 20px hsl(330 80% 70% / 0.6)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            I Love You ❤️
          </motion.h2>

          <motion.p
            className="mt-4 text-2xl font-script text-valentine-blush/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
          >
            Forever & Always 💕
          </motion.p>

          <motion.div
            className="mt-6 flex justify-center gap-2 text-3xl md:text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            {["💖", "🌹", "💘", "💝", "💗", "✨", "🥰", "😘", "💕", "💞"].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.15,
                  repeat: Infinity,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  /* ===== PROPOSAL STATE ===== */
  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden gradient-valentine flex items-center justify-center"
    >
      <PulsingHearts />

      {/* sparkle particles across the bg */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`sp-${i}`}
          className="absolute w-2 h-2 rounded-full bg-valentine-gold/70"
          style={{
            left: `${randomBetween(5, 95)}%`,
            top: `${randomBetween(5, 95)}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 2, 0],
          }}
          transition={{
            duration: randomBetween(2, 4),
            delay: randomBetween(0, 5),
            repeat: Infinity,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* animated heart with sparkle ring */}
        <motion.div
          className="relative inline-block mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
        >
          <SparkleRing />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Heart
              className="text-valentine-pink drop-shadow-2xl"
              size={100}
              fill="hsl(330, 80%, 70%)"
              strokeWidth={1}
            />
          </motion.div>
        </motion.div>

        {/* title */}
        <motion.p
          className="font-script text-2xl md:text-3xl text-valentine-gold text-glow-gold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          A Special Question...
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif-display text-primary-foreground text-glow mb-4 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Will you be my
          <br />
          <span className="text-valentine-pink italic">Valentine</span>?
        </motion.h1>

        <motion.div
          className="relative mt-6 mb-16 px-6 py-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", bounce: 0.5 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-valentine-rose/10 to-transparent blur-xl"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.h2
            className="relative z-10 text-5xl md:text-7xl font-bold font-serif-display text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF] to-[#D4AF37] drop-shadow-sm pb-2"
            style={{ 
              backgroundSize: "200% auto", 
              textShadow: "0 2px 10px rgba(212, 175, 55, 0.5)" 
            }}
            animate={{ 
              backgroundPosition: ["0% center", "200% center"],
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            ✨ {name} ✨
          </motion.h2>
        </motion.div>

        {/* buttons */}
        <motion.div
          className="flex flex-row items-center justify-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {/* YES button */}
          <motion.button
            onClick={handleYes}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            className="px-14 py-5 rounded-full bg-gradient-to-r from-valentine-rose via-valentine-pink to-valentine-rose text-white font-bold text-2xl box-glow hover:brightness-110 transition-all duration-300 shadow-2xl relative overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-white/20 rounded-full"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="relative z-10">Yes! 💖</span>
          </motion.button>

          {/* NO button – dodges when cursor approaches (proximity-based) */}
          <motion.button
            ref={noBtnRef}
            animate={noPosInitialized ? { left: noPos.x, top: noPos.y } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`px-10 py-4 rounded-full bg-muted/60 text-muted-foreground font-semibold text-lg border border-border/50 backdrop-blur-sm select-none ${noPosInitialized ? "fixed z-40" : "relative"}`}
          >
            No 😢
          </motion.button>
        </motion.div>

        {/* decorative text */}
        <motion.p
          className="mt-10 text-valentine-blush/50 text-sm italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          (because my heart only beats for you! �)
        </motion.p>
      </div>


      {/* confetti overlay */}
      <AnimatePresence>{showConfetti && <Confetti />}</AnimatePresence>

      {/* bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default ValentineProposal;

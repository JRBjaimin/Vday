import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { toast } from "sonner";

interface HeroSectionProps {
  onToggleSingle?: () => void;
}

const HeroSection = ({ onToggleSingle }: HeroSectionProps) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (!name.trim()) return;
    navigate(`/valentine?name=${encodeURIComponent(name.trim())}`);
  };

  const handleCopyLink = () => {
    if (!name.trim()) {
      toast.error("Please enter a name first!");
      return;
    }
    const url = `${window.location.origin}/valentine?name=${encodeURIComponent(name.trim())}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard! 💖");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-valentine">
      {/* Sparkle particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-valentine-gold"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 4,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.2, bounce: 0.4 }}
          className="mb-8"
        >
          <Heart
            className="mx-auto text-valentine-pink animate-pulse-heart"
            size={80}
            fill="hsl(330, 80%, 70%)"
            strokeWidth={1}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-script text-2xl md:text-3xl text-valentine-gold mb-4"
        >
          Celebrate Love
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif-display text-primary-foreground text-glow mb-6 leading-tight"
        >
          Happy Valentine's
          <br />
          <span className="text-valentine-pink italic">Day</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg md:text-xl text-valentine-blush/80 max-w-xl mx-auto mb-8"
        >
          Love is not just a feeling, it's an art. And like any art, it takes passion, dedication, and a whole lot of heart.
        </motion.p>

        {/* Name input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mb-6 max-w-md mx-auto"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Enter their name 💕"
            className="w-full px-6 py-4 rounded-full bg-card/60 backdrop-blur-md border-2 border-valentine-rose/40 text-foreground text-center text-lg font-script placeholder:text-valentine-blush/40 focus:outline-none focus:border-valentine-pink focus:box-glow transition-all duration-300"
          />
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!name.trim()}
              className="px-8 py-4 rounded-full bg-valentine-gold text-accent-foreground font-bold text-lg box-glow-gold hover:brightness-110 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed min-w-[200px]"
            >
              Send Your Love ♥
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              disabled={!name.trim()}
              className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border-2 border-valentine-gold/50 text-valentine-gold font-bold text-lg hover:bg-white/20 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed min-w-[200px]"
            >
              Copy Link 🔗
            </motion.button>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleSingle}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-lg box-glow hover:brightness-110 transition-all duration-300 min-w-[200px] border-2 border-white/20"
          >
            Single Mode 🤘
          </motion.button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;

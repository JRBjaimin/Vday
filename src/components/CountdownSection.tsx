import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const quotes = [
  "\"The best thing to hold onto in life is each other.\" — Audrey Hepburn",
  "\"You know you're in love when you can't fall asleep because reality is finally better than your dreams.\" — Dr. Seuss",
  "\"Love is composed of a single soul inhabiting two bodies.\" — Aristotle",
  "\"I have waited for this opportunity for more than half a century, to repeat to you once again my vow of eternal fidelity and everlasting love.\" — Gabriel García Márquez",
];

const CountdownSection = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 relative overflow-hidden gradient-valentine-soft">
      {/* Background floating elements */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-valentine-rose/10 text-6xl"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ♥
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-script text-2xl text-valentine-gold mb-3">Words of Love</p>
          <h2 className="text-4xl md:text-5xl font-bold font-serif-display text-foreground text-glow">
            Romantic Quotes
          </h2>
        </motion.div>

        <div className="min-h-[160px] flex items-center justify-center">
          <motion.p
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="font-serif-display text-xl md:text-2xl text-center text-foreground/90 italic leading-relaxed max-w-2xl mx-auto"
          >
            {quotes[currentQuote]}
          </motion.p>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQuote(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentQuote
                  ? "bg-valentine-gold scale-125"
                  : "bg-valentine-rose/30 hover:bg-valentine-rose/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;

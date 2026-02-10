import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const LoveLetterSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-script text-2xl text-valentine-gold mb-3">From the Heart</p>
          <h2 className="text-4xl md:text-5xl font-bold font-serif-display text-foreground text-glow">
            A Love Letter
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotateX: -90, transformPerspective: 800 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="bg-card border-2 border-valentine-rose/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative corners */}
            <Heart className="absolute top-4 left-4 text-valentine-rose/20" size={24} fill="currentColor" />
            <Heart className="absolute top-4 right-4 text-valentine-rose/20" size={24} fill="currentColor" />
            <Heart className="absolute bottom-4 left-4 text-valentine-rose/20" size={24} fill="currentColor" />
            <Heart className="absolute bottom-4 right-4 text-valentine-rose/20" size={24} fill="currentColor" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <p className="font-script text-xl text-valentine-gold mb-6">My Dearest,</p>
              <p className="font-script text-lg md:text-xl text-foreground/90 leading-relaxed mb-4">
                In a world full of temporary things, you are a perpetual feeling. Every moment with you is a treasure,
                every smile you share is a gift I will forever cherish.
              </p>
              <p className="font-script text-lg md:text-xl text-foreground/90 leading-relaxed mb-4">
                You are the poetry I never knew I was searching for, the melody that makes my heart sing,
                and the reason I believe in forever.
              </p>
              <p className="font-script text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
                Today and always, my heart is yours.
              </p>
              <p className="font-script text-xl text-valentine-pink text-right">
                With all my love ♥
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveLetterSection;

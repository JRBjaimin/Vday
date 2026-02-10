import { motion } from "framer-motion";
import { Heart, Instagram, Twitter, Facebook } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-16 px-4 border-t border-border/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Heart
            className="mx-auto mb-6 text-valentine-rose animate-pulse-heart"
            size={40}
            fill="hsl(350, 85%, 60%)"
            strokeWidth={1}
          />

          <p className="font-script text-2xl text-valentine-pink mb-6">
            Spread the Love
          </p>

          <div className="flex justify-center gap-6 mb-8">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-valentine-rose hover:border-valentine-rose/50 transition-colors duration-300"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>

          <p className="text-muted-foreground text-sm">
            Made with <span className="text-valentine-rose">❤️</span> for Valentine's Day 2026
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;

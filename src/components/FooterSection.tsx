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


        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;

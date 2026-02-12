import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import FooterSection from "@/components/FooterSection";
import LoveLetterSection from "@/components/LoveLetterSection";
import SingleMode from "@/pages/SingleMode";

const Index = () => {
  const [singleMode, setSingleMode] = useState(false);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <AnimatePresence mode="wait">
        {singleMode ? (
          <SingleMode key="single" onBack={() => setSingleMode(false)} />
        ) : (
          <motion.div
            key="valentine"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
          >
            <FloatingHearts />
            <HeroSection onToggleSingle={() => setSingleMode(true)} />
            <LoveLetterSection />
            <FooterSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

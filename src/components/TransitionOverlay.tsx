import { motion } from "framer-motion";

const FireTransition = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none flex items-end justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background overlay darkening */}
      <motion.div 
        className="absolute inset-0 bg-black/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Fire Particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 w-16 h-16 rounded-full blur-xl"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: i % 2 === 0 ? '#ff5500' : '#ffcc00', // Orange and Yellow
          }}
          initial={{ y: "100%", scale: 0.5, opacity: 0 }}
          animate={{
            y: "-150vh",
            scale: [1, 2, 0],
            opacity: [0, 0.8, 0],
            x: Math.random() * 200 - 100
          }}
          transition={{
            duration: 1 + Math.random() * 1.5,
            ease: "easeOut",
            delay: Math.random() * 0.5,
            repeat: 0
          }}
        />
      ))}
      
      {/* Big rising fire wall */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[120vh] bg-gradient-to-t from-red-600 via-orange-500 to-transparent blur-3xl opacity-60"
        initial={{ y: "100%" }}
        animate={{ y: "-10%" }}
        transition={{ duration: 0.8, ease: "circOut" }}
      />
    </motion.div>
  );
};

export default FireTransition;

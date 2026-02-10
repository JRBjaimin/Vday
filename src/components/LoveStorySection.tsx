import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

const stories = [
  {
    icon: Heart,
    title: "First Glance",
    description: "Every great love story starts with a single moment that changes everything forever.",
  },
  {
    icon: Sparkles,
    title: "The Spark",
    description: "That indescribable feeling when two souls recognize each other across time and space.",
  },
  {
    icon: Star,
    title: "Forever After",
    description: "True love isn't found, it's built — day by day, moment by moment, heart to heart.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" as const },
  }),
};

const LoveStorySection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-script text-2xl text-valentine-gold mb-3">Our Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold font-serif-display text-foreground text-glow">
            A Love Story
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <motion.div
              key={story.title}
              custom={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="relative group"
            >
              <div className="bg-card border border-border/50 rounded-2xl p-8 text-center h-full backdrop-blur-sm hover:box-glow transition-all duration-500">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <story.icon className="text-valentine-rose" size={32} fill="hsl(350, 85%, 60%)" strokeWidth={1} />
                </motion.div>
                <h3 className="text-2xl font-bold font-serif-display text-foreground mb-3">{story.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{story.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStorySection;

import { motion } from "framer-motion";
import { Gift, Heart, Flower2, Music } from "lucide-react";

const gifts = [
  { icon: Heart, title: "Love Letters", desc: "Handwritten words from the heart", color: "text-valentine-rose" },
  { icon: Gift, title: "Special Gifts", desc: "Curated with love and care", color: "text-valentine-gold" },
  { icon: Flower2, title: "Red Roses", desc: "Classic beauty that speaks volumes", color: "text-valentine-pink" },
  { icon: Music, title: "Love Songs", desc: "Melodies that touch the soul", color: "text-valentine-purple" },
];

const GiftCardsSection = () => {
  return (
    <section className="py-24 px-4 gradient-valentine-soft">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-script text-2xl text-valentine-gold mb-3">Express Your Love</p>
          <h2 className="text-4xl md:text-5xl font-bold font-serif-display text-foreground text-glow">
            Gift Ideas
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {gifts.map((gift, i) => (
            <motion.div
              key={gift.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.08, y: -8 }}
              className="group cursor-pointer"
            >
              <div className="bg-card/80 backdrop-blur border border-border/30 rounded-2xl p-6 text-center h-full hover:box-glow transition-all duration-500">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <gift.icon className={`mx-auto ${gift.color}`} size={48} strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-lg font-bold font-serif-display text-foreground mb-2">{gift.title}</h3>
                <p className="text-sm text-muted-foreground">{gift.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftCardsSection;

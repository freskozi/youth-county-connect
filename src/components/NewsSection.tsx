import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

const newsItems = [
  {
    id: 1,
    title: "Uspješno završen projekt zelene županije",
    excerpt: "Naši volonteri posadili su preko 500 stabala u sklopu inicijative za održivi razvoj lokalne zajednice.",
    date: "15. siječnja 2025.",
    image: news1,
    category: "Projekti",
  },
  {
    id: 2,
    title: "Radionica digitalnih vještina za mlade",
    excerpt: "Nova serija besplatnih radionica usmjerenih na razvoj IT kompetencija mladih u našoj županiji.",
    date: "10. siječnja 2025.",
    image: news2,
    category: "Edukacija",
  },
  {
    id: 3,
    title: "Susret s europskim mladim liderima",
    excerpt: "Delegacija naše organizacije sudjelovala je na međunarodnoj konferenciji mladih u Bruxellesu.",
    date: "5. siječnja 2025.",
    image: news3,
    category: "Događaji",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function NewsSection() {
  return (
    <section id="novosti" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Najnovije vijesti
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary mt-3">
            Što se događa kod nas
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {newsItems.map((item) => (
            <motion.article
              key={item.id}
              variants={itemVariants}
              className="group bg-card rounded-2xl overflow-hidden card-hover cursor-pointer"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-secondary text-white text-xs font-semibold rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Calendar size={14} />
                  <time>{item.date}</time>
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all">
                  Pročitaj više
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            Sve vijesti
            <ArrowRight size={18} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

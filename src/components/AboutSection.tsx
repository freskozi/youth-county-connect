import { motion } from "framer-motion";
import { Target, Lightbulb, Users, Calendar } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Naš cilj",
    description: "Osnaživanje mladih kroz aktivno sudjelovanje u društvu i politici te stvaranje pozitivnih promjena u zajednici.",
  },
  {
    icon: Lightbulb,
    title: "Aktivnosti",
    description: "Organiziramo radionice, projekte, volonterske akcije i obrazovne programe za mlade svih dobnih skupina.",
  },
  {
    icon: Users,
    title: "Članovi",
    description: "Okupljamo motivirane mlade ljude koji žele doprinijeti razvoju svoje županije i društva u cjelini.",
  },
  {
    icon: Calendar,
    title: "Događaji",
    description: "Redovito održavamo konferencije, sastanke i druženja koja povezuju mlade iz cijele regije.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

export function AboutSection() {
  return (
    <section id="o-nama" className="py-20 md:py-32 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Tko smo mi
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary mt-3 mb-6">
            Gradimo budućnost zajedno
          </h2>
          <p className="text-muted-foreground text-lg">
            Mi smo zajednica mladih koji vjeruju da svaki glas može napraviti razliku. 
            Kroz naš rad pokazujemo da su mladi pokretač pozitivnih promjena.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-6 md:p-8 rounded-2xl bg-muted/30 hover:bg-gradient-to-br hover:from-secondary/5 hover:to-accent/5 transition-all duration-300 border border-transparent hover:border-secondary/20"
            >
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

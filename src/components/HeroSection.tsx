import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import bgBlue from "@/assets/bg-blue.png";
import logoVsz from "@/assets/logo-vsz.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgBlue})` }}
      />
      <div className="absolute inset-0 bg-primary/60" />

      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.img
            src={logoVsz}
            alt="Mladež HDZ-a Vukovarsko-srijemske županije"
            className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 mb-6"
          >
            <Users size={18} />
            <span className="text-sm font-medium">Više od 500 aktivnih članova</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
          >
            Mladi koji{" "}
            <span className="text-accent">mijenjaju</span>{" "}
            županiju
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
          >
            Pridruži se projektima i aktivnostima mladih! Zajedno gradimo bolju budućnost
            naše zajednice kroz inovacije, edukaciju i aktivizam.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild variant="hero" size="xl" className="group bg-white text-primary hover:bg-white/90">
              <Link to="/prijava">
                Pridruži se
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              <a href="#novosti">Pogledaj aktivnosti</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20"
          >
            {[
              { value: "500+", label: "Članova" },
              { value: "50+", label: "Projekata" },
              { value: "12", label: "Godina rada" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-heading font-bold text-2xl md:text-4xl text-white">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-white/60 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

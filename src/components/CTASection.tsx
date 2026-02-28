import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-primary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 mb-6"
          >
            <Sparkles size={18} />
            <span className="text-sm font-medium">Postani dio naše priče</span>
          </motion.div>

          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Spreman/na za promjene?
          </h2>
          
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Pridruži se našoj zajednici mladih aktivista i zajedno stvarajmo 
            pozitivne promjene u našoj županiji. Tvoj glas je važan!
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              asChild
              variant="secondary" 
              size="xl" 
              className="bg-white text-primary hover:bg-white/90 group"
            >
              <Link to="/prijava">
                Pridruži se danas
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="xl" 
              className="text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50"
            >
              Saznaj više
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

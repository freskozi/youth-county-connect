import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Users, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/data/socialLinks";
import { TwitterIcon } from "./TwitterIcon";
import { TikTokIcon } from "./TikTokIcon";
import { useEffect, useState } from "react";

// Uvoziš postojeće logotipe
import logoWhite from "@/assets/logo-mladez-plava.png"; // Koristit ćemo ovaj kao bazu

export function HeroSection() {
  const [logoIndex, setLogoIndex] = useState(0); // 0: plava, 1: bijela

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // CSS filteri za plavu i bijelu boju
  const logoStyles = [
    { 
      name: "Plava", 
      filter: "brightness(0) saturate(100%) invert(24%) sepia(88%) saturate(2304%) hue-rotate(195deg) brightness(92%) contrast(101%) drop-shadow(0 0 15px rgba(0, 90, 173, 0.4))" 
    },
    { 
      name: "Bijela", 
      filter: "brightness(0) invert(1) drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))" 
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#001e4a]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[80%] bg-blue-600 blur-[120px] rounded-full pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[70%] bg-blue-400 blur-[100px] rounded-full pointer-events-none" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001e4a]/50 via-transparent to-[#001e4a]/80" />
      </div>

      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Pulsing Glow Effect */}
            <motion.div 
              className="absolute inset-0 blur-[70px] rounded-full transition-colors duration-1000"
              style={{ 
                backgroundColor: logoIndex === 0 ? "#005aad" : "#ffffff",
                opacity: 0.2
              }}
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            <div className="relative w-full h-full flex items-center justify-center">
              {logoStyles.map((style, index) => (
                <motion.img
                  key={style.name}
                  src={logoWhite}
                  alt={`${style.name} logo`}
                  className="absolute w-full h-full object-contain"
                  style={{ filter: style.filter }}
                  animate={{ 
                    opacity: logoIndex === index ? 1 : 0,
                    scale: logoIndex === index ? [1, 1.05, 1] : 0.95,
                  }}
                  transition={{ 
                    opacity: { duration: 1.5, ease: "easeInOut" },
                    scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 mb-6"
          >
            <Users size={18} />
            <span className="text-sm font-medium">
              Mladež HDZ-a Vukovarsko-srijemske županije
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-relaxed mb-8 flex flex-col items-center justify-center gap-2 md:gap-4"
          >
            <span>Mladi koji <span className="text-accent inline-block drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">mijenjaju</span></span>
            <span>županiju</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
          >
            Pridruži se projektima i aktivnostima mladih! Zajedno gradimo bolju
            budućnost naše zajednice kroz inovacije, edukaciju i aktivizam.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              variant="hero"
              size="xl"
              className="group bg-white text-primary hover:bg-white/90"
            >
              <Link to="/prijava">
                Pridruži se
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="heroOutline"
              size="xl"
              className="border-2 border-white bg-white text-primary hover:bg-white/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <Link to="/#novosti">Pogledaj aktivnosti</Link>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            {[
              { icon: Facebook, href: socialLinks.facebook, label: "Facebook" },
              { icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
              { icon: TikTokIcon, href: socialLinks.tiktok, label: "TikTok" },
              { icon: TwitterIcon, href: socialLinks.x, label: "X" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-primary hover:bg-secondary hover:text-white transition-all duration-300 shadow-xl hover:-translate-y-1"
                aria-label={social.label}
              >
                <social.icon size={22} />
              </a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20"
          >
            {[
              { value: "1200+", label: "Članova" },
              { value: "400+", label: "Projekata" },
              { value: "34", label: "Godina rada" },
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

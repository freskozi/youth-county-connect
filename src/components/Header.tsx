import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Menu, X } from "lucide-react";
import logoMladez from "@/assets/logo-mladez-plava.png";
import { socialLinks } from "@/data/socialLinks";
import { Link, useLocation } from "react-router-dom";
import { TwitterIcon } from "./TwitterIcon";
import { TikTokIcon } from "./TikTokIcon";

const navLinks = [
  { href: "/#novosti", label: "Novosti", isRoute: true },
  { href: "/#o-nama", label: "O nama", isRoute: true },
  { href: "/#galerija", label: "Galerija", isRoute: true },
  { href: "/#kontakt", label: "Kontakt", isRoute: true },
  { href: "/prijava", label: "Pridruži se", isRoute: true },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Dinamička klasa za pozadinu ovisno o stranici i skrolanju
  const headerBgClass = !isHomePage 
    ? "bg-primary shadow-xl py-1" // Na svim stranicama koje nisu home, uvijek tamno
    : isScrolled 
      ? "bg-[#001e4a]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-1" 
      : "bg-white/10 backdrop-blur-2xl border-b border-white/10 py-0";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="container mx-auto">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={handleLogoClick}
            className="flex items-center gap-3 group transition-transform hover:scale-[1.02]"
          >
            <img src={logoMladez} alt="Mladež HDZ-a" className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg leading-tight transition-colors text-white group-hover:text-blue-200">
                Mladež HDZ-a
              </span>
              <span className="text-[10px] md:text-xs leading-tight uppercase tracking-wider transition-colors text-white/70 group-hover:text-white">
                Vukovarsko-srijemske županije
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-semibold transition-colors duration-200 text-white/80 hover:text-white"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-medium transition-colors duration-200 text-white/80 hover:text-white"
                >
                  {link.label}
                </a>
              )
            )}

            {/* Social icons */}
            <div className="flex items-center gap-3 pl-4 border-l border-white/15">
              <a
                href={socialLinks.facebook}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={18} />
              </a>
              <a
                href={socialLinks.instagram}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={18} />
              </a>
              <a
                href={socialLinks.x}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon size={18} />
              </a>
              <a
                href={socialLinks.tiktok}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TikTokIcon size={18} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg transition-all shadow-lg border bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </nav>
      </div>

      {/* Mobile Menu Overlay - Izvan container-a za punu širinu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-lg font-medium text-white/90 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                  <Facebook size={24} />
                </a>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                  <Instagram size={24} />
                </a>
                <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                  <TikTokIcon size={24} />
                </a>
                <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                  <TwitterIcon size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

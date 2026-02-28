import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import logoVsz from "@/assets/logo-vsz.png";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const navLinks = [
  { label: "O nama", href: "#o-nama" },
  { label: "Novosti", href: "#novosti" },
  { label: "Galerija", href: "#galerija" },
  { label: "Kontakt", href: "#kontakt" },
];

export function Footer() {
  return (
    <footer id="kontakt" className="bg-primary text-white">
      <div className="container py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoVsz} alt="Mladež HDZ-a" className="h-12 w-auto" />
              <div>
                <span className="font-heading font-bold text-xl block">Mladež HDZ-a</span>
                <span className="text-white/60 text-sm">Vukovarsko-srijemske županije</span>
              </div>
            </div>
            <p className="text-white/70 max-w-sm mb-6">
              Zajedno gradimo bolju budućnost naše županije kroz aktivizam, 
              edukaciju i zajedništvo mladih.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Navigacija</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Kontakt</h4>
            <div className="flex flex-col gap-4">
              <a 
                href="mailto:mladez@hdz-vsz.hr" 
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Mail size={18} />
                mladez@hdz-vsz.hr
              </a>
              <a 
                href="tel:+385123456789" 
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone size={18} />
                +385 1 234 5678
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <span>Vukovar, Vukovarsko-srijemska županija</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© 2025 Mladež HDZ-a Vukovarsko-srijemske županije. Sva prava pridržana.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Pravila privatnosti</a>
            <a href="#" className="hover:text-white transition-colors">Uvjeti korištenja</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

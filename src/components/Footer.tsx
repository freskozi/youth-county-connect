import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import logoVsz from "@/assets/logo-vsz.png";
import { socialLinks } from "@/data/socialLinks";
import { Link } from "react-router-dom";
import { TwitterIcon } from "./TwitterIcon";
import { TikTokIcon } from "./TikTokIcon";

const navLinks = [
  { label: "O nama", href: "/#o-nama" },
  { label: "Novosti", href: "/#novosti" },
  { label: "Galerija", href: "/#galerija" },
  { label: "Kontakt", href: "/#kontakt" },
];

export function Footer() {
  return (
    <footer id="kontakt" className="bg-primary text-white">
      <div className="container py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoVsz} alt="Mladež HDZ-a" className="h-12 w-auto" />
              <div>
                <span className="font-heading font-bold text-xl block">
                  Mladež HDZ-a
                </span>
                <span className="text-white/60 text-sm leading-tight block">
                  Vukovarsko-srijemske županije
                </span>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-6">
              Zajedno gradimo bolju budućnost naše županije kroz aktivizam,
              edukaciju i zajedništvo mladih.
            </p>
            <div className="flex gap-3">
              <a
                href={socialLinks.facebook}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={16} />
              </a>
              <a
                href={socialLinks.instagram}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={16} />
              </a>
              <a
                href={socialLinks.x}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon size={16} />
              </a>
              <a
                href={socialLinks.tiktok}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TikTokIcon size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-1">
            <h4 className="font-heading font-bold text-lg mb-4">Navigacija</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact - Spanning 2 columns to show side-by-side */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-lg mb-4">Kontakt i Centrale</h4>
            <div className="flex flex-col gap-6">
              <a
                href="mailto:vukovarsko.srijemska@mhdz.hr"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Mail size={16} />
                </div>
                <span className="text-sm">vukovarsko.srijemska@mhdz.hr</span>
              </a>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-secondary font-bold italic">Vukovar</span>
                  <div className="flex flex-col gap-2">
                    <a href="tel:+38532441511" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[11px] group">
                      <Phone size={10} className="text-secondary flex-shrink-0" />
                      +385 32 441 511
                    </a>
                    <div className="flex items-start gap-2 text-white/70 text-[11px]">
                      <MapPin size={10} className="text-secondary mt-0.5 flex-shrink-0" />
                      <span>Ul. Andrije Hebranga 12/I, 32000 Vukovar</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 border-l border-white/5 pl-4">
                  <span className="text-[10px] uppercase tracking-widest text-secondary font-bold italic">Vinkovci</span>
                  <div className="flex flex-col gap-2">
                    <a href="tel:+38532331738" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[11px] group">
                      <Phone size={10} className="text-secondary flex-shrink-0" />
                      +385 32 331 738
                    </a>
                    <div className="flex items-start gap-2 text-white/70 text-[11px]">
                      <MapPin size={10} className="text-secondary mt-0.5 flex-shrink-0" />
                      <span>Duga ulica 23, 32100 Vinkovci</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex justify-center text-sm text-white/50 text-center">
          <p>
            © 2026 Mladež HDZ-a Vukovarsko-srijemske županije. Sva prava
            pridržana.
          </p>
        </div>
      </div>
    </footer>
  );
}

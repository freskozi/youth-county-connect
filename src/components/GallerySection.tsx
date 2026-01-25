import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const galleryImages = [
  { id: 1, src: gallery1, alt: "Volonterska akcija sadnje drveća" },
  { id: 2, src: gallery2, alt: "Radionica za mlade" },
  { id: 3, src: gallery3, alt: "Konferencija mladih" },
  { id: 4, src: gallery4, alt: "Druženje članova" },
  { id: 5, src: gallery5, alt: "Projekt u zajednici" },
  { id: 6, src: gallery6, alt: "Edukativni program" },
];

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryImages.length);
    }
  };
  
  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section id="galerija" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Galerija
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary mt-3">
            Trenutci koji nas definiraju
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative aspect-square overflow-hidden rounded-xl cursor-pointer group ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">Pogledaj</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 transition-colors z-10"
              aria-label="Zatvori galeriju"
            >
              <X size={32} />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 text-white/80 hover:text-white p-2 transition-colors z-10"
              aria-label="Prethodna slika"
            >
              <ChevronLeft size={40} />
            </button>
            
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-5xl max-h-[85vh] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].alt}
                className="w-full h-full object-contain"
              />
            </motion.div>
            
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 text-white/80 hover:text-white p-2 transition-colors z-10"
              aria-label="Sljedeća slika"
            >
              <ChevronRight size={40} />
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {galleryImages[selectedIndex].alt}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

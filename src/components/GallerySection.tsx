import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { galleryItems } from "@/data/galleryData";

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryItems.length);
    }
  };

  const goPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + galleryItems.length) % galleryItems.length,
      );
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
          {galleryItems.map((image, index) => (
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
                src={image.image}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  Pogledaj
                </span>
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
              onClick={goPrev}
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
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[selectedIndex].image}
                alt={galleryItems[selectedIndex].title}
                className="w-full h-full object-contain"
              />
            </motion.div>

            <button
              onClick={goNext}
              className="absolute right-4 text-white/80 hover:text-white p-2 transition-colors z-10"
              aria-label="Sljedeća slika"
            >
              <ChevronRight size={40} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 text-sm">
              <span>{galleryItems[selectedIndex].title}</span>
              {galleryItems[selectedIndex].articleSlug && (
                <Link
                  to={`/novosti/${galleryItems[selectedIndex].articleSlug}`}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-white hover:bg-secondary/90"
                  onClick={(e) => e.stopPropagation()}
                >
                  Otvori članak
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

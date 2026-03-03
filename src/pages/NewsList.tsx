import { motion } from "framer-motion";
import { Calendar, ArrowRight, Instagram, Facebook, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { newsArticles } from "@/data/newsData";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function NewsList() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} className="mr-2" />
              Povratak na naslovnicu
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4">
              Sve vijesti
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Pratite najnovije aktivnosti, projekte i događanja Mladeži HDZ-a Vukovarsko-srijemske županije.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {newsArticles.map((item) => (
              <motion.article
                key={item.id}
                variants={itemVariants}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-border/50"
              >
                <Link to={`/novosti/${item.slug}`}>
                  <div className="aspect-[16/10] relative overflow-hidden bg-muted">
                    {item.type === "embed" ? (
                      <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground group-hover:text-secondary transition-colors">
                        {item.platform === "instagram" ? (
                          <Instagram size={48} strokeWidth={1.5} />
                        ) : (
                          <Facebook size={48} strokeWidth={1.5} />
                        )}
                        <span className="text-sm font-medium">
                          {item.platform === "instagram" ? "Instagram" : "Facebook"} post
                        </span>
                      </div>
                    ) : (
                      item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-secondary text-white text-xs font-semibold rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                      <Calendar size={14} />
                      <time>{item.date}</time>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-secondary transition-colors line-clamp-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {item.type === "embed" ? `Pogledaj na ${item.platform === "instagram" ? "Instagramu" : "Facebooku"}` : item.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all">
                      Pročitaj više
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

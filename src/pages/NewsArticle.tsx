import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Instagram,
  Facebook,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShareButtons } from "@/components/ShareButtons";
import { RelatedArticles } from "@/components/RelatedArticles";
import { getArticleBySlug, getRelatedArticles } from "@/data/newsData";
import { useEffect } from "react";

export default function NewsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const relatedArticles = article ? getRelatedArticles(article.id) : [];
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-heading font-bold text-3xl text-foreground mb-4">
              Članak nije pronađen
            </h1>
            <p className="text-muted-foreground mb-6">
              Traženi članak ne postoji ili je uklonjen.
            </p>
            <Button variant="hero" onClick={() => navigate("/")}>
              Povratak na naslovnicu
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const articleUrl = typeof window !== "undefined" ? window.location.href : "";
  const isEmbed = article.type === "embed";

  // Helper to format YouTube URLs for embedding
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch?v=")) {
      const id = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20 md:pt-24">
        {/* Hero Image - only for articles */}
        {!isEmbed && article.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-[40vh] md:h-[50vh] overflow-hidden"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </motion.div>
        )}

        <div
          className={`container max-w-4xl ${!isEmbed && article.image ? "-mt-24" : ""} relative z-10`}
        >
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} className="mr-2" />
              Povratak
            </Button>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-6 md:p-10 shadow-lg"
          >
            <header className="mb-8">
              <span className="inline-block px-3 py-1 bg-secondary text-white text-xs font-semibold rounded-full mb-4">
                {article.category}
              </span>

              <h1 className="font-heading font-bold text-2xl md:text-4xl text-foreground mb-6 leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <time>{article.date}</time>
                </div>
                {article.author && (
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{article.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Tag size={16} />
                  <span>{article.category}</span>
                </div>
              </div>
            </header>

            {/* Video Support */}
            {!isEmbed && article.videoUrl && (
              <div className="mb-8 rounded-xl overflow-hidden aspect-video bg-black shadow-lg">
                {article.videoUrl.includes("youtube") ||
                article.videoUrl.includes("youtu.be") ? (
                  <iframe
                    src={getEmbedUrl(article.videoUrl)}
                    title={article.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : article.videoUrl.includes("facebook.com") ? (
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(article.videoUrl)}&show_text=0`}
                    title={article.title}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <video
                    src={article.videoUrl}
                    controls
                    className="w-full h-full"
                  />
                )}
              </div>
            )}

            {/* Article Content or embed */}
            {isEmbed ? (
              article.embedHtml ? (
                <div className="mt-4 mb-10 flex flex-col items-center gap-4">
                  <div
                    className="w-full max-w-xl [&>blockquote]:w-full"
                    dangerouslySetInnerHTML={{ __html: article.embedHtml }}
                  />
                  {article.embedUrl && (
                    <a
                      href={article.embedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-secondary px-6 py-2 text-sm font-semibold text-secondary hover:bg-secondary hover:text-white transition-colors"
                    >
                      Otvori na Instagramu
                    </a>
                  )}
                </div>
              ) : (
                <div className="mt-4 mb-10 flex flex-col items-center gap-4 text-center">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    {article.platform === "instagram" ? (
                      <Instagram size={32} />
                    ) : (
                      <Facebook size={32} />
                    )}
                    <span className="font-medium">
                      Objavu pogledaj na{" "}
                      {article.platform === "instagram"
                        ? "Instagramu"
                        : "Facebooku"}
                    </span>
                  </div>
                  {article.embedUrl && (
                    <a
                      href={article.embedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-secondary px-6 py-2 text-sm font-semibold text-secondary hover:bg-secondary hover:text-white transition-colors"
                    >
                      Otvori objavu
                    </a>
                  )}
                </div>
              )
            ) : article.content ? (
              <div
                className="prose prose-lg max-w-none 
                  prose-headings:font-heading prose-headings:text-foreground prose-headings:font-bold
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-secondary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-foreground/80
                  prose-ul:text-muted-foreground prose-li:marker:text-secondary"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : null}

            {/* Share Again at Bottom */}
            <div className="mt-10 pt-6 border-t border-border space-y-10">
              {/* Per-article gallery */}
              {article.gallery && article.gallery.length > 0 && (
                <section>
                  <h2 className="font-heading font-semibold text-lg mb-4">
                    Galerija fotografija
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {article.gallery.map((src, index) => (
                      <button
                        key={src + index}
                        type="button"
                        onClick={() => setGalleryIndex(index)}
                        className="relative aspect-square overflow-hidden rounded-xl group"
                      >
                        <img
                          src={src}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            Uvećaj
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <div className="pt-6 border-t border-border flex justify-center">
                <ShareButtons title={article.title} url={articleUrl} />
              </div>

              {/* Related Articles */}
              <RelatedArticles articles={relatedArticles} />
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />

      {/* Lightbox for article gallery */}
      <AnimatePresence>
        {article.gallery &&
          article.gallery.length > 0 &&
          galleryIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setGalleryIndex(null)}
            >
              <button
                onClick={() => setGalleryIndex(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-2 transition-colors z-10"
                aria-label="Zatvori galeriju"
              >
                <X size={28} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!article.gallery) return;
                  setGalleryIndex(
                    (galleryIndex - 1 + article.gallery.length) %
                      article.gallery.length,
                  );
                }}
                className="absolute left-4 text-white/80 hover:text-white p-2 transition-colors z-10"
                aria-label="Prethodna slika"
              >
                <ChevronLeft size={36} />
              </button>

              <motion.div
                key={galleryIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-full max-h-[90vh] flex items-center justify-center p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={article.gallery[galleryIndex]}
                  alt={article.title}
                  className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm"
                />
              </motion.div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!article.gallery) return;
                  setGalleryIndex((galleryIndex + 1) % article.gallery.length);
                }}
                className="absolute right-4 text-white/80 hover:text-white p-2 transition-colors z-10"
                aria-label="Sljedeća slika"
              >
                <ChevronRight size={36} />
              </button>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}

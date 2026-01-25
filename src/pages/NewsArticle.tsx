import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-20 md:pt-24">
        {/* Hero Image */}
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

        <div className="container max-w-4xl -mt-24 relative z-10">
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
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={16} />
                  <span>{article.category}</span>
                </div>
              </div>

              <ShareButtons title={article.title} url={articleUrl} />
            </header>

            {/* Article Content */}
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

            {/* Share Again at Bottom */}
            <div className="mt-10 pt-6 border-t border-border">
              <ShareButtons title={article.title} url={articleUrl} />
            </div>

            {/* Related Articles */}
            <RelatedArticles articles={relatedArticles} />
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

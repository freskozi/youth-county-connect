import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { NewsArticle } from "@/data/newsData";

interface RelatedArticlesProps {
  articles: NewsArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-8">
        Povezani članci
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Link to={`/novosti/${article.slug}`} className="flex gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-secondary text-xs font-semibold uppercase tracking-wide mb-1">
                  {article.category}
                </span>
                <h3 className="font-heading font-semibold text-foreground group-hover:text-secondary transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar size={12} />
                  <time>{article.date}</time>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

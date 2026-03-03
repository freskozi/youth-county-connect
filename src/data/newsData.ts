import newsJson from "./news.json";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import ilokPanel1 from "@/assets/Ilok panel 1.jpg";
import ilokPanel2 from "@/assets/Ilok panel 2.jpg";
import ilokPanel3 from "@/assets/Ilok panel 3.jpg";
import vinkovciObljetnica from "@/assets/vinkovci-obljetnica.jpg.jpg";
import prvaSjednica from "@/assets/Prva redovita sjednica Mladeži HDZ-a Vukovarsko-srijemske županije u novom sazivu .jpg";
import diploma1 from "@/assets/diploma 1.jpg";
import diploma2 from "@/assets/diploma 2.jpg";
import hdzBih1 from "@/assets/Hdz Bih 1.jpg";
import hdzBih2 from "@/assets/Hdz Bih 2.jpg";
import hdzBih3 from "@/assets/Hdz Bih 3.jpg";
import hdzBih4 from "@/assets/Hdz Bih 4.jpg";

// Support both full articles and embeds (Instagram/Facebook)
export interface NewsArticle {
  id: number;
  slug: string;
  type: "article" | "embed";
  title: string;
  excerpt?: string;
  content?: string;
  date: string;
  /**
   * Final image URL used by the app.
   * For regular vijesti punimo je iz imena datoteke (npr. "news-1.jpg").
   */
  image?: string;
  category: string;
  author?: string;
  /**
   * Video URL (YouTube, Facebook, or direct MP4).
   */
  videoUrl?: string;
  /**
   * Dodatne slike u članku (putanje npr. "/gallery/..." ili "/news/...").
   */
  gallery?: string[];
  // For embeds
  platform?: "instagram" | "facebook";
  /**
   * Jednostavniji način: samo URL objave (Instagram/Facebook).
   */
  embedUrl?: string;
  /**
   * Napredni način: puni embed HTML (trenutno ga ne koristimo).
   */
  embedHtml?: string;
}

type RawNews = {
  id: number;
  slug: string;
  type: "article" | "embed";
  title: string;
  excerpt?: string;
  content?: string;
  date: string;
  /**
   * U JSON datoteci "image" je samo ime datoteke, npr. "news-1.jpg".
   */
  image?: string;
  category: string;
  author?: string;
  videoUrl?: string;
  platform?: "instagram" | "facebook";
  embedUrl?: string;
  embedHtml?: string;
  gallery?: string[];
};

// Poveznica imena slike u JSON-u na stvarne assete u projektu
const imageMap: Record<string, string> = {
  "news-1.jpg": news1,
  "news-2.jpg": news2,
  "news-3.jpg": news3,
  "ilok panel 1.jpg": ilokPanel1,
  "ilok panel 2.jpg": ilokPanel2,
  "ilok panel 3.jpg": ilokPanel3,
  "vinkovci-obljetnica.jpg": vinkovciObljetnica,
  "prva-sjednica.jpg": prvaSjednica,
  "diploma-1.jpg": diploma1,
  "diploma-2.jpg": diploma2,
  "hdz-bih-1.jpg": hdzBih1,
  "hdz-bih-2.jpg": hdzBih2,
  "hdz-bih-3.jpg": hdzBih3,
  "hdz-bih-4.jpg": hdzBih4,
};

// Type-safe load from JSON (Vite bundles JSON)
const rawNews = newsJson as RawNews[];

// Sort news by ID descending (newest first)
const sortedRawNews = [...rawNews].sort((a, b) => b.id - a.id);

const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

export const newsArticles: NewsArticle[] = sortedRawNews.map((item) => {
  const finalImage = item.image ? (imageMap[item.image] ?? item.image) : undefined;
  
  // Pomoćna funkcija za mapiranje slika iz galerije
  const mapGallery = (gallery?: string[]) => {
    if (!gallery) return undefined;
    return gallery.map(imgName => imageMap[imgName] ?? imgName);
  };

  const finalGallery = mapGallery(item.gallery);
  
  // Ako slika kreće sa "/", dodajemo baseUrl samo ako već ne kreće s njim
  const fixPath = (path: string | undefined) => {
    if (!path || !path.startsWith("/")) return path;
    if (baseUrl && path.startsWith(baseUrl)) return path;
    return `${baseUrl}${path}`;
  };

  return {
    ...item,
    image: fixPath(finalImage),
    videoUrl: fixPath(item.videoUrl),
    gallery: finalGallery?.map((src) => fixPath(src)),
  };
});

export const getArticleBySlug = (slug: string): NewsArticle | undefined => {
  return newsArticles.find((article) => article.slug === slug);
};

export const getRelatedArticles = (
  currentId: number,
  limit: number = 2,
): NewsArticle[] => {
  return newsArticles
    .filter((article) => article.id !== currentId)
    .slice(0, limit);
};

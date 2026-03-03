import galleryJson from "./gallery.json";
import ilokPanel1 from "@/assets/Ilok panel 1.jpg";
import ilokPanel2 from "@/assets/Ilok panel 2.jpg";
import ilokPanel3 from "@/assets/Ilok panel 3.jpg";
import vinkovciObljetnica from "@/assets/vinkovci-obljetnica.jpg.jpg";
import prvaSjednica from "@/assets/Prva redovita sjednica Mladeži HDZ-a Vukovarsko-srijemske županije u novom sazivu .jpg";
import diploma1 from "@/assets/diploma 1.jpg";
import diploma2 from "@/assets/diploma 2.jpg";
import hdzBih3 from "@/assets/Hdz Bih 3.jpg";

export interface GalleryItem {
  id: number;
  image: string;
  title: string;
  articleSlug?: string;
}

const imageMap: Record<string, string> = {
  "ilok-1.jpg": ilokPanel3,
  "ilok-2.jpg": ilokPanel1,
  "ilok-3.jpg": ilokPanel2,
  "vinkovci.jpg": vinkovciObljetnica,
  "sjednica.jpg": prvaSjednica,
  "diploma-1.jpg": diploma1,
  "diploma-2.jpg": diploma2,
  "hdz-bih-3.jpg": hdzBih3,
};

const rawGallery = galleryJson as GalleryItem[];

const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

export const galleryItems: GalleryItem[] = rawGallery.map((item) => {
  let image = imageMap[item.image] || item.image;
  
  if (typeof image === "string" && image.startsWith("/") && baseUrl && !image.startsWith(baseUrl)) {
    image = `${baseUrl}${image}`;
  }
  
  return {
    ...item,
    image,
  };
});

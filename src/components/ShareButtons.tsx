import { Facebook, Instagram, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { TwitterIcon } from "./TwitterIcon";
import { TikTokIcon } from "./TikTokIcon";
import { socialLinks } from "@/data/socialLinks";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link kopiran!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Greška pri kopiranju");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={copyToClipboard}
        className="transition-colors hover:bg-secondary hover:text-white flex items-center gap-2"
        aria-label="Kopiraj link"
      >
        {copied ? <Check size={18} /> : <Link2 size={18} />}
        <span>{copied ? "Link kopiran!" : "Kopiraj link na vijest"}</span>
      </Button>
    </div>
  );
}

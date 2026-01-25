import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
  author: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    slug: "uspjesno-zavrsen-projekt-zelene-zupanije",
    title: "Uspješno završen projekt zelene županije",
    excerpt: "Naši volonteri posadili su preko 500 stabala u sklopu inicijative za održivi razvoj lokalne zajednice.",
    content: `
      <p>U suradnji s lokalnim vlastima i ekološkim udrugama, naša organizacija uspješno je privela kraju ambiciozni projekt ozelenjavanja županije. Tijekom proteklih šest mjeseci, više od 200 volontera aktivno je sudjelovalo u sadnji drveća, uređenju parkova i edukativnim aktivnostima.</p>
      
      <h3>Što smo postigli?</h3>
      <p>U sklopu projekta posadili smo preko 500 stabala raznih vrsta, uključujući hrast, javor i lipu. Također smo uredili pet javnih parkova i organizirali brojne radionice o održivom razvoju za učenike lokalnih škola.</p>
      
      <h3>Utjecaj na zajednicu</h3>
      <p>Ovaj projekt ne samo da doprinosi očuvanju okoliša, već i jača osjećaj zajedništva među stanovnicima naše županije. Mnogi sudionici izrazili su želju za nastavkom sličnih inicijativa.</p>
      
      <blockquote>"Sudjelovanje u ovom projektu bilo je nevjerojatno iskustvo. Osjećam da smo zajedno napravili pravu promjenu." - Ana M., volonterka</blockquote>
      
      <h3>Planovi za budućnost</h3>
      <p>Potaknuti uspjehom ovog projekta, već planiramo nove inicijative za sljedeću godinu. U fokusu će biti proširenje zelenih površina u urbanim središtima i daljnja edukacija mladih o važnosti očuvanja okoliša.</p>
    `,
    date: "15. siječnja 2025.",
    image: news1,
    category: "Projekti",
    author: "Marko Horvat",
  },
  {
    id: 2,
    slug: "radionica-digitalnih-vjestina-za-mlade",
    title: "Radionica digitalnih vještina za mlade",
    excerpt: "Nova serija besplatnih radionica usmjerenih na razvoj IT kompetencija mladih u našoj županiji.",
    content: `
      <p>U suvremenom digitalnom dobu, posjedovanje IT vještina postaje ključno za uspjeh na tržištu rada. Zato smo pokrenuli seriju besplatnih radionica namijenjenih mladima od 16 do 30 godina.</p>
      
      <h3>Program radionica</h3>
      <p>Naš program obuhvaća širok spektar tema, od osnovne digitalne pismenosti do naprednog programiranja. Radionice vode iskusni stručnjaci iz IT industrije koji su volonterski pristali podijeliti svoje znanje.</p>
      
      <ul>
        <li>Osnove web dizajna i HTML/CSS</li>
        <li>Uvod u programiranje s Pythonom</li>
        <li>Digitalni marketing i društvene mreže</li>
        <li>Kibernetička sigurnost</li>
      </ul>
      
      <h3>Kako se prijaviti?</h3>
      <p>Prijave su otvorene do kraja mjeseca. Sve zainteresirane mlade osobe mogu se prijaviti putem naše web stranice ili osobno u našem uredu. Broj mjesta je ograničen, stoga preporučujemo ranu prijavu.</p>
      
      <h3>Partneri projekta</h3>
      <p>Projekt se provodi u suradnji s lokalnim IT tvrtkama i Zavodom za zapošljavanje, što sudionicima osigurava mogućnosti za stjecanje praktičnog iskustva i potencijalno zaposlenje.</p>
    `,
    date: "10. siječnja 2025.",
    image: news2,
    category: "Edukacija",
    author: "Ivana Kovačić",
  },
  {
    id: 3,
    slug: "susret-s-europskim-mladim-liderima",
    title: "Susret s europskim mladim liderima",
    excerpt: "Delegacija naše organizacije sudjelovala je na međunarodnoj konferenciji mladih u Bruxellesu.",
    content: `
      <p>Predstavnici naše organizacije imali su čast sudjelovati na prestižnoj međunarodnoj konferenciji mladih lidera održanoj u Bruxellesu. Događaj je okupio preko 500 mladih aktivista iz svih zemalja Europske unije.</p>
      
      <h3>Teme konferencije</h3>
      <p>Konferencija se bavila ključnim pitanjima koja utječu na mlade u Europi, uključujući zapošljavanje, klimatske promjene, digitalizaciju i demokratsko sudjelovanje. Naša delegacija aktivno je sudjelovala u raspravama i radionicama.</p>
      
      <h3>Naš doprinos</h3>
      <p>Posebno smo ponosni na prezentaciju našeg projekta "Zelena županija" koja je privukla veliku pozornost sudionika. Dobili smo pozitivne povratne informacije i uspostavili kontakte s organizacijama iz nekoliko europskih zemalja.</p>
      
      <blockquote>"Konferencija je bila izvrsna prilika za razmjenu iskustava i učenje od kolega iz cijele Europe. Vraćamo se s novim idejama i inspiracijom." - Petra N., voditeljica delegacije</blockquote>
      
      <h3>Buduća suradnja</h3>
      <p>Kao rezultat ovog susreta, započeli smo pregovore o zajedničkim projektima s organizacijama iz Njemačke, Austrije i Slovenije. Očekujemo da će ova međunarodna suradnja donijeti nove mogućnosti za mlade u našoj županiji.</p>
    `,
    date: "5. siječnja 2025.",
    image: news3,
    category: "Događaji",
    author: "Luka Babić",
  },
];

export const getArticleBySlug = (slug: string): NewsArticle | undefined => {
  return newsArticles.find((article) => article.slug === slug);
};

export const getRelatedArticles = (currentId: number, limit: number = 2): NewsArticle[] => {
  return newsArticles.filter((article) => article.id !== currentId).slice(0, limit);
};

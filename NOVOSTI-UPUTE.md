# Kako dodati novosti na web stranicu

Novosti se uređuju u datoteci **`src/data/news.json`**. Nema potrebe za uređivanjem programskog koda.

---

## 1. Redovita vijest (članak)

Dodajte novi objekt u polje `[...]` u `news.json`. Evo primjera:

```json
{
  "id": 4,
  "slug": "naslov-vijesti-url",
  "type": "article",
  "title": "Naslov vijesti",
  "excerpt": "Kratak opis koji se prikazuje na naslovnici (1-2 rečenice).",
  "content": "<p>Prvi paragraf.</p><h3>Podnaslov</h3><p>Još teksta...</p>",
  "date": "28. veljače 2025.",
  "image": "/news/slika-vijesti.jpg",
  "category": "Projekti",
  "author": "Vaše ime"
}
```

**Polja:**
- `id` – jedinstveni broj (npr. 4, 5, 6…)
- `slug` – URL dio (bez razmaka, mala slova, crtice umjesto razmaka), npr. `nova-radionica-2025`
- `type` – uvijek `"article"` za članke
- `title` – naslov vijesti
- `excerpt` – kratki opis
- `content` – HTML sadržaj (`<p>`, `<h3>`, `<ul>`, `<li>`, itd.)
- `date` – datum (npr. `28. veljače 2025.`)
- `image` – putanja do slike u `public/news/` (npr. `/news/moja-slika.jpg`)
- `category` – kategorija (npr. Projekti, Edukacija, Događaji)
- `author` – ime autora

**Slike:** stavite slike u mapu **`public/news/`** i u `image` napišite putanju, npr. `/news/moja-slika.jpg`.

---

## 2. Embed s Instagrama ili Facebooka

Kada želite prikazati objavu s Instagrama ili Facebooka direktno na stranici, dodajte ovakav objekt:

```json
{
  "id": 5,
  "slug": "instagram-foto-radionice",
  "type": "embed",
  "platform": "instagram",
  "title": "Foto s radionice",
  "date": "28. veljače 2025.",
  "category": "Događaji",
  "embedHtml": "Ovdje zalijepite embed kod"
}
```

### Instagram

1. Otvorite post na Instagramu u pregledniku
2. Desni klik na post → **Embed**
3. Kopirajte kod (počinje s `<blockquote class="instagram-media"`…)
4. Zalijepite cijeli sadržaj unutar `""` kod polja `embedHtml`

### Facebook

1. Otvorite post na Facebooku
2. Klik na tri točkice (⋯) na postu
3. Odaberite **Embed post**
4. Kopirajte generirani kod
5. Zalijepite ga u `embedHtml` (obično je to `<iframe>` ili sličan HTML)

**Za embed** koristite `"platform": "instagram"` ili `"platform": "facebook"`.

---

## Napomena

- Uvijek stavite zarez `,` između objekata u JSON-u (osim zadnjeg).
- Novije vijesti stavljajte na vrh (na početak polja), starije prema kraju.

# herhangi1filmsitesi

React temellerini hatırlamak, pratik yapmak ve modern web tasarım standartlarını denemek için geliştirilen bir film keşif sitesi. TMDB API kullanılarak vizyondaki, trend olan, popüler, en çok oy alan ve yakında çıkacak filmler listelenir. Aynı zamanda filtreleme ve arama özellikleri ile kullanıcıların yeni filmler keşfetmesi hedeflenmiştir.

## Özellikler

- **Geniş Kapsamlı Film Listeleri:** Trend, Popüler, En Çok Oy Alanlar ve Yaklaşan Filmler.
- **Detaylı Film Keşfetme (Discover):** Kategori, yayın yılı, sıralama ölçütü ve minimum oy oranına göre gelişmiş filtreleme mekanizması.
- **Canlı Arama:** Arama çubuğu üzerinden anlık sonuç görüntüleme.
- **Film Detayları:** Seçilen bir filmin konusu, oyuncu kadrosu (cast & crew), afişleri ve benzer/önerilen filmlerinin gösterilmesi.

## Teknolojiler

- **React 19** — UI
- **React Router** — Routing
- **Tailwind CSS v4** — Stil
- **Framer Motion** - Animasyon
- **TMDB API** — Film verileri

## Proje Yapısı

```
├── components/        # UI bileşenleri (Hero, Navbar, TopRated, HomeMovieCard, DiscoverFilters, vb.)
├── context/           # React Context - Global State (MoviesContext)
├── layouts/           # Page structure (MainLayout)
├── services/          # API calls (filmservice.js, filterservice.js)
├── views/             # Pages (HomeView, DiscoverMovieView, SearchResultsView, MovieDetails, vb.)
├── main.jsx
└── index.css
```

## Kurulum

```bash
npm install
```

Proje kök dizinine `.env` dosyası oluştur

```
VITE_TMDB_API_KEY=senin_api_anahtarin
```

API anahtarını [TMDB](https://www.themoviedb.org/settings/api) üzerinden alabilirsin.

```bash
npm run dev
```

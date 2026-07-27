# herhangi1filmsitesi

React temellerini hatırlamak ve pratik yapmak için geliştirilen bir film keşif sitesi. TMDB API kullanılarak _şimdilik_ trend, popüler ve en çok oy alan filmler listelenir.

## Teknolojiler

- **React 19** — UI
- **React Router** — Sayfa yönlendirme
- **Tailwind CSS v4** — Stil
- **Vite** — Build & dev server
- **TMDB API** — Film verileri

## Proje Yapısı

```
src/
├── components/        # UI bileşenleri
│   ├── Hero.jsx       # Ana sayfa hero bölümü
│   ├── Home.jsx       # Ana sayfa
│   ├── MovieCard.jsx  # Tekil film kartı
│   ├── MovieCategories.jsx  # Film kategorisi listesi
│   ├── MovieDetails.jsx     # Film detay sayfası
│   ├── Navbar.jsx     # Üst menü
│   └── Footer.jsx     # Alt menü
├── context/           # React Context (global state)
│   └── MoviesContext.jsx
├── layouts/           # Sayfa iskeletleri
│   └── MainLayout.jsx
├── services/          # API çağrıları
│   └── filmservice.js
└── main.jsx           # Uygulama giriş noktası
```

## Kurulum

```bash
npm install
```

Proje kök dizinine `.env` dosyası oluştur:

```
VITE_TMDB_API_KEY=senin_api_anahtarin
```

API anahtarını [TMDB](https://www.themoviedb.org/settings/api) üzerinden alabilirsin.

## Çalıştırma

```bash
npm run dev
```

<p align="center">
    <img src="assets/logo.svg" alt="NEXUS logo" width="140" />
</p>

<h1 align="center">NEXUS — Premium Technology Store</h1>

<p align="center">
    A cinematic, high-end e-commerce experience for consumer electronics. NEXUS is a fully front-end React storefront that treats shopping as an experience — think Apple × Tesla × cyberpunk, with a themeable dual-identity design system, 3D hero visuals, and buttery-smooth motion throughout.
</p>

<p align="center">
    <!-- TODO: Replace the URL below with your actual live demo link -->
    Demo Link :- <a href="https://nexus-451.netlify.app/" target="_blank">
        NEXUS
    </a>
</p>

> **Note:** This is a design showcase. All products, prices, and reviews are fictional mock data — there is no backend, authentication, or real checkout.

## 📸 Screenshots

> **Note:** Drop your own screenshots into the `screenshots/` folder and update the paths below.

| | |
| :---: | :---: |
| **Homepage — Midnight theme** | **Homepage — Scandinavian theme** |
| <img width="1366" height="731" alt="2" src="https://github.com/user-attachments/assets/e4a8078c-e5ec-4dd5-9b8f-4f16999b7271" /> | <img width="1363" height="731" alt="3" src="https://github.com/user-attachments/assets/67250011-a199-4564-b6ac-0eb0f263e219" /> |
| **Product details** | **Cart drawer** |
| <img width="1361" height="732" alt="4" src="https://github.com/user-attachments/assets/b1de3cd8-ac93-4030-9d09-7e9377e526c0" /> | <img width="1362" height="732" alt="1" src="https://github.com/user-attachments/assets/34bc7113-c63a-4fe8-99b5-828f810e6618" /> |

## ✨ Features

- **🛍️ Full storefront flow** — product listing, category pages, search, product details with specs & image galleries, wishlist, and cart (slide-out drawer + dedicated page)
- **⚡ Flash deals & countdowns** — time-limited deals with live countdown timers
- **🎨 Dual theme system** — "Midnight Luxury" (dark) and "Scandinavian Luxury" (light), toggled with a full-site circular morph transition. Persisted to `localStorage` with a no-flash bootstrap script
- **🧊 3D hero** — an interactive Three.js product sculpture whose lighting and materials adapt to the active theme
- **🎬 Cinematic motion** — Framer Motion page transitions, GSAP scroll reveals, Lenis smooth scrolling, magnetic buttons, tilt/ripple micro-interactions, and a custom mouse follower
- **🔍 Search & quick view** — instant search overlay with trending searches, plus quick-view modals from any product card
- **📦 State persistence** — cart & wishlist survive page refreshes via `localStorage`
- **⚡ Performance** — route-level code splitting (`React.lazy` + `Suspense`) and manual Vite chunking (vendor, animation, three, icons)

## 🛠 Tech Stack

| Layer | Tech |
| --- | --- |
| Framework | [React 19](https://react.dev) + [Vite 6](https://vite.dev) |
| Routing | [React Router 7](https://reactrouter.com) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com) + CSS-variable theme tokens |
| Motion | [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com), [Lenis](https://lenis.darkroom.engineering/) |
| 3D | [Three.js](https://threejs.org), [React Three Fiber](https://r3f.docs.pmnd.rs), [drei](https://github.com/pmndrs/drei) |
| Carousels | [Swiper](https://swiperjs.com) |
| State | React Context (`StoreContext`, `ThemeContext`) |

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Production build
npm run build

# 4. Preview the production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── home/        # Homepage sections (Hero, Trending, FlashDeals, Brands, …)
│   ├── layout/      # Navbar, Footer, BackgroundFX, MouseFollower, Toasts, …
│   ├── product/     # ProductCard, CartDrawer, QuickView, SearchOverlay
│   └── ui/          # MagneticButton, SectionHeading, StarRating, …
├── context/         # StoreContext (cart/wishlist) & ThemeContext (dual themes)
├── data/            # Mock products, categories, brands, reviews, deals, FAQs
├── hooks/           # useLenis, useGSAPReveal, useMagnetic, useRipple, useTilt, …
├── pages/           # One lazy-loaded page per route (Home, Products, Cart, …)
├── App.jsx          # Router + layout composition + code splitting
├── index.css        # Theme token system (CSS variables per theme)
└── main.jsx
```

## 🎨 Theme System

NEXUS ships with two complete visual identities driven entirely by CSS variables on `<html data-theme>`:

- **`midnight`** — dark luxury (Apple Dark / Nothing / Tesla cyberpunk)
- **`scandi`** — light Scandinavian luxury (Apple Light / Linear / Stripe)

Every surface, accent, shadow, glass effect, and even the 3D scene and particle background reads from these variables — so toggling the theme morphs the entire site in a circular wipe animation.

## 📄 License

This project is for demonstration purposes. You're free to use it as a reference or starting point for your own projects.

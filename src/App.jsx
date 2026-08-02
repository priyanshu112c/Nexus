import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { StoreProvider } from './context/StoreContext'
import { useLenis } from './hooks/useLenis'
import { useGSAPReveal } from './hooks/useGSAPReveal'

// Layout (always loaded)
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BackgroundFX from './components/layout/BackgroundFX'
import MouseFollower from './components/layout/MouseFollower'
import PreLoader from './components/layout/PreLoader'
import Toasts from './components/layout/Toasts'
import PageTransition from './components/layout/PageTransition'
import ThemeMorphOverlay from './components/layout/ThemeMorphOverlay'

// Product overlays
import CartDrawer from './components/product/CartDrawer'
import SearchOverlay from './components/product/SearchOverlay'
import QuickView from './components/product/QuickView'

// Code-splitting: each page is a separate chunk for performance
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'))
const Deals = lazy(() => import('./pages/Deals'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Cart = lazy(() => import('./pages/Cart'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Cinematic page-loading fallback
function PageLoader() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
            <div className="w-12 h-12 rounded-full border-2 border-ink/10 border-t-neon animate-spin" />
            <p className="text-ink/30 text-sm tracking-widest uppercase font-display">
                Reticulating splines
            </p>
        </div>
    )
}

function ScrollToTop() {
    const { pathname, search } = useLocation()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [pathname, search])
    return null
}

function AppContent() {
    const location = useLocation()

    // Smooth scroll + reveal animations
    useLenis()
    useGSAPReveal()

    return (
        <div className="relative min-h-screen text-ink bg-noir overflow-x-clip">
            <BackgroundFX />
            <MouseFollower />
            <PreLoader />
            <ThemeMorphOverlay />

            <ScrollToTop />

            {/* Floating overlays */}
            <CartDrawer />
            <SearchOverlay />
            <QuickView />

            <Navbar />

            <main className="relative z-10">
                <Suspense fallback={<PageLoader />}>
                    <AnimatePresence mode="wait" initial={false}>
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                            <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
                            <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
                            <Route path="/categories" element={<PageTransition><CategoriesPage /></PageTransition>} />
                            <Route path="/deals" element={<PageTransition><Deals /></PageTransition>} />
                            <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
                            <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
                            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                            <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
                            <Route path="/search" element={<PageTransition><SearchPage /></PageTransition>} />
                            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                        </Routes>
                    </AnimatePresence>
                </Suspense>
            </main>

            <Footer />

            <Toasts />
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <StoreProvider>
                <AppContent />
            </StoreProvider>
        </BrowserRouter>
    )
}
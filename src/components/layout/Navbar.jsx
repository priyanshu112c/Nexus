import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiSun, FiMoon, FiChevronDown, FiMenu, FiX, FiBell, FiCpu, FiHeadphones, FiMonitor, FiSmartphone, FiWatch, FiGrid, FiShoppingBag as FiBag } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import { useTheme } from '../../context/ThemeContext'
import { categories } from '../../data'
import { useMagnetic } from '../../hooks/useMagnetic'

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Categories', to: '/categories', hasMega: true },
    { label: 'Deals', to: '/deals' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' }
]

const categoryIcons = {
    laptops: FiCpu,
    headphones: FiHeadphones,
    gaming: FiGrid,
    monitors: FiMonitor,
    phones: FiSmartphone,
    wearables: FiWatch
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [megaOpen, setMegaOpen] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileCatsOpen, setMobileCatsOpen] = useState(false)
    const [profileHover, setProfileHover] = useState(false)
    const [bellPulse, setBellPulse] = useState(false)
    const { setCartOpen, setSearchOpen, cartCount, wishlist } = useStore()
    const { theme, toggleTheme } = useTheme()
    const { ref: cartBtnRef, onMouseMove: cartBtnMove, onMouseLeave: cartBtnLeave } = useMagnetic(0.3)
    const megaRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const onCLick = (e) => {
            if (megaRef.current && !megaRef.current.contains(e.target)) {
                setMegaOpen(false)
            }
        }
        document.addEventListener('click', onCLick)
        return () => document.removeEventListener('click', onCLick)
    }, [])

    useEffect(() => {
        const t = setTimeout(() => setBellPulse(true), 6000)
        const t2 = setTimeout(() => setBellPulse(false), 6800)
        return () => { clearTimeout(t); clearTimeout(t2) }
    }, [bellPulse])

    // Close mobile drawer + mega menu on route change
    useEffect(() => {
        setMobileOpen(false)
        setMegaOpen(false)
    }, [location.pathname, location.search])

    // Close mobile drawer when resizing to desktop width
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileOpen(false)
                setMegaOpen(false)
            }
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    // Close mobile drawer on Escape key
    useEffect(() => {
        if (!mobileOpen) return
        const onKey = (e) => {
            if (e.key === 'Escape') setMobileOpen(false)
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [mobileOpen])

    // Lock body scroll while the mobile drawer is open
    useEffect(() => {
        if (!mobileOpen) return
        const original = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = original }
    }, [mobileOpen])

    return (
        <>
            {/* Top announcement bar */}
            <div className="fixed top-0 inset-x-0 z-[70] h-9 bg-gradient-to-r from-neon/20 via-neon-purple/20 to-neon/20 backdrop-blur-xl border-b border-ink/5 flex items-center justify-center gap-2 text-xs px-4 overflow-hidden">
                <span className="inline-block w-2 h-2 rounded-full bg-neon animate-pulse-glow shrink-0" />
                <span className="tracking-wide text-ink/80 truncate">Summer Tech Festival — Up to 40% off flagship devices</span>
                <Link to="/deals" className="text-neon-light hover:underline hidden sm:inline shrink-0">Shop now</Link>
            </div>

            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-9 inset-x-0 z-[80] transition-all duration-500 ${scrolled ? 'glass-strong py-2.5 shadow-card' : 'bg-transparent py-5'
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group shrink-0" data-hover>
                        <div className="relative">
                            <svg width="34" height="34" viewBox="0 0 100 100" fill="none" className="transition-transform duration-500 group-hover:rotate-90">
                                <defs>
                                    <linearGradient id="navGrad" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#4d9fff" />
                                        <stop offset="100%" stopColor="#8b5cf6" />
                                    </linearGradient>
                                </defs>
                                <path d="M25 55 L47 33 L57 43 L35 65 Z" fill="url(#navGrad)" />
                                <path d="M43 55 L60 38 L70 48 L53 65 Z" fill="url(#navGrad)" opacity="0.7" />
                            </svg>
                        </div>
                        <span className="hidden sm:inline font-display font-bold text-xl tracking-[0.25em] uppercase">
                            Nex<span className="text-gradient">us</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) =>
                            link.hasMega ? (
                                <div key={link.label} ref={megaRef} className="relative">
                                    <button
                                        onClick={() => setMegaOpen((v) => !v)}
                                        className={`nav-link px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-1.5 ${megaOpen ? 'text-ink bg-ink/5' : 'text-ink/60 hover:text-ink'
                                            }`}
                                        data-hover
                                    >
                                        {link.label}
                                        <FiChevronDown className={`transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`} size={14} />
                                    </button>
                                </div>
                            ) : (
                                <NavLink
                                    key={link.label}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `nav-link relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'
                                        }`
                                    }
                                    data-hover
                                >
                                    {({ isActive }) => (
                                        <>
                                            {link.label}
                                            <span className={`absolute left-4 -bottom-0.5 h-px bg-gradient-to-r from-neon to-neon-purple transition-all duration-300 ${isActive ? 'w-[calc(100%-2rem)]' : 'w-0'
                                                }`} />
                                        </>
                                    )}
                                </NavLink>
                            )
                        )}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5">
                        {/* Search */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="w-10 h-10 rounded-full glass flex items-center justify-center text-ink/70 hover:text-ink hover:border-neon/40 transition-all duration-300 hover:shadow-glow"
                            aria-label="Search"
                            data-hover
                        >
                            <FiSearch size={17} />
                        </button>

                        {/* Profile */}
                        <div className="relative hidden md:block" onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)}>
                            <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-ink/70 hover:text-ink transition-colors duration-300" aria-label="Account" data-hover>
                                <FiUser size={17} />
                            </button>
                            <AnimatePresence>
                                {profileHover && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-12 w-52 glass-strong rounded-2xl p-2 shadow-card"
                                    >
                                        <div className="px-4 py-3 border-b border-ink/5">
                                            <p className="text-sm font-medium">Guest User</p>
                                            <p className="text-xs text-ink/40">Demo account</p>
                                        </div>
                                        {['My Orders', 'Addresses', 'Settings'].map((item) => (
                                            <button key={item} className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors">
                                                {item}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Notifications */}
                        <button className="relative hidden md:flex w-10 h-10 rounded-full glass items-center justify-center text-ink/70 hover:text-ink transition-colors duration-300" aria-label="Notifications" data-hover>
                            <FiBell className={`${bellPulse ? 'text-neon-light' : ''}`} size={17} />
                            <span className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-neon ${bellPulse ? 'animate-ping' : ''}`} />
                        </button>

                        {/* Theme toggle — animated sun ↔ moon morph */}
                        <button
                            onClick={toggleTheme}
                            className="relative hidden sm:flex w-10 h-10 rounded-full glass items-center justify-center text-ink/70 hover:text-ink hover:shadow-glow transition-all duration-300 overflow-hidden"
                            aria-label="Toggle theme"
                            data-hover
                        >
                            {/* Orbital glow that morphs with the theme */}
                            <motion.span
                                className="absolute inset-0 rounded-full"
                                animate={{
                                    background:
                                        theme === 'midnight'
                                            ? 'radial-gradient(circle at 50% 50%, rgba(77,159,255,0.35), transparent 70%)'
                                            : 'radial-gradient(circle at 50% 50%, rgba(255,200,87,0.3), transparent 70%)'
                                }}
                                transition={{ duration: 0.6 }}
                            />
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={theme}
                                    initial={{ rotate: -180, scale: 0.4, opacity: 0 }}
                                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                    exit={{ rotate: 180, scale: 0.4, opacity: 0 }}
                                    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                                    className="relative z-10"
                                >
                                    {theme === 'midnight' ? <FiSun size={17} /> : <FiMoon size={17} />}
                                </motion.span>
                            </AnimatePresence>
                        </button>

                        {/* Wishlist */}
                        <Link
                            to="/wishlist"
                            className="relative w-10 h-10 rounded-full glass flex items-center justify-center text-ink/70 hover:text-ink transition-colors duration-300"
                            aria-label="Wishlist"
                            data-hover
                        >
                            <FiHeart size={17} />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[1.125rem] px-1 rounded-full bg-gradient-to-r from-neon to-neon-purple text-[10px] font-bold flex items-center justify-center shadow-glow">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        {/* Cart */}
                        <button
                            ref={cartBtnRef}
                            onClick={() => setCartOpen(true)}
                            onMouseMove={cartBtnMove}
                            onMouseLeave={cartBtnLeave}
                            className="relative w-11 h-11 rounded-full bg-gradient-to-r from-neon to-neon-purple flex items-center justify-center text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                            aria-label="Cart"
                            data-hover
                        >
                            <FiShoppingBag className="relative z-10" size={17} />
                            <AnimatePresence>
                                {cartCount > 0 && (
                                    <motion.span
                                        key={cartCount}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-ink text-night text-[10px] font-bold flex items-center justify-center"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setMobileOpen((v) => !v)}
                            className="lg:hidden w-10 h-10 rounded-full glass flex items-center justify-center text-ink/70"
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                            data-hover
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={mobileOpen ? 'close' : 'open'}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center justify-center"
                                >
                                    {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                                </motion.span>
                            </AnimatePresence>
                        </button>
                    </div>
                </div>

                {/* Mega menu */}
                <AnimatePresence>
                    {megaOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] max-w-[90vw] glass-strong rounded-3xl shadow-card mt-3 p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="grid grid-cols-3 gap-3">
                                {categories.map((cat) => {
                                    const Icon = categoryIcons[cat.id] || FiBag
                                    return (
                                        <Link
                                            key={cat.id}
                                            to={`/products?category=${cat.id}`}
                                            onClick={() => setMegaOpen(false)}
                                            className="group flex items-center gap-3 p-4 rounded-2xl bg-ink/[0.02] hover:bg-ink/[0.06] border border-transparent hover:border-neon/20 transition-all duration-300"
                                            data-hover
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon/20 to-neon-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <Icon className="text-neon-light" size={19} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium group-hover:text-neon-light transition-colors">{cat.name}</p>
                                                <p className="text-xs text-ink/40">{cat.count} products</p>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                            <div className="mt-4 pt-4 border-t border-ink/5 flex items-center justify-between">
                                <span className="text-xs text-ink/40">Explore all technology</span>
                                <Link
                                    to="/categories"
                                    onClick={() => setMegaOpen(false)}
                                    className="text-sm text-neon-light flex items-center gap-1 hover:gap-2 transition-all duration-300"
                                >
                                    All Categories <span>→</span>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* ===== Mobile drawer (rendered outside <header> so the
                   backdrop-blur / transform on the header can't trap it) ===== */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 z-[90] bg-night/60 backdrop-blur-md lg:hidden"
                            aria-hidden="true"
                        />

                        {/* Drawer panel */}
                        <motion.aside
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                            className="fixed top-0 right-0 bottom-0 z-[95] w-full max-w-[400px] glass-strong flex flex-col lg:hidden shadow-2xl"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                        >
                            {/* Drawer header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/5 shrink-0">
                                <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5" data-hover>
                                    <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
                                        <defs>
                                            <linearGradient id="drawerGrad" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#4d9fff" />
                                                <stop offset="100%" stopColor="#8b5cf6" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M25 55 L47 33 L57 43 L35 65 Z" fill="url(#drawerGrad)" />
                                        <path d="M43 55 L60 38 L70 48 L53 65 Z" fill="url(#drawerGrad)" opacity="0.7" />
                                    </svg>
                                    <span className="font-display font-bold text-lg tracking-[0.25em] uppercase">
                                        Nex<span className="text-gradient">us</span>
                                    </span>
                                </Link>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-ink/70 hover:text-ink hover:border-neon/40 transition-all duration-300"
                                    aria-label="Close menu"
                                    data-hover
                                >
                                    <FiX size={18} />
                                </button>
                            </div>

                            {/* Scrollable content */}
                            <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6">
                                {/* Primary nav links */}
                                <div className="flex flex-col gap-1">
                                    {navLinks.map((link) => (
                                        <NavLink
                                            key={link.label}
                                            to={link.to}
                                            onClick={() => setMobileOpen(false)}
                                            className={({ isActive }) =>
                                                `px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${isActive ? 'bg-ink/5 text-ink' : 'text-ink/60 hover:text-ink hover:bg-ink/5'
                                                }`
                                            }
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    {link.label}
                                                    {isActive && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-neon to-neon-purple" />
                                                    )}
                                                </>
                                            )}
                                        </NavLink>
                                    ))}
                                </div>

                                {/* Categories accordion */}
                                <div className="mt-6">
                                    <button
                                        onClick={() => setMobileCatsOpen((v) => !v)}
                                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors"
                                        aria-expanded={mobileCatsOpen}
                                    >
                                        <span>Categories</span>
                                        <motion.span
                                            animate={{ rotate: mobileCatsOpen ? 180 : 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="flex items-center justify-center"
                                        >
                                            <FiChevronDown size={16} />
                                        </motion.span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {mobileCatsOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-2 pt-2 pb-1 flex flex-col gap-1">
                                                    {categories.map((cat) => {
                                                        const Icon = categoryIcons[cat.id] || FiBag
                                                        return (
                                                            <Link
                                                                key={cat.id}
                                                                to={`/products?category=${cat.id}`}
                                                                onClick={() => setMobileOpen(false)}
                                                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors"
                                                                data-hover
                                                            >
                                                                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon/20 to-neon-purple/20 flex items-center justify-center shrink-0">
                                                                    <Icon className="text-neon-light" size={15} />
                                                                </span>
                                                                {cat.name}
                                                                <span className="ml-auto text-xs text-ink/30">{cat.count}</span>
                                                            </Link>
                                                        )
                                                    })}
                                                    <Link
                                                        to="/categories"
                                                        onClick={() => setMobileOpen(false)}
                                                        className="px-4 py-2.5 text-sm text-neon-light hover:underline mt-1"
                                                    >
                                                        All Categories →
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Account section */}
                                <div className="mt-6 pt-6 border-t border-ink/5">
                                    <div className="px-4 pb-2 flex items-center gap-3">
                                        <span className="w-10 h-10 rounded-full bg-gradient-to-br from-neon/20 to-neon-purple/20 flex items-center justify-center">
                                            <FiUser size={16} className="text-neon-light" />
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium">Guest User</p>
                                            <p className="text-xs text-ink/40">Demo account</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 mt-2">
                                        {['My Orders', 'Addresses', 'Settings'].map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => setMobileOpen(false)}
                                                className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Drawer footer — theme + cart + wishlist quick actions */}
                            <div className="px-6 py-5 border-t border-ink/5 shrink-0">
                                <div className="flex items-center justify-between gap-2">
                                    <button
                                        onClick={toggleTheme}
                                        className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl glass text-ink/70 hover:text-ink transition-colors duration-300"
                                        data-hover
                                    >
                                        {theme === 'midnight' ? <FiSun size={15} /> : <FiMoon size={15} />}
                                        <span className="text-xs font-medium">{theme === 'midnight' ? 'Light mode' : 'Dark mode'}</span>
                                    </button>
                                    <Link
                                        to="/wishlist"
                                        onClick={() => setMobileOpen(false)}
                                        className="relative flex-1 flex items-center justify-center gap-2 h-11 rounded-xl glass text-ink/70 hover:text-ink transition-colors duration-300"
                                        data-hover
                                    >
                                        <FiHeart size={15} />
                                        <span className="text-xs font-medium">Wishlist</span>
                                        {wishlist.length > 0 && (
                                            <span className="absolute top-1 right-2 min-w-[1.125rem] h-4.5 px-1 rounded-full bg-gradient-to-r from-neon to-neon-purple text-[10px] font-bold flex items-center justify-center">
                                                {wishlist.length}
                                            </span>
                                        )}
                                    </Link>
                                    <button
                                        onClick={() => { setCartOpen(true); setMobileOpen(false) }}
                                        className="relative flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-gradient-to-r from-neon to-neon-purple text-ink font-medium"
                                        data-hover
                                    >
                                        <FiShoppingBag size={15} />
                                        <span className="text-xs font-medium">Cart</span>
                                        {cartCount > 0 && (
                                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-ink text-night text-[10px] font-bold flex items-center justify-center">
                                                {cartCount}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiTrendingUp, FiClock, FiX, FiArrowRight, FiCpu, FiHeadphones, FiMonitor, FiSmartphone, FiWatch, FiGrid } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import { products, trendingSearches, categories } from '../../data'

const categoryIcons = {
    laptops: FiCpu,
    headphones: FiHeadphones,
    gaming: FiGrid,
    monitors: FiMonitor,
    phones: FiSmartphone,
    wearables: FiWatch
}

export default function SearchOverlay() {
    const { searchOpen, setSearchOpen } = useStore()
    const [query, setQuery] = useState('')
    const [recent, setRecent] = useState(['Aura Pro', 'OLED Monitor'])
    const inputRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (searchOpen) {
            setTimeout(() => inputRef.current?.focus(), 150)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [searchOpen])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setSearchOpen(false)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [setSearchOpen])

    const results = query
        ? products
            .filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 6)
        : []

    const submit = (e) => {
        e.preventDefault()
        if (query.trim()) {
            setRecent(prev => [query, ...prev.filter(r => r.toLowerCase() !== query.toLowerCase())].slice(0, 4))
            setSearchOpen(false)
            navigate(`/products?q=${encodeURIComponent(query)}`)
        }
    }

    const search = (term) => {
        setQuery(term)
        setSearchOpen(false)
        navigate(`/products?q=${encodeURIComponent(term)}`)
    }

    return (
        <AnimatePresence>
            {searchOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[140] bg-noir/80 backdrop-blur-2xl"
                    onClick={() => setSearchOpen(false)}
                >
                    <motion.div
                        initial={{ y: -40, opacity: 0, filter: 'blur(8px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: -40, opacity: 0, filter: 'blur(8px)' }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search bar */}
                        <form onSubmit={submit} className="relative">
                            <FiSearch className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-neon-light" size={18} />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search the future of technology..."
                                className="w-full bg-ink/[0.04] border border-ink/10 rounded-xl sm:rounded-2xl py-3.5 sm:py-5 pl-11 sm:pl-14 pr-12 sm:pr-14 text-sm sm:text-lg placeholder:text-ink/30 focus:outline-none focus:border-neon/50 focus:shadow-glow transition-all duration-300 backdrop-blur-xl"
                            />
                            <button
                                type="button"
                                onClick={() => setSearchOpen(false)}
                                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full glass flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
                                aria-label="Close search"
                            >
                                <FiX size={15} />
                            </button>
                        </form>

                        {/* Content area */}
                        <div className="mt-6 sm:mt-8">
                            {(query && results.length > 0) && (
                                <>
                                    {/* Live results */}
                                    <p className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-3 sm:mb-4">Live Results</p>
                                    <div className="space-y-2 mb-6 sm:mb-8">
                                        {results.map((p) => (
                                            <Link
                                                key={p.id}
                                                to={`/product/${p.id}`}
                                                onClick={() => setSearchOpen(false)}
                                                className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl glass hover:border-neon/30 hover:shadow-glow transition-all duration-300 group"
                                            >
                                                <img src={p.image} alt={p.name} className="w-11 h-11 sm:w-14 sm:h-14 object-cover rounded-lg sm:rounded-xl" loading="lazy" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs sm:text-sm font-medium truncate group-hover:text-neon-light transition-colors">{p.name}</p>
                                                    <p className="text-[10px] sm:text-xs text-ink/40">{p.brand} · {p.category}</p>
                                                </div>
                                                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                                                    <span className="font-display text-xs sm:text-sm font-bold text-gradient-static">${p.price.toLocaleString()}</span>
                                                    <FiArrowRight className="text-ink/30 group-hover:text-neon-light group-hover:translate-x-1 transition-all duration-300" size={14} />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Category chips */}
                            <p className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-3 sm:mb-4">Categories</p>
                            <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-8">
                                {categories.map((cat) => {
                                    const Icon = categoryIcons[cat.id] || FiGrid
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => {
                                                setSearchOpen(false)
                                                navigate(`/products?category=${cat.id}`)
                                            }}
                                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full glass text-xs sm:text-sm text-ink/60 hover:text-ink hover:border-neon/40 hover:shadow-glow transition-all duration-300"
                                            data-hover
                                        >
                                            <Icon size={12} className="text-neon-light/70" />
                                            {cat.name}
                                        </button>
                                    )
                                })}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                                {/* Trending */}
                                <div>
                                    <p className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-4 flex items-center gap-2">
                                        <FiTrendingUp className="text-neon-light" size={14} /> Trending
                                    </p>
                                    <div className="flex flex-wrap gap-2.5">
                                        {trendingSearches.map((term, i) => (
                                            <button
                                                key={term}
                                                onClick={() => search(term)}
                                                className="px-4 py-2 rounded-full bg-ink/[0.03] border border-ink/5 text-sm text-ink/60 hover:border-neon/30 hover:text-neon-light hover:shadow-glow transition-all duration-300"
                                                data-hover
                                            >
                                                #{i + 1} {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent */}
                                <div>
                                    <p className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-4 flex items-center gap-2">
                                        <FiClock className="text-neon-purple" size={14} /> Recent
                                    </p>
                                    <div className="flex flex-wrap gap-2.5">
                                        {recent.map((term) => (
                                            <button
                                                key={term}
                                                onClick={() => search(term)}
                                                className="px-4 py-2 rounded-full bg-ink/[0.03] border border-ink/5 text-sm text-ink/60 hover:border-neon-purple/30 hover:text-neon-purple-light hover:shadow-glow-purple transition-all duration-300"
                                                data-hover
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
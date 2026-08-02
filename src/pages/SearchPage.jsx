import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiArrowRight, FiTrendingUp, FiX } from 'react-icons/fi'
import { products, categories, trendingSearches } from '../data'
import { useStore } from '../context/StoreContext'

export default function SearchPage() {
    const [query, setQuery] = useState('')
    const { addToast } = useStore()

    const results = useMemo(() => {
        if (!query.trim()) return []
        const q = query.toLowerCase()
        return products.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
        )
    }, [query])

    const handleSearch = () => {
        if (results.length > 0) {
            addToast(`Found ${results.length} product${results.length > 1 ? 's' : ''} for "${query}"`, 'success')
        } else {
            addToast(`No results for "${query}" — try another search`, 'error')
        }
    }

    return (
        <div className="max-w-[1000px] mx-auto px-6 pt-40 pb-20">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-8">
                Search The <span className="text-gradient">Universe</span>
            </h1>

            {/* Search bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative glass-strong rounded-full p-2 pl-6 flex items-center gap-3 mb-8"
            >
                <FiSearch className="text-neon-light shrink-0" size={20} />
                <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search laptops, headphones, monitors..."
                    className="flex-1 bg-transparent py-3 text-sm placeholder:text-ink/25 focus:outline-none min-w-0"
                />
                {query && (
                    <button
                        onClick={() => setQuery('')}
                        className="w-9 h-9 rounded-full glass flex items-center justify-center text-ink/50 hover:text-ink transition-colors shrink-0"
                        aria-label="Clear search"
                    >
                        <FiX size={14} />
                    </button>
                )}
                <button
                    onClick={handleSearch}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-neon to-neon-purple text-sm font-semibold text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300 shrink-0"
                    data-hover
                >
                    Search
                </button>
            </motion.div>

            {/* Trending searches */}
            {!query && (
                <div className="mb-10">
                    <p className="flex items-center gap-2 text-xs text-ink/40 mb-4">
                        <FiTrendingUp className="text-neon-light" /> Trending Searches
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                        {trendingSearches.map((term, i) => (
                            <motion.button
                                key={term}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => setQuery(term)}
                                className="px-4 py-2 rounded-full glass text-sm text-ink/60 hover:text-ink hover:border-neon/40 transition-all duration-300"
                                data-hover
                            >
                                {term}
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}

            {/* Category chips */}
            {!query && (
                <div className="mb-10">
                    <p className="text-xs text-ink/40 mb-4">Browse Categories</p>
                    <div className="flex flex-wrap gap-2.5">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/products?category=${cat.id}`}
                                className="px-5 py-2.5 rounded-full glass text-sm text-ink/60 hover:text-ink hover:border-neon/40 transition-all duration-300"
                                data-hover
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Results */}
            {query && results.length === 0 && (
                <div className="text-center py-12 glass-strong rounded-3xl">
                    <h3 className="font-display text-xl font-bold mb-2">No results found</h3>
                    <p className="text-sm text-ink/40 mb-6">We couldn't find anything matching "{query}"</p>
                    <button
                        onClick={() => setQuery('')}
                        className="px-6 py-3 rounded-full glass text-sm text-ink/70 hover:text-ink transition-colors"
                    >
                        Clear Search
                    </button>
                </div>
            )}

            {/* Results grid */}
            {query && results.length > 0 && (
                <div>
                    <p className="text-xs text-ink/40 mb-5">{results.length} result{results.length > 1 ? 's' : ''} found</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {results.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <Link
                                    to={`/product/${product.id}`}
                                    className="group glass rounded-3xl overflow-hidden hover:border-neon/20 hover:shadow-glow transition-all duration-500 block"
                                    data-hover
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent" />
                                        <span className="absolute top-3 left-4 text-[10px] uppercase tracking-widest text-ink/70 bg-night/30 px-3 py-1 rounded-full backdrop-blur-xl border border-ink/10">
                                            {product.brand}
                                        </span>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-display font-semibold mb-1 group-hover:text-neon-light transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="font-display text-xl font-bold text-gradient-static">
                                                ${product.price.toLocaleString()}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-neon-light opacity-0 group-hover:opacity-100 transition-opacity">
                                                View <FiArrowRight size={12} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
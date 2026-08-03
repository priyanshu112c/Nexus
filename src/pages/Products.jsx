import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiSliders, FiArrowDown, FiX, FiCpu, FiHeadphones, FiGrid, FiMonitor, FiSmartphone, FiWatch } from 'react-icons/fi'
import { products as allProducts, categories } from '../data'
import ProductCard from '../components/product/ProductCard'
import { SectionHeading } from '../components/ui'

const categoryIcons = {
    laptops: FiCpu,
    headphones: FiHeadphones,
    gaming: FiGrid,
    monitors: FiMonitor,
    phones: FiSmartphone,
    wearables: FiWatch
}

const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Top Rated', value: 'rating' },
    { label: 'Most Reviewed', value: 'reviews' },
    { label: 'Newest', value: 'newest' }
]

const brandOptions = ['NEXUS', 'SONA', 'KEYFORT', 'AERO', 'VANTA']

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams()
    const activeCategory = searchParams.get('category') || 'all'
    const searchQuery = searchParams.get('q') || ''

    const [sort, setSort] = useState('featured')
    const [priceRange, setPriceRange] = useState([0, 5000])
    const [selectedBrands, setSelectedBrands] = useState([])
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    // Reset filters when category changes
    useEffect(() => {
        setSelectedBrands([])
        setPriceRange([0, 5000])
        setSort('featured')
    }, [activeCategory])

    const filtered = useMemo(() => {
        let results = [...allProducts]

        if (activeCategory !== 'all') {
            results = results.filter((p) => p.category === activeCategory)
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase()
            results = results.filter(
                (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
            )
        }

        results = results.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

        if (selectedBrands.length > 0) {
            results = results.filter((p) => selectedBrands.includes(p.brand))
        }

        switch (sort) {
            case 'price-asc':
                results.sort((a, b) => a.price - b.price)
                break
            case 'price-desc':
                results.sort((a, b) => b.price - a.price)
                break
            case 'rating':
                results.sort((a, b) => b.rating - a.rating)
                break
            case 'reviews':
                results.sort((a, b) => b.reviews - a.reviews)
                break
            case 'newest':
                results.sort((a, b) => b.id - a.id)
                break
            default:
                results.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0))
        }

        return results
    }, [activeCategory, searchQuery, sort, priceRange, selectedBrands])

    const setCategory = (id) => {
        if (id === 'all') {
            setSearchParams({})
        } else {
            setSearchParams({ category: id })
        }
    }

    const toggleBrand = (brand) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        )
    }

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-28 sm:pt-40 pb-20">
            <SectionHeading
                eyebrow="The Collection"
                title={searchQuery ? `Results for “${searchQuery}”` : 'Explore All Products'}
                subtitle={searchQuery
                    ? `${filtered.length} products matching your search across the NEXUS universe.`
                    : 'Every flagship device, meticulously curated and ready for a new home.'}
            />

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-8">
                <button
                    onClick={() => setCategory('all')}
                    className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all duration-300 ${activeCategory === 'all'
                        ? 'bg-gradient-to-r from-neon to-neon-purple text-ink shadow-glow'
                        : 'glass text-ink/60 hover:text-ink hover:border-neon/40'
                        }`}
                    data-hover
                >
                    All
                </button>
                {categories.map((cat) => {
                    const Icon = categoryIcons[cat.id] || FiGrid
                    const active = activeCategory === cat.id
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all duration-300 ${active
                                ? 'bg-gradient-to-r from-neon to-neon-purple text-ink shadow-glow'
                                : 'glass text-ink/60 hover:text-ink hover:border-neon/40'
                                }`}
                            data-hover
                        >
                            <Icon size={12} />
                            {cat.name}
                        </button>
                    )
                })}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                <p className="text-xs sm:text-sm text-ink/40">
                    Showing <span className="text-ink font-semibold">{filtered.length}</span> products
                </p>
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Sort */}
                    <div className="relative hidden md:block">
                        <FiArrowDown className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40 z-10" size={13} />
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="appearance-none glass rounded-full pl-10 pr-10 py-2.5 text-sm text-ink/70 focus:outline-none focus:border-neon/40 cursor-pointer hover:border-neon/40 transition-colors"
                        >
                            {sortOptions.map((opt) => (
                                <option key={opt.value} value={opt.value} className="bg-noir">
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={() => setMobileFiltersOpen((v) => !v)}
                        className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center text-ink/70"
                        aria-label="Toggle filters"
                    >
                        <FiSliders size={14} />
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
                {/* Mobile filter overlay */}
                {mobileFiltersOpen && (
                    <div className="fixed inset-0 z-[120] lg:hidden">
                        <div
                            className="absolute inset-0 bg-night/70 backdrop-blur-md"
                            onClick={() => setMobileFiltersOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-noir-900 border-r border-ink/10 overflow-y-auto"
                        >
                            <div className="p-4 sm:p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-display font-semibold flex items-center gap-2">
                                        <FiSliders className="text-neon-light" size={16} /> Filters
                                    </h3>
                                    <button
                                        onClick={() => setMobileFiltersOpen(false)}
                                        className="w-9 h-9 rounded-full glass flex items-center justify-center text-ink/60 hover:text-ink"
                                        aria-label="Close filters"
                                    >
                                        <FiX size={16} />
                                    </button>
                                </div>

                                {/* Price range */}
                                <div className="mb-6">
                                    <h4 className="text-xs font-semibold tracking-widest uppercase text-ink/50 mb-4">Price Range</h4>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs text-ink/40">${priceRange[0].toLocaleString()}</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="5000"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                            className="flex-1 accent-neon"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-ink/40">${priceRange[1].toLocaleString()}</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="5000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            className="flex-1 accent-neon"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-2 text-xs text-ink/50">
                                        <span>${priceRange[0].toLocaleString()}</span>
                                        <span>${priceRange[1].toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Brands */}
                                <div>
                                    <h4 className="text-xs font-semibold tracking-widest uppercase text-ink/50 mb-4">Brands</h4>
                                    <div className="space-y-3">
                                        {brandOptions.map((brand) => (
                                            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                                <button
                                                    onClick={() => toggleBrand(brand)}
                                                    className={`w-5 h-5 rounded-md border transition-all duration-300 flex items-center justify-center ${selectedBrands.includes(brand)
                                                        ? 'bg-gradient-to-r from-neon to-neon-purple border-transparent'
                                                        : 'border-ink/20 group-hover:border-neon/40'
                                                        }`}
                                                    aria-label={`Filter by ${brand}`}
                                                >
                                                    {selectedBrands.includes(brand) && (
                                                        <motion.span
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="text-ink text-[10px] font-bold"
                                                        >
                                                            ✓
                                                        </motion.span>
                                                    )}
                                                </button>
                                                <span className="text-sm text-ink/60 group-hover:text-ink transition-colors">{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedBrands([])
                                        setPriceRange([0, 5000])
                                    }}
                                    className="w-full mt-6 py-3 rounded-full glass text-sm text-ink/60 hover:text-ink transition-colors"
                                >
                                    Reset all
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Sidebar filters (desktop) */}
                <aside className="hidden lg:block">
                    <div className="glass rounded-3xl p-6 sticky top-32">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-display font-semibold flex items-center gap-2">
                                <FiSliders className="text-neon-light" size={16} /> Filters
                            </h3>
                            <button
                                onClick={() => {
                                    setSelectedBrands([])
                                    setPriceRange([0, 5000])
                                }}
                                className="text-xs text-ink/40 hover:text-neon-light transition-colors"
                            >
                                Reset all
                            </button>
                        </div>

                        {/* Price range */}
                        <div className="mb-8">
                            <h4 className="text-xs font-semibold tracking-widest uppercase text-ink/50 mb-4">Price Range</h4>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-xs text-ink/40">${priceRange[0].toLocaleString()}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                    className="flex-1 accent-neon"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-ink/40">${priceRange[1].toLocaleString()}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    className="flex-1 accent-neon"
                                />
                            </div>
                            <div className="flex items-center justify-between mt-2 text-xs text-ink/50">
                                <span>${priceRange[0].toLocaleString()}</span>
                                <span>${priceRange[1].toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Brands */}
                        <div>
                            <h4 className="text-xs font-semibold tracking-widest uppercase text-ink/50 mb-4">Brands</h4>
                            <div className="space-y-3">
                                {brandOptions.map((brand) => (
                                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                        <button
                                            onClick={() => toggleBrand(brand)}
                                            className={`w-5 h-5 rounded-md border transition-all duration-300 flex items-center justify-center ${selectedBrands.includes(brand)
                                                ? 'bg-gradient-to-r from-neon to-neon-purple border-transparent'
                                                : 'border-ink/20 group-hover:border-neon/40'
                                                }`}
                                            aria-label={`Filter by ${brand}`}
                                        >
                                            {selectedBrands.includes(brand) && (
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="text-ink text-[10px] font-bold"
                                                >
                                                    ✓
                                                </motion.span>
                                            )}
                                        </button>
                                        <span className="text-sm text-ink/60 group-hover:text-ink transition-colors">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Products grid */}
                <div>
                    <AnimatePresence mode="popLayout">
                        {filtered.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-24"
                            >
                                <div className="w-20 h-20 rounded-full glass flex items-center justify-center mx-auto mb-6">
                                    <FiSearch className="text-ink/30" size={28} />
                                </div>
                                <h3 className="font-display text-2xl font-bold mb-2">No products found</h3>
                                <p className="text-ink/40 mb-8">Try adjusting your filters or search terms.</p>
                                <button
                                    onClick={() => {
                                        setSelectedBrands([])
                                        setPriceRange([0, 5000])
                                        setSearchParams({})
                                    }}
                                    className="px-6 py-3 rounded-full bg-gradient-to-r from-neon to-neon-purple text-sm font-semibold text-ink shadow-glow"
                                >
                                    Clear All Filters
                                </button>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                                {filtered.map((product, i) => (
                                    <ProductCard key={product.id} product={product} index={i} />
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingBag, FiTruck, FiShield, FiRefreshCw, FiPlus, FiMinus, FiCpu } from 'react-icons/fi'
import { products } from '../data'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/product/ProductCard'
import { StarRating } from '../components/ui'

export default function ProductDetails() {
    const { id } = useParams()
    const product = products.find((p) => p.id === Number(id))
    const { addToCart, toggleWishlist, isInWishlist, setCartOpen } = useStore()

    const [activeImage, setActiveImage] = useState(0)
    const [qty, setQty] = useState(1)
    const [zoom, setZoom] = useState(false)
    const [selectedColor, setSelectedColor] = useState(0)

    useEffect(() => {
        setActiveImage(0)
        setQty(1)
        setZoom(false)
        setSelectedColor(0)
    }, [id])

    if (!product) {
        return (
            <div className="max-w-[1400px] mx-auto px-6 pt-40 pb-20 text-center">
                <h1 className="font-display text-4xl font-bold mb-4">Product Not Found</h1>
                <p className="text-ink/40 mb-8">This product may have been discontinued.</p>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-neon to-neon-purple text-sm font-semibold text-ink shadow-glow"
                >
                    Back to Products
                </Link>
            </div>
        )
    }

    const inWishlist = isInWishlist(product.id)
    const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

    const handleAddToCart = () => {
        addToCart(product, qty)
        setCartOpen(true)
    }

    return (
        <div className="max-w-[1400px] mx-auto px-6 pt-36 pb-20">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-ink/40 mb-8">
                <Link to="/" className="hover:text-neon-light transition-colors">Home</Link>
                <span>/</span>
                <Link to={`/products?category=${product.category}`} className="hover:text-neon-light transition-colors capitalize">{product.category}</Link>
                <span>/</span>
                <span className="text-ink/70">{product.name}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Gallery */}
                <div className="sticky top-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className={`relative overflow-hidden rounded-[2rem] gradient-border aspect-square mb-4 cursor-zoom-in ${zoom ? 'cursor-zoom-out' : ''}`}
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            const x = ((e.clientX - rect.left) / rect.width) * 100
                            const y = ((e.clientY - rect.top) / rect.height) * 100
                            e.currentTarget.style.transformOrigin = `${x}% ${y}%`
                        }}
                        onClick={() => setZoom((z) => !z)}
                    >
                        <motion.img
                            key={activeImage}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: zoom ? 1.8 : 1 }}
                            transition={{ duration: 0.4 }}
                            src={product.gallery[activeImage]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-noir/40 via-transparent to-transparent pointer-events-none" />

                        {/* Badge */}
                        {product.badge && (
                            <span className={`absolute top-5 left-5 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${product.badgeType === 'purple'
                                ? 'bg-neon-purple/20 text-neon-purple-light border border-neon-purple/30'
                                : 'bg-neon/20 text-neon-light border border-neon/30'
                                } backdrop-blur-xl`}>
                                {product.badge}
                            </span>
                        )}

                        {/* Zoom indicator */}
                        <div className="absolute bottom-5 right-5 px-3 py-1.5 rounded-full glass text-[10px] text-ink/60">
                            {zoom ? 'Click to zoom out' : 'Click to zoom'}
                        </div>
                    </motion.div>

                    {/* Thumbnails */}
                    <div className="flex gap-3">
                        {product.gallery.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={`relative w-20 h-20 rounded-2xl overflow-hidden transition-all duration-300 ${activeImage === i
                                    ? 'ring-2 ring-neon shadow-glow'
                                    : 'opacity-50 hover:opacity-100'
                                    }`}
                                data-hover
                            >
                                <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] uppercase tracking-widest text-neon-light/80 bg-neon/10 px-3 py-1 rounded-full border border-neon/20">
                            {product.brand}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-ink/40 capitalize">{product.category}</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>

                    <div className="flex items-center gap-3 mb-6">
                        <StarRating rating={product.rating} />
                        <span className="text-sm text-ink/40">
                            {product.rating} · {product.reviews.toLocaleString()} reviews
                        </span>
                    </div>

                    <p className="text-ink/50 leading-relaxed mb-8">{product.description}</p>

                    {/* Price */}
                    <div className="flex items-end gap-4 mb-8">
                        <motion.span
                            key={product.price}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-display text-5xl font-bold text-gradient-static"
                        >
                            ${product.price.toLocaleString()}
                        </motion.span>
                        {product.originalPrice > product.price && (
                            <>
                                <span className="text-ink/30 line-through text-xl mb-2">${product.originalPrice.toLocaleString()}</span>
                                <span className="text-success/ text-sm font-semibold mb-2">
                                    Save ${(product.originalPrice - product.price).toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Colors */}
                    {product.colors && (
                        <div className="mb-8">
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/50 mb-3">Color</h3>
                            <div className="flex gap-3">
                                {product.colors.map((color, i) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(i)}
                                        className={`w-10 h-10 rounded-full transition-all duration-300 ${selectedColor === i
                                            ? 'ring-2 ring-neon ring-offset-2 ring-offset-noir scale-110'
                                            : 'opacity-60 hover:opacity-100'
                                            }`}
                                        style={{ backgroundColor: color }}
                                        aria-label={`Color option ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity + Add to cart */}
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <div className="flex items-center gap-3 rounded-full glass px-3 py-2">
                            <button
                                onClick={() => setQty((q) => Math.max(1, q - 1))}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-ink/60 hover:text-ink hover:bg-ink/10 transition-colors"
                                aria-label="Decrease quantity"
                            >
                                <FiMinus size={14} />
                            </button>
                            <motion.span
                                key={qty}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                className="font-mono font-semibold w-6 text-center"
                            >
                                {qty}
                            </motion.span>
                            <button
                                onClick={() => setQty((q) => Math.min(10, q + 1))}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-ink/60 hover:text-ink hover:bg-ink/10 transition-colors"
                                aria-label="Increase quantity"
                            >
                                <FiPlus size={14} />
                            </button>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={handleAddToCart}
                            className="flex-1 min-w-[200px] py-4 rounded-full bg-gradient-to-r from-neon to-neon-purple font-semibold text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300 flex items-center justify-center gap-2"
                            data-hover
                        >
                            <FiShoppingBag size={17} /> Add to Cart — ${(product.price * qty).toLocaleString()}
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleWishlist(product)}
                            className={`w-[52px] h-[52px] rounded-full glass flex items-center justify-center transition-all duration-300 ${inWishlist
                                ? 'text-danger border-danger/40'
                                : 'text-ink/60 hover:text-danger hover:border-danger/40'
                                }`}
                            aria-label="Toggle wishlist"
                        >
                            <motion.span
                                key={inWishlist ? 'in' : 'out'}
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            >
                                <FiHeart size={18} className={inWishlist ? 'fill-danger' : ''} />
                            </motion.span>
                        </motion.button>
                    </div>

                    {/* Trust badges */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {[
                            { icon: FiTruck, label: 'Free 2-Day Shipping' },
                            { icon: FiShield, label: '2-Year Warranty' },
                            { icon: FiRefreshCw, label: '30-Day Free Returns' }
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-2xl glass text-center">
                                <Icon className="text-neon-light" size={18} />
                                <span className="text-[10px] text-ink/50">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Specs */}
                    <div className="glass-strong rounded-3xl p-7">
                        <h3 className="font-display text-lg font-bold mb-5 flex items-center gap-2">
                            <FiCpu className="text-neon-light" /> Technical Specifications
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                            {product.specs.map((spec, i) => (
                                <motion.div
                                    key={spec.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    className="flex items-start justify-between gap-4 py-2.5 border-b border-ink/[0.06]"
                                >
                                    <span className="text-xs text-ink/40 shrink-0">{spec.name}</span>
                                    <span className="text-xs text-ink/80 text-right">{spec.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Related products */}
            {related.length > 0 && (
                <div className="mt-24">
                    <h2 className="font-display text-3xl font-bold mb-8">
                        You May Also <span className="text-gradient">Like</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {related.map((p, i) => (
                            <ProductCard key={p.id} product={p} index={i} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
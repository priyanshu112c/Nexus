import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiX, FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import { formatPrice } from '../../data'
import { StarRating } from '../ui'

export default function QuickView() {
    const { quickView: product, setQuickView, addToCart, toggleWishlist, isInWishlist } = useStore()

    return (
        <AnimatePresence>
            {product && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setQuickView(null)}
                        className="fixed inset-0 z-[130] bg-night/70 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl glass-strong rounded-3xl overflow-hidden grid md:grid-cols-2"
                        >
                            {/* Close */}
                            <button
                                onClick={() => setQuickView(null)}
                                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full glass flex items-center justify-center text-ink/60 hover:text-ink hover:border-neon/40 transition-all duration-300"
                                aria-label="Close preview"
                            >
                                <FiX size={16} />
                            </button>

                            {/* Image side */}
                            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                                <motion.img
                                    key={product.id}
                                    src={product.image}
                                    alt={product.name}
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.7 }}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent" />
                                {product.badge && (
                                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-neon/20 text-neon-light text-[10px] font-bold uppercase tracking-widest border border-neon/30 backdrop-blur-xl">
                                        {product.badge}
                                    </span>
                                )}
                            </div>

                            {/* Content side */}
                            <div className="p-8 flex flex-col">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-light/70">{product.brand}</span>
                                    <StarRating rating={product.rating} size="text-sm" />
                                </div>

                                <h3 className="font-display text-2xl font-bold mb-2">{product.name}</h3>
                                <p className="text-xs text-ink/40 mb-4">{product.reviews.toLocaleString()} verified reviews</p>

                                <p className="text-sm text-ink/60 leading-relaxed mb-6 flex-1">
                                    {product.description}
                                </p>

                                <div className="flex items-end gap-3 mb-6">
                                    <span className="font-display text-3xl font-bold text-gradient-static">{formatPrice(product.price)}</span>
                                    {product.originalPrice > product.price && (
                                        <span className="text-ink/35 line-through text-sm mb-1">{formatPrice(product.originalPrice)}</span>
                                    )}
                                </div>

                                {/* Colors */}
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-xs text-ink/40 mr-1">Colors:</span>
                                    {product.colors?.map((c) => (
                                        <span
                                            key={c}
                                            className="w-5 h-5 rounded-full border border-ink/20 cursor-pointer hover:scale-125 transition-transform duration-200"
                                            style={{ background: c, boxShadow: `0 0 8px ${c}66` }}
                                        />
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="flex-1 px-6 py-3.5 rounded-full bg-gradient-to-r from-neon to-neon-purple text-sm font-semibold text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300 flex items-center justify-center gap-2"
                                        data-hover
                                    >
                                        <FiShoppingBag size={15} /> Add to Cart
                                    </button>
                                    <button
                                        onClick={() => toggleWishlist(product)}
                                        className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 ${isInWishlist(product.id) ? 'text-danger border-danger/40' : 'text-ink/60 hover:text-ink'
                                            }`}
                                        aria-label="Add to wishlist"
                                        data-hover
                                    >
                                        <FiHeart className={`${isInWishlist(product.id) ? 'fill-danger' : ''}`} size={16} />
                                    </button>
                                </div>

                                <Link
                                    to={`/product/${product.id}`}
                                    onClick={() => setQuickView(null)}
                                    className="mt-4 text-center text-sm text-neon-light hover:underline flex items-center justify-center gap-1.5"
                                >
                                    <FiEye size={13} /> View full details
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
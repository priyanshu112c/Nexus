import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingBag, FiEye, FiArrowUpRight } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import { useTilt } from '../../hooks/useTilt'
import { formatPrice } from '../../data'
import { StarRating } from '../ui'

const badgeStyles = {
    blue: 'bg-neon/20 text-neon-light border-neon/30',
    purple: 'bg-neon-purple/20 text-neon-purple-light border-purple-500/30'
}

export default function ProductCard({ product, index = 0 }) {
    const { addToCart, toggleWishlist, isInWishlist, setQuickView } = useStore()
    const { ref, onMouseMove, onMouseLeave } = useTilt(10)
    const wished = isInWishlist(product.id)
    const badgeCls = badgeStyles[product.badgeType] || badgeStyles.blue
    const hasDiscount = product.originalPrice > product.price

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group"
        >
            <div
                ref={ref}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="relative gradient-border gradient-border-hover rounded-3xl p-3 preserve-3d will-change-transform"
                data-hover
            >
                {/* Glare */}
                <div data-glare className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none z-[5]" />

                {/* Image area */}
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-ink/[0.02]">
                    <Link to={`/product/${product.id}`}>
                        <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                        />
                    </Link>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent opacity-60" />

                    {/* Badge */}
                    {product.badge && (
                        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-xl ${badgeCls}`}>
                            {product.badge}
                        </span>
                    )}

                    {/* Discount badge */}
                    {hasDiscount && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-danger/20 text-danger text-[10px] font-bold border border-danger/30 backdrop-blur-xl">
                            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                    )}

                    {/* Quick actions - slide up on hover */}
                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-center gap-2 translate-y-14 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <button
                            onClick={() => setQuickView(product)}
                            className="flex-1 py-2.5 rounded-xl glass-strong text-xs font-semibold text-ink/90 hover:text-ink flex items-center justify-center gap-1.5 hover:shadow-glow transition-all duration-300 hover:bg-ink/10"
                        >
                            <FiEye size={13} /> Quick View
                        </button>
                        <button
                            onClick={() => addToCart(product)}
                            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-neon to-neon-purple text-xs font-semibold text-ink flex items-center justify-center gap-1.5 shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                        >
                            <FiShoppingBag size={13} /> Add
                        </button>
                    </div>
                </div>

                {/* Wishlist button */}
                <motion.button
                    onClick={() => toggleWishlist(product)}
                    whileTap={{ scale: 0.8 }}
                    className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full glass-strong flex items-center justify-center transition-all duration-300 ${wished ? 'text-danger border-danger/40 shadow-[0_0_15px_rgba(248,113,113,0.4)]' : 'text-ink/60 hover:text-ink hover:border-neon/40'
                        }`}
                    aria-label="Add to wishlist"
                >
                    <FiHeart className={`${wished ? 'fill-danger' : ''} transition-all duration-300 ${wished ? 'scale-110' : ''}`} size={15} />
                    {wished && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-400"
                        />
                    )}
                </motion.button>

                {/* Content */}
                <div className="px-2 pt-4 pb-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neon-light/70">{product.brand}</span>
                        <span className="text-xs text-ink/40">{product.reviews.toLocaleString()} reviews</span>
                    </div>

                    <Link to={`/product/${product.id}`} className="block">
                        <h3 className="font-display font-semibold text-sm leading-snug mb-2 group-hover:text-neon-light transition-colors duration-300">
                            {product.name}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={product.rating} size="text-xs" />
                        <span className="text-xs text-ink/50">({product.rating})</span>
                    </div>

                    <div className="flex items-end justify-between">
                        <div>
                            <p className="font-display text-lg font-bold text-gradient-static">{formatPrice(product.price)}</p>
                            {hasDiscount && (
                                <p className="text-xs text-ink/35 line-through">{formatPrice(product.originalPrice)}</p>
                            )}
                        </div>
                        <Link
                            to={`/product/${product.id}`}
                            className="w-8 h-8 rounded-full glass flex items-center justify-center text-ink/50 hover:text-ink hover:border-neon/40 hover:shadow-glow transition-all duration-300"
                            aria-label={`View ${product.name}`}
                        >
                            <FiArrowUpRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
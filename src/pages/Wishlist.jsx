import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingBag, FiX } from 'react-icons/fi'
import { useStore } from '../context/StoreContext'
import { SectionHeading } from '../components/ui'

export default function Wishlist() {
    const { wishlist, toggleWishlist, addToCart, setCartOpen } = useStore()

    return (
        <div className="max-w-[1400px] mx-auto px-6 pt-40 pb-20">
            <SectionHeading
                eyebrow="Saved For Later"
                title="Your Wishlist"
                subtitle={wishlist.length
                    ? `You have ${wishlist.length} item${wishlist.length > 1 ? 's' : ''} saved — ready when you are.`
                    : 'Products you love, waiting for you.'}
            />

            {wishlist.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-24"
                >
                    <div className="w-20 h-20 rounded-full glass flex items-center justify-center mx-auto mb-6">
                        <FiHeart className="text-ink/30" size={28} />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2">Your wishlist is empty</h3>
                    <p className="text-ink/40 mb-8">Tap the heart on any product to save it here.</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-neon to-neon-purple text-sm font-semibold text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                        data-hover
                    >
                        <FiShoppingBag size={16} /> Discover Products
                    </Link>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.06 }}
                            className="relative group glass rounded-3xl overflow-hidden hover:shadow-glow transition-shadow duration-500"
                            data-hover
                        >
                            <button
                                onClick={() => toggleWishlist(product)}
                                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass flex items-center justify-center text-danger hover:scale-110 transition-transform"
                                aria-label="Remove from wishlist"
                            >
                                <FiX size={15} />
                            </button>

                            <Link to={`/product/${product.id}`} className="block">
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent opacity-60" />
                                    <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-widest text-neon-light/80 bg-neon/10 px-3 py-1 rounded-full border border-neon/20 backdrop-blur-xl">
                                        {product.brand}
                                    </span>
                                </div>
                            </Link>

                            <div className="p-5">
                                <Link to={`/product/${product.id}`}>
                                    <h3 className="font-display font-semibold mb-1 hover:text-neon-light transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>
                                </Link>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="font-display text-xl font-bold text-gradient-static">
                                        ${product.price.toLocaleString()}
                                    </span>
                                    <button
                                        onClick={() => {
                                            addToCart(product)
                                            setCartOpen(true)
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neon to-neon-purple text-xs font-semibold text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                                    >
                                        <FiShoppingBag size={13} /> Add
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
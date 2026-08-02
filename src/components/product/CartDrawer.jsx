import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiX, FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import { formatPrice } from '../../data'

export default function CartDrawer() {
    const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal, clearCart, addToast } = useStore()

    return (
        <AnimatePresence>
            {cartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setCartOpen(false)}
                        className="fixed inset-0 z-[120] bg-night/60 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md z-[130] flex flex-col glass-strong shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/5">
                            <h3 className="font-display font-semibold text-lg flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-neon/20 to-neon-purple/20 flex items-center justify-center">
                                    <FiShoppingBag className="text-neon-light" size={15} />
                                </span>
                                Your Cart
                                <span className="text-xs font-normal bg-ink/5 px-2.5 py-0.5 rounded-full text-ink/50">
                                    {cart.length} item{cart.length !== 1 ? 's' : ''}
                                </span>
                            </h3>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="w-9 h-9 rounded-full glass flex items-center justify-center text-ink/60 hover:text-ink hover:border-neon/40 transition-all duration-300"
                                aria-label="Close cart"
                                data-hover
                            >
                                <FiX size={16} />
                            </button>
                        </div>

                        {cart.length === 0 ? (
                            /* Empty state */
                            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                    className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6"
                                >
                                    <FiShoppingBag className="text-ink/20" size={36} />
                                </motion.div>
                                <h4 className="font-display font-semibold text-xl mb-2">Your cart is empty</h4>
                                <p className="text-sm text-ink/40 mb-8">Discover the future of technology — add something extraordinary.</p>
                                <Link
                                    to="/products"
                                    onClick={() => setCartOpen(false)}
                                    className="px-6 py-3 rounded-full bg-gradient-to-r from-neon to-neon-purple text-sm font-semibold text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                                >
                                    Explore Products
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Items */}
                                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 no-scrollbar">
                                    <AnimatePresence>
                                        {cart.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: 80, scale: 0.9 }}
                                                transition={{ duration: 0.3 }}
                                                className="relative flex gap-4 p-3 rounded-2xl glass group"
                                            >
                                                <Link to={`/product/${item.id}`} onClick={() => setCartOpen(false)} className="shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-20 h-20 object-cover rounded-xl"
                                                        loading="lazy"
                                                    />
                                                </Link>

                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate mb-1">{item.name}</p>
                                                    <p className="text-xs text-ink/40 mb-2">{formatPrice(item.price)}</p>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => updateQty(item.id, item.qty - 1)}
                                                                className="w-7 h-7 rounded-lg glass flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
                                                                aria-label="Decrease quantity"
                                                            >
                                                                <FiMinus size={12} />
                                                            </button>
                                                            <motion.span
                                                                key={item.qty}
                                                                initial={{ scale: 0.5 }}
                                                                animate={{ scale: 1 }}
                                                                className="text-sm font-semibold w-6 text-center"
                                                            >
                                                                {item.qty}
                                                            </motion.span>
                                                            <button
                                                                onClick={() => updateQty(item.id, item.qty + 1)}
                                                                className="w-7 h-7 rounded-lg glass flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
                                                                aria-label="Increase quantity"
                                                            >
                                                                <FiPlus size={12} />
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-ink/30 hover:text-danger transition-colors duration-300"
                                                            aria-label="Remove item"
                                                        >
                                                            <FiTrash2 size={15} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Footer */}
                                <div className="border-t border-ink/5 px-6 py-5">
                                    <div className="space-y-2 mb-5">
                                        <div className="flex justify-between text-sm text-ink/50">
                                            <span>Subtotal</span>
                                            <span>{formatPrice(cartTotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-ink/50">
                                            <span>Shipping</span>
                                            <span className="text-success/">Free</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-3 border-t border-ink/5">
                                            <span className="font-display font-semibold">Total</span>
                                            <motion.span
                                                key={cartTotal}
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1 }}
                                                className="font-display text-xl font-bold text-gradient-static"
                                            >
                                                {formatPrice(cartTotal)}
                                            </motion.span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                clearCart()
                                                addToast('Cart cleared', 'info')
                                            }}
                                            className="px-5 py-3.5 rounded-full glass text-sm text-ink/60 hover:text-ink hover:border-danger/30 transition-all duration-300"
                                        >
                                            Clear
                                        </button>
                                        <button
                                            onClick={() => {
                                                addToast('Checkout is a demo — this is a frontend showcase 🚀', 'info')
                                                setCartOpen(false)
                                            }}
                                            className="flex-1 px-6 py-3.5 rounded-full bg-gradient-to-r from-neon to-neon-purple text-sm font-semibold text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300 flex items-center justify-center gap-2 group"
                                            data-hover
                                        >
                                            Checkout
                                            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={15} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    )
}
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingBag, FiPlus, FiMinus, FiTrash2, FiArrowRight, FiShield, FiTruck, FiRefreshCw } from 'react-icons/fi'
import { useStore } from '../context/StoreContext'
import { SectionHeading } from '../components/ui'

export default function CartPage() {
    const { cart, updateQty, removeFromCart, clearCart, cartTotal, cartCount, addToast } = useStore()

    const shipping = cartTotal > 1000 ? 0 : 49
    const tax = cartTotal * 0.08
    const total = cartTotal + shipping + tax

    const handleCheckout = () => {
        addToast('Secure checkout coming soon! This is a frontend showcase ✨', 'info')
    }

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-28 sm:pt-40 pb-20">
            <SectionHeading
                eyebrow="Your Selection"
                title="Shopping Cart"
                subtitle={cartCount
                    ? `${cartCount} item${cartCount > 1 ? 's' : ''} in your cart — just a few clicks from the future.`
                    : 'Your cart is ready for greatness.'}
            />

            {cart.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-24"
                >
                    <div className="w-20 h-20 rounded-full glass flex items-center justify-center mx-auto mb-6">
                        <FiShoppingBag className="text-ink/30" size={28} />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2">Your cart is empty</h3>
                    <p className="text-ink/40 mb-8">Fill it with something extraordinary.</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-neon to-neon-purple text-sm font-semibold text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                        data-hover
                    >
                        Start Shopping <FiArrowRight size={16} />
                    </Link>
                </motion.div>
            ) : (
                <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-10 items-start">
                    {/* Cart items */}
                    <div className="space-y-3 sm:space-y-4">
                        <AnimatePresence initial={false}>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative glass rounded-2xl sm:rounded-3xl p-3 sm:p-4 hover:border-neon/20 hover:shadow-glow transition-all duration-300"
                                >
                                    <div className="flex gap-3 sm:gap-5">
                                        <Link to={`/product/${item.id}`} className="shrink-0">
                                            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl sm:rounded-2xl overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                        </Link>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 sm:gap-4">
                                                <div className="min-w-0">
                                                    <Link to={`/product/${item.id}`}>
                                                        <h3 className="font-display font-semibold text-sm sm:text-base hover:text-neon-light transition-colors line-clamp-1">
                                                            {item.name}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-[10px] sm:text-xs text-ink/40 mt-0.5">{item.brand}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full glass flex items-center justify-center text-ink/40 hover:text-danger hover:border-danger/40 transition-all duration-300 shrink-0"
                                                    aria-label="Remove item"
                                                >
                                                    <FiTrash2 size={13} />
                                                </button>
                                            </div>

                                            <div className="flex items-end justify-between mt-3 sm:mt-4 gap-2">
                                                <div className="flex items-center gap-2 sm:gap-3 rounded-full glass px-1.5 sm:px-2 py-1 sm:py-1.5">
                                                    <button
                                                        onClick={() => updateQty(item.id, item.qty - 1)}
                                                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-ink/60 hover:text-ink hover:bg-ink/10 transition-colors"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <FiMinus size={12} />
                                                    </button>
                                                    <motion.span
                                                        key={item.qty}
                                                        initial={{ scale: 1.2 }}
                                                        animate={{ scale: 1 }}
                                                        className="text-xs sm:text-sm font-mono font-semibold w-5 sm:w-6 text-center"
                                                    >
                                                        {item.qty}
                                                    </motion.span>
                                                    <button
                                                        onClick={() => updateQty(item.id, item.qty + 1)}
                                                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-ink/60 hover:text-ink hover:bg-ink/10 transition-colors"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <FiPlus size={12} />
                                                    </button>
                                                </div>

                                                <motion.div
                                                    key={item.qty}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-right"
                                                >
                                                    <p className="font-display text-sm sm:text-lg font-bold text-gradient-static">
                                                        ${(item.price * item.qty).toLocaleString()}
                                                    </p>
                                                    {item.qty > 1 && (
                                                        <p className="text-[9px] sm:text-[10px] text-ink/30">${item.price.toLocaleString()} each</p>
                                                    )}
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary */}
                    <div className="lg:sticky lg:top-32">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-7"
                        >
                            <h3 className="font-display text-lg sm:text-xl font-bold mb-5 sm:mb-6">Order Summary</h3>

                            <div className="space-y-3 text-sm mb-6">
                                <div className="flex justify-between">
                                    <span className="text-ink/40">Subtotal ({cartCount} items)</span>
                                    <span className="font-medium">${cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-ink/40">Shipping</span>
                                    {shipping === 0 ? (
                                        <span className="text-success/ font-medium">Free</span>
                                    ) : (
                                        <span className="font-medium">${shipping.toLocaleString()}</span>
                                    )}
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-ink/40">Estimated Tax</span>
                                    <span className="font-medium">${tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-[10px] text-neon-light/70 flex items-center gap-1.5 pt-1">
                                        <FiTruck size={11} /> Add ${(1000 - cartTotal).toLocaleString()} more for free shipping
                                    </p>
                                )}
                                <div className="h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent" />
                                <div className="flex justify-between items-center">
                                    <span className="font-display font-bold">Total</span>
                                    <motion.span
                                        key={total}
                                        initial={{ scale: 1.1, opacity: 0.7 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="font-display text-2xl font-bold text-gradient-static"
                                    >
                                        ${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </motion.span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full py-4 rounded-full bg-gradient-to-r from-neon to-neon-purple font-semibold text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300 mb-3"
                                data-hover
                            >
                                Secure Checkout
                            </button>

                            <div className="flex items-center justify-center gap-5 text-[10px] text-ink/30 mb-6">
                                <span className="flex items-center gap-1.5"><FiShield size={11} /> Buyer Protection</span>
                                <span className="flex items-center gap-1.5"><FiRefreshCw size={11} /> Free Returns</span>
                            </div>

                            <button
                                onClick={clearCart}
                                className="w-full text-xs text-ink/30 hover:text-danger transition-colors"
                            >
                                Clear Cart
                            </button>
                        </motion.div>
                    </div>
                </div>
            )}
        </div>
    )
}
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiCheckCircle } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)
    const { addToast } = useStore()

    const subscribe = (e) => {
        e.preventDefault()
        if (!email.includes('@')) {
            addToast('Please enter a valid email', 'error')
            return
        }
        setSubscribed(true)
        addToast('Welcome to the future! 🚀', 'success')
        setEmail('')
        setTimeout(() => setSubscribed(false), 4000)
    }

    return (
        <section className="relative z-10 py-16 sm:py-24">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8 }}
                    className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] glass-strong p-6 sm:p-12 md:p-20 text-center"
                >
                    {/* Animated backgrounds */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-neon/10 blur-[80px] animate-float" />
                        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-neon-purple/10 blur-[80px] animate-float-delay" />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] border border-ink/[0.04] rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] border border-ink/[0.03] rounded-full"
                        />
                    </div>

                    <div className="relative">
                        <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            className="inline-block w-16 h-16 rounded-2xl bg-gradient-to-br from-neon to-neon-purple flex items-center justify-center shadow-glow-lg mb-8"
                        >
                            <FiSend className="text-ink" size={24} />
                        </motion.span>

                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                            Join The <span className="text-gradient">Inner Circle</span>
                        </h2>
                        <p className="text-ink/50 text-sm sm:text-base max-w-xl mx-auto mb-8 sm:mb-10">
                            Get exclusive drops, private flash sales, and early access to flagship launches — before anyone else.
                        </p>

                        <form onSubmit={subscribe} className="relative max-w-lg mx-auto">
                            {subscribed && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute -top-12 inset-x-0 text-success/ flex items-center justify-center gap-2 text-sm"
                                >
                                    <FiCheckCircle /> You're on the list! Check your inbox.
                                </motion.div>
                            )}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-2 rounded-2xl sm:rounded-full glass-strong">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email for exclusives"
                                    className="flex-1 bg-transparent px-4 sm:px-5 py-3 text-sm placeholder:text-ink/30 focus:outline-none w-full"
                                />
                                <motion.button
                                    type="submit"
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 sm:px-7 py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-neon to-neon-purple text-sm font-semibold text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300 whitespace-nowrap w-full sm:w-auto"
                                    data-hover
                                >
                                    Get Access
                                </motion.button>
                            </div>
                            <p className="text-[10px] text-ink/30 mt-4">
                                No spam. Unsubscribe anytime. 50,000+ members already inside.
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
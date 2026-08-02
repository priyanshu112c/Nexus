import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative">
            {/* Ambient glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-neon/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-purple/10 blur-[100px] pointer-events-none" />

            <div className="relative text-center max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="font-display text-[8rem] md:text-[14rem] leading-none font-bold text-gradient-static">
                        404
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                        Lost In The <span className="text-gradient">Void</span>
                    </h1>
                    <p className="text-ink/40 max-w-md mx-auto mb-10">
                        The page you're looking for has drifted beyond the edge of our universe.
                        Let's get you back to somewhere extraordinary.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-neon to-neon-purple text-sm font-semibold text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                            data-hover
                        >
                            <FiHome size={16} /> Back To Home
                        </Link>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass text-sm font-semibold text-ink/80 hover:text-ink hover:border-neon/40 transition-all duration-300"
                            data-hover
                        >
                            <FiSearch size={16} /> Explore Products
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm text-ink/40 hover:text-ink transition-colors"
                        >
                            <FiArrowLeft size={16} /> Go Back
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
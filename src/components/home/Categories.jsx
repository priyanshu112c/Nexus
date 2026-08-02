import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { categories } from '../../data'
import { SectionHeading } from '../ui'
import { useTilt } from '../../hooks/useTilt'

function CategoryCard({ cat, index }) {
    const { ref, onMouseMove, onMouseLeave } = useTilt(10)
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: (index % 3) * 0.1 }}
        >
            <Link
                to={`/products?category=${cat.id}`}
                ref={ref}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="group relative block overflow-hidden rounded-3xl aspect-[3/4] gradient-border gradient-border-hover preserve-3d will-change-transform"
                data-hover
            >
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} via-noir/40 to-noir/70 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-transparent" />
                </div>

                {/* Glare */}
                <div data-glare className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-xs text-neon-light/80 mb-1.5">{cat.count} products</p>
                            <h3 className="font-display text-2xl font-bold mb-1">{cat.name}</h3>
                            <p className="text-sm text-ink/50 group-hover:text-ink/80 transition-colors duration-300">{cat.tagline}</p>
                        </div>
                        <motion.div
                            whileTap={{ scale: 0.85 }}
                            className="w-11 h-11 rounded-full glass-strong flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                        >
                            <FiArrowUpRight size={18} />
                        </motion.div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default function Categories() {
    return (
        <section className="relative z-10 py-24">
            <div className="max-w-[1400px] mx-auto px-6">
                <SectionHeading
                    eyebrow="Curated Worlds"
                    title="Shop By Category"
                    subtitle="Six immersive worlds engineered for every passion — from creator workstations to the arena of play."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, i) => (
                        <CategoryCard key={cat.id} cat={cat} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
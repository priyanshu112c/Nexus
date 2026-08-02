import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { categories } from '../data'
import { SectionHeading } from '../components/ui'

export default function CategoriesPage() {
    return (
        <div className="max-w-[1400px] mx-auto px-6 pt-40 pb-20">
            <SectionHeading
                eyebrow="Curated Worlds"
                title="All Categories"
                subtitle="Six immersive worlds engineered for every passion — from creator workstations to the arena of play."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat, i) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                    >
                        <Link
                            to={`/products?category=${cat.id}`}
                            className="group relative block overflow-hidden rounded-3xl aspect-[4/5] gradient-border gradient-border-hover"
                            data-hover
                        >
                            <div className="absolute inset-0 overflow-hidden rounded-3xl">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-noir/60" />
                                <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} mix-blend-multiply`} />
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-7">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-xs text-neon-light/80 mb-1.5">{cat.count} products</p>
                                        <h3 className="font-display text-3xl font-bold mb-2">{cat.name}</h3>
                                        <p className="text-sm text-ink/50 group-hover:text-ink/80 transition-colors duration-300">
                                            {cat.tagline}
                                        </p>
                                        <span className="inline-flex items-center gap-2 mt-4 text-sm text-neon-light opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                            Explore <FiArrowUpRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
import { motion } from 'framer-motion'
import { FiCpu, FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { aiRecommendations } from '../../data'
import { SectionHeading } from '../ui'

export default function AIPicks() {
    return (
        <section className="relative z-10 py-24 overflow-hidden">
            {/* Hologram ambient */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: `
                    linear-gradient(rgba(77,159,255,0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(77,159,255,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '48px 48px'
            }} />

            <div className="relative max-w-[1400px] mx-auto px-6">
                <SectionHeading
                    eyebrow="Neurolink AI"
                    title="Curated For You"
                    subtitle="Our AI engine analyzes your taste to surface products you'll fall in love with — before you even know you want them."
                />

                <div className="grid md:grid-cols-3 gap-6">
                    {aiRecommendations.map((rec, i) => (
                        <motion.div
                            key={rec.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.7, delay: i * 0.15 }}
                            className="relative group glass rounded-3xl overflow-hidden hover:shadow-glow transition-shadow duration-500"
                            data-hover
                        >
                            {/* Hologram scan line */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-neon/10 to-transparent -translate-y-full group-hover:translate-y-[250%] transition-transform duration-1000 pointer-events-none" />

                            {/* Image */}
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={rec.image}
                                    alt={rec.product}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-neon/20 border border-neon/30 backdrop-blur-xl text-neon-light text-[10px] font-bold uppercase tracking-widest">
                                        {rec.title}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <span className="relative flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 border border-success/30 backdrop-blur-xl text-success/ text-[10px] font-bold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-success/ animate-pulse" />
                                        {rec.match} match
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-neon-light transition-colors duration-300">
                                    {rec.product}
                                </h3>
                                <p className="text-sm text-ink/50 mb-5">{rec.reason}</p>
                                <div className="flex items-center justify-between">
                                    <span className="inline-flex items-center gap-2 text-xs text-neon-light/70">
                                        <FiCpu className="animate-pulse-glow" />
                                        AI Enhanced
                                    </span>
                                    <Link
                                        to="/products"
                                        className="w-9 h-9 rounded-full glass flex items-center justify-center text-ink/50 hover:text-ink hover:border-neon/40 hover:shadow-glow transition-all duration-300"
                                    >
                                        <FiArrowUpRight size={15} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
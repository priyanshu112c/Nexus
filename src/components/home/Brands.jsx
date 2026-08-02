import { motion } from 'framer-motion'
import { brands } from '../../data'
import { SectionHeading } from '../ui'

export default function Brands() {
    return (
        <section className="relative z-10 py-24">
            <div className="max-w-[1400px] mx-auto px-6">
                <SectionHeading
                    eyebrow="Global Partners"
                    title="The Best Of The Best"
                    subtitle="Hand-picked partnerships with the world's most innovative technology brands."
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {brands.map((brand, i) => (
                        <motion.div
                            key={brand.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                            className="group relative overflow-hidden rounded-2xl gradient-border gradient-border-hover"
                            data-hover
                        >
                            <div className="relative aspect-[4/3]">
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-noir/30" />
                                <div className="absolute inset-0 bg-neon/0 group-hover:bg-neon/5 transition-colors duration-500" />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 p-5">
                                <h3 className="font-display text-xl font-bold mb-0.5 group-hover:text-neon-light transition-colors duration-300">
                                    {brand.name}
                                </h3>
                                <p className="text-xs text-ink/40">{brand.tag}</p>
                            </div>
                            {/* Hover glow line */}
                            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-neon to-neon-purple w-0 group-hover:w-full transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
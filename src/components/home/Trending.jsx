import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { products } from '../../data'
import { SectionHeading } from '../ui'
import ProductCard from '../product/ProductCard'

export default function Trending() {
    const trending = products.filter((p) => p.trending).slice(0, 4)

    return (
        <section className="relative z-10 py-24">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <SectionHeading
                        eyebrow="Most Wanted"
                        title="Trending Now"
                        subtitle="The devices everyone is talking about — crafted for those who refuse to settle."
                        align="left"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="shrink-0 mb-16 md:mb-0"
                    >
                        <Link
                            to="/products"
                            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm text-ink/70 hover:text-ink hover:border-neon/40 hover:shadow-glow transition-all duration-300"
                            data-hover
                        >
                            View All Products
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </motion.div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trending.map((p, i) => (
                        <ProductCard key={p.id} product={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
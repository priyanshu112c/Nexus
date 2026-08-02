import { motion } from 'framer-motion'
import { FiZap } from 'react-icons/fi'
import { deals } from '../../data'
import { useCountdown } from '../../hooks/useCountdown'
import { SectionHeading } from '../ui'
import { useStore } from '../../context/StoreContext'

function DealCard({ deal, index }) {
    const { addToCart } = useStore()
    const { days, hours, minutes, seconds } = useCountdown(deal.ends)

    const timeBlocks = [
        { label: 'Days', value: days },
        { label: 'Hrs', value: hours },
        { label: 'Min', value: minutes },
        { label: 'Sec', value: seconds }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.12 }}
            className="relative group gradient-border gradient-border-hover rounded-3xl overflow-hidden"
            data-hover
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={deal.image}
                    alt={deal.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-danger/20 text-danger text-[10px] font-bold uppercase tracking-widest border border-danger/30 backdrop-blur-xl flex items-center gap-1.5">
                    <FiZap size={11} className="fill-danger" /> -{deal.discount}%
                </span>
            </div>

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl font-bold mb-1">{deal.title}</h3>
                <div className="flex items-end gap-3 mb-5">
                    <span className="font-display text-3xl font-bold text-gradient-static">${deal.price.toLocaleString()}</span>
                    <span className="text-ink/35 line-through text-sm mb-1">${deal.originalPrice.toLocaleString()}</span>
                </div>

                {/* Countdown */}
                <div className="flex gap-2 mb-5">
                    {timeBlocks.map((block) => (
                        <div key={block.label} className="flex-1 text-center py-2.5 rounded-xl glass backdrop-blur-xl">
                            <motion.p
                                key={`${block.label}-${block.value}`}
                                initial={{ scale: 1.3, color: '#ffffff' }}
                                animate={{ scale: 1, color: '#4d9fff' }}
                                transition={{ duration: 0.3 }}
                                className="font-mono text-xl font-bold text-neon-light"
                            >
                                {String(block.value).padStart(2, '0')}
                            </motion.p>
                            <p className="text-[9px] uppercase tracking-widest text-ink/40 mt-0.5">{block.label}</p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => {
                        const product = {
                            id: deal.productId,
                            name: deal.title,
                            price: deal.price,
                            image: deal.image,
                            brand: 'NEXUS',
                            category: 'deals'
                        }
                        addToCart(product)
                    }}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-neon to-neon-purple text-sm font-semibold text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                    data-hover
                >
                    Grab This Deal
                </button>
            </div>
        </motion.div>
    )
}

export default function FlashDeals() {
    return (
        <section className="relative z-10 py-24 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-[30rem] h-[30rem] rounded-full bg-neon-purple/[0.05] blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6">
                <SectionHeading
                    eyebrow="Limited Time"
                    title="Flash Deals"
                    subtitle="Lightning-fast savings on flagship technology. When the clock hits zero, these prices vanish."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {deals.map((deal, i) => (
                        <DealCard key={deal.id} deal={deal} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
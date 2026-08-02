import { motion } from 'framer-motion'
import { FiZap, FiClock } from 'react-icons/fi'
import { deals } from '../data'
import { SectionHeading } from '../components/ui'
import FlashDeals from '../components/home/FlashDeals'
import { useCountdown } from '../hooks/useCountdown'

function CountdownBanner() {
    const end = Math.max(...deals.map((d) => d.ends))
    const { days, hours, minutes, seconds } = useCountdown(end)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2rem] glass-strong p-10 md:p-14 text-center mb-20"
        >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] rounded-full bg-neon/10 blur-[100px] pointer-events-none" />
            <div className="relative">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-danger/15 border border-danger/30 text-danger text-xs font-bold uppercase tracking-widest mb-6">
                    <FiZap className="fill-danger" /> Mega Sale Ends In
                </span>
                <div className="flex items-center justify-center gap-3 md:gap-5 mb-8">
                    {[
                        { label: 'Days', value: days },
                        { label: 'Hours', value: hours },
                        { label: 'Minutes', value: minutes },
                        { label: 'Seconds', value: seconds }
                    ].map((block) => (
                        <div key={block.label} className="text-center">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl glass flex items-center justify-center">
                                <motion.span
                                    key={`${block.label}-${block.value}`}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    className="font-mono text-3xl md:text-4xl font-bold text-gradient-static"
                                >
                                    {String(block.value).padStart(2, '0')}
                                </motion.span>
                            </div>
                            <p className="text-[10px] uppercase tracking-widest text-ink/40 mt-2">{block.label}</p>
                        </div>
                    ))}
                </div>
                <p className="text-sm text-ink/40 flex items-center justify-center gap-2">
                    <FiClock /> Prices reset when the timer hits zero — grab your favorites now.
                </p>
            </div>
        </motion.div>
    )
}

export default function Deals() {
    return (
        <div className="max-w-[1400px] mx-auto px-6 pt-40 pb-20">
            <SectionHeading
                eyebrow="Limited Time"
                title="Deals & Offers"
                subtitle="Lightning-fast savings on flagship technology. When the clock hits zero, these prices vanish."
            />
            <CountdownBanner />
            <FlashDeals />
        </div>
    )
}
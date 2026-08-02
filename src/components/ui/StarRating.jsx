import { FiStar } from 'react-icons/fi'
import { motion } from 'framer-motion'

/**
 * StarRating — Animated star rating with staggered pop-in.
 * @param {Number} rating Value from 0-5 (supports halves)
 * @param {String} size Tailwind text size class
 */
export default function StarRating({ rating = 5, size = 'text-sm' }) {
    const stars = Array.from({ length: 5 }, (_, i) => i + 1)

    return (
        <div className="flex items-center gap-0.5">
            {stars.map((star, i) => {
                const fill = Math.min(Math.max(rating - (star - 1), 0), 1)
                const pct = fill * 100
                return (
                    <motion.span
                        key={star}
                        initial={{ opacity: 0, scale: 0, rotate: -30 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 15 }}
                        className={`relative inline-block ${size} leading-none`}
                    >
                        <FiStar className="text-ink/15" />
                        <span
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: `${pct}%` }}
                        >
                            <FiStar className="text-warning drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" />
                        </span>
                    </motion.span>
                )
            })}
        </div>
    )
}
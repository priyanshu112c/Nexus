import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { reviews } from '../../data'
import { SectionHeading, StarRating } from '../ui'

/**
 * Reviews — Auto-scrolling glass testimonial cards with floating effect.
 * Uses CSS marquee animation for a seamless infinite scroll.
 */
export default function Reviews() {
    const row1 = reviews.slice(0, 3)
    const row2 = reviews.slice(3)

    return (
        <section className="relative z-10 py-24 overflow-hidden">
            {/* Ambient */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-neon/[0.04] blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6">
                <SectionHeading
                    eyebrow="Voices"
                    title="Loved By Thousands"
                    subtitle="Real stories from customers who experienced the NEXUS difference."
                />

                <div className="relative space-y-6">
                    {/* Row 1 */}
                    <div className="marquee-row overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                        <div className="flex gap-6 w-max marquee-animate">
                            {[...row1, ...row1].map((review, i) => (
                                <ReviewCard key={`${review.id}-${i}`} review={review} />
                            ))}
                        </div>
                    </div>

                    {/* Row 2 - reverse direction */}
                    <div className="marquee-row overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                        <div className="flex gap-6 w-max marquee-animate marquee-reverse">
                            {[...row2, ...row2].map((review, i) => (
                                <ReviewCard key={`${review.id}-${i}`} review={review} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ReviewCard({ review }) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-[320px] sm:w-[380px] shrink-0 p-6 rounded-3xl glass hover:border-neon/20 hover:shadow-glow transition-all duration-300"
            data-hover
        >
            <div className="flex items-center gap-4 mb-4">
                <motion.img
                    src={review.avatar}
                    alt={review.name}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-neon/30 ring-offset-2 ring-offset-noir"
                    whileHover={{ scale: 1.1 }}
                />
                <div>
                    <p className="font-display font-semibold text-sm">{review.name}</p>
                    <p className="text-xs text-ink/40">{review.role}</p>
                </div>
            </div>
            <div className="mb-3">
                <StarRating rating={review.rating} size="text-xs" />
            </div>
            <p className="text-sm text-ink/60 leading-relaxed">“{review.text}”</p>
        </motion.div>
    )
}
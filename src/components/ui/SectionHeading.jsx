import { motion } from 'framer-motion'

/**
 * SectionHeading — Cinematic heading with eyebrow tag, animated gradient text,
 * and shimmer line. Used consistently across all sections.
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
    const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left'

    return (
        <div className={`flex flex-col ${alignCls} mb-16`}>
            {eyebrow && (
                <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-[0.2em] uppercase text-neon-light mb-6"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse-glow" />
                    {eyebrow}
                </motion.span>
            )}

            <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
            >
                {title}
            </motion.h2>

            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className={`mt-5 text-ink/50 max-w-2xl text-base leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}
                >
                    {subtitle}
                </motion.p>
            )}

            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="glow-line w-24 mt-8 origin-center"
            />
        </div>
    )
}
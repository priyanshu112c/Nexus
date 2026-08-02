import { useMagnetic } from '../../hooks/useMagnetic'
import { useRipple } from '../../hooks/useRipple'
import { useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * MagneticButton — Premium CTA button with magnetic hover, ripple click,
 * gradient glow, and animated shine sweep.
 */
export default function MagneticButton({
    children,
    variant = 'primary',
    className = '',
    onClick,
    ...props
}) {
    const buttonRef = useRef(null)
    const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.35)
    const createRipple = useRipple(ref)

    const variants = {
        primary:
            'bg-gradient-to-r from-neon to-neon-purple text-ink shadow-glow hover:shadow-glow-lg',
        ghost:
            'glass text-ink/80 hover:text-ink hover:border-neon/40 hover:shadow-glow',
        outline:
            'border border-neon/40 text-neon-light hover:bg-neon/10 hover:shadow-glow'
    }

    const handleClick = (e) => {
        createRipple(e)
        onClick?.(e)
    }

    return (
        <motion.button
            {...props}
            ref={(node) => {
                ref.current = node
                buttonRef.current = node
            }}
            onClick={handleClick}
            onMouseMove={(e) => {
                onMouseMove(e)
                props.onMouseMove?.(e)
            }}
            onMouseLeave={(e) => {
                onMouseLeave(e)
                props.onMouseLeave?.(e)
            }}
            whileTap={{ scale: 0.96 }}
            className={`btn-magnetic relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold overflow-hidden ${variants[variant]} ${className}`}
            data-hover
        >
            {/* Shine sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-ink/20 to-transparent skew-x-12" />
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </motion.button>
    )
}
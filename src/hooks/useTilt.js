import { useRef, useCallback } from 'react'

/**
 * useTilt — 3D tilt interaction with glare effect.
 * @param {Number} maxTilt Max rotation in degrees (default 12)
 * @returns {Object} { ref, onMouseMove, onMouseLeave }
 */
export function useTilt(maxTilt = 12) {
    const ref = useRef(null)

    const onMouseMove = useCallback(
        (e) => {
            const el = ref.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width - 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5
            el.style.transform = `perspective(1000px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) translateZ(20px)`
            el.style.transition = 'transform 0.15s ease-out'

            const glare = el.querySelector('[data-glare]')
            if (glare) {
                glare.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top
                    }px, rgba(255,255,255,0.12), transparent 60%)`
                glare.style.opacity = '1'
            }
        },
        [maxTilt]
    )

    const onMouseLeave = useCallback(() => {
        const el = ref.current
        if (!el) return
        el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)'
        el.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
        const glare = el.querySelector('[data-glare]')
        if (glare) glare.style.opacity = '0'
    }, [])

    return { ref, onMouseMove, onMouseLeave }
}
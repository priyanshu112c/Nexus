import { useRef, useCallback } from 'react'

/**
 * useMagnetic — Magnetic button effect that pulls element toward cursor.
 * @param {Number} strength How strongly the element follows (default 0.4)
 * @returns {Object} { ref, onMouseMove, onMouseLeave }
 */
export function useMagnetic(strength = 0.4) {
    const ref = useRef(null)

    const onMouseMove = useCallback(
        (e) => {
            const el = ref.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            const x = (e.clientX - (rect.left + rect.width / 2)) * strength
            const y = (e.clientY - (rect.top + rect.height / 2)) * strength
            el.style.transform = `translate(${x}px, ${y}px)`
            el.style.transition = 'transform 0.2s ease-out'
        },
        [strength]
    )

    const onMouseLeave = useCallback(() => {
        const el = ref.current
        if (!el) return
        el.style.transform = 'translate(0, 0)'
        el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
    }, [])

    return { ref, onMouseMove, onMouseLeave }
}
import { useCallback } from 'react'

/**
 * useRipple — Adds a rippling circle on click event.
 * @param {React.RefObject} ref Target container ref
 */
export function useRipple(ref) {
    const createRipple = useCallback((e) => {
        const el = ref?.current
        if (!el) return

        const rect = el.getBoundingClientRect()
        const span = document.createElement('span')
        const size = Math.max(rect.width, rect.height)
        span.style.width = span.style.height = `${size}px`
        span.style.left = `${e.clientX - rect.left - size / 2}px`
        span.style.top = `${e.clientY - rect.top - size / 2}px`
        span.classList.add('ripple-effect')
        el.appendChild(span)
        setTimeout(() => span.remove(), 600)
    }, [ref])

    return createRipple
}
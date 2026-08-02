import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis(enabled = true) {
    useEffect(() => {
        if (!enabled) return undefined

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.5
        })

        let frame
        function raf(time) {
            lenis.raf(time)
            frame = requestAnimationFrame(raf)
        }
        frame = requestAnimationFrame(raf)

        return () => {
            cancelAnimationFrame(frame)
            lenis.destroy()
        }
    }, [enabled])

    return null
}
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useGSAPReveal — Reusable scroll-reveal animation hook.
 * Attaches a fade-up + stagger reveal to refs matched by `selector`.
 * @param {Object} options
 * @param {React.RefObject} options.scope React ref scoping the animation
 * @param {String} [options.selector='[data-reveal]'] Elements inside scope to animate
 * @param {Object} [options.from] GSAP "from" vars
 * @param {Object} [options.stagger] Stagger values
 * @param {Array} [options.deps] Dependency array for re-running
 */
export function useGSAPReveal({ scope, selector = '[data-reveal]', from, stagger, deps = [] } = {}) {
    useEffect(() => {
        const ctx = gsap.context(() => {
            const els = gsap.utils.toArray(selector)
            if (!els.length) return

            return gsap.from(els, {
                y: from?.y ?? 50,
                opacity: from?.opacity ?? 0,
                duration: from?.duration ?? 1,
                ease: from?.ease ?? 'power3.out',
                stagger: stagger ?? 0.12,
                scrollTrigger: {
                    // When no scope ref is provided (global use in App),
                    // trigger on the matched elements themselves.
                    trigger: scope?.current ?? els,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    once: true
                }
            })
        }, scope)

        return () => ctx.revert()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}

import { useEffect, useRef } from 'react'

/**
 * MouseFollower — Glow cursor ring + dot that follows the pointer.
 * Hides native cursor on desktop; ring expands over interactive elements.
 */
export default function MouseFollower() {
    const ringRef = useRef(null)
    const dotRef = useRef(null)

    useEffect(() => {
        const isTouch = window.matchMedia('(pointer: coarse)').matches
        if (isTouch) return undefined

        document.body.classList.add('cursor-glow-hidden')

        const ring = ringRef.current
        const dot = dotRef.current
        const onMove = (e) => {
            requestAnimationFrame(() => {
                ring.style.left = `${e.clientX}px`
                ring.style.top = `${e.clientY}px`
                dot.style.left = `${e.clientX}px`
                dot.style.top = `${e.clientY}px`
            })
        }

        const onOver = (e) => {
            const interactive = e.target.closest('a, button, input, select, textarea, [data-hover]')
            ring?.classList.toggle('active', !!interactive)
        }

        const onDown = () => {
            ring?.classList.add('active')
        }
        const onUp = () => {
            const isOver = document.querySelector('a:hover, button:hover, [data-hover]:hover')
            ring?.classList.toggle('active', !!isOver)
        }

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseover', onOver)
        window.addEventListener('mousedown', onDown)
        window.addEventListener('mouseup', onUp)

        return () => {
            document.body.classList.remove('cursor-glow-hidden')
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseover', onOver)
            window.removeEventListener('mousedown', onDown)
            window.removeEventListener('mouseup', onUp)
        }
    }, [])

    return (
        <>
            <div ref={ringRef} className="cursor-ring hidden md:block" />
            <div ref={dotRef} className="cursor-dot hidden md:block" />
        </>
    )
}
import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

/** Reads an RGB-triplet CSS var and returns it as a comma-separated string. */
function readRgb(name) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    return raw || '77 159 255' // fallback: NEXUS blue
}

/**
 * BackgroundFX — Cinematic animated background:
 * floating particles, gradient blobs, lens flares, light streaks, and a subtle grid.
 * All colors are pulled from the active theme's CSS variables so the whole
 * background morphs when the user toggles Midnight ⇄ Scandinavian.
 */
export default function BackgroundFX() {
    const canvasRef = useRef(null)
    const { theme } = useTheme()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let raf
        let particles = []
        const DPR = Math.min(window.devicePixelRatio || 1, 2)

        // Parse the theme's accent RGB triplets.
        const accent = readRgb('--c-accent').split(/\s+/).map(Number)
        const secondary = readRgb('--c-accent-secondary').split(/\s+/).map(Number)

        const resize = () => {
            canvas.width = window.innerWidth * DPR
            canvas.height = window.innerHeight * DPR
            canvas.style.width = `${window.innerWidth}px`
            canvas.style.height = `${window.innerHeight}px`
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
            const count = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 18000))
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                r: Math.random() * 2.2 + 0.4,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                alpha: Math.random() * 0.5 + 0.15,
                // Alternate between the two theme accents
                color: Math.random() > 0.5 ? accent : secondary
            }))
        }

        const rgb = (c) => `${c[0]}, ${c[1]}, ${c[2]}`

        const connect = (a, b) => {
            const dx = a.x - b.x
            const dy = a.y - b.y
            const dist = Math.hypot(dx, dy)
            if (dist < 130) {
                ctx.strokeStyle = `rgba(${rgb(accent)}, ${(1 - dist / 130) * 0.12})`
                ctx.lineWidth = 0.6
                ctx.beginPath()
                ctx.moveTo(a.x, a.y)
                ctx.lineTo(b.x, b.y)
                ctx.stroke()
            }
        }

        const tick = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

            particles.forEach((p, i) => {
                p.x += p.vx
                p.y += p.vy
                if (p.x < -10) p.x = window.innerWidth + 10
                if (p.x > window.innerWidth + 10) p.x = -10
                if (p.y < -10) p.y = window.innerHeight + 10
                if (p.y > window.innerHeight + 10) p.y = -10

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${rgb(p.color)}, ${p.alpha})`
                ctx.shadowBlur = 6
                ctx.shadowColor = `rgba(${rgb(p.color)}, 0.8)`
                ctx.fill()
                ctx.shadowBlur = 0

                for (let j = i + 1; j < particles.length; j++) {
                    connect(p, particles[j])
                }
            })

            raf = requestAnimationFrame(tick)
        }

        resize()
        tick()
        window.addEventListener('resize', resize)
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
        }
    }, [theme]) // Re-run so particles take the new theme's palette

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Base radial gradients — powered by theme CSS vars */}
            <div
                className="absolute -top-40 -left-40 w-[60rem] h-[60rem] rounded-full opacity-25 blur-[120px] animate-pulse-glow"
                style={{ background: 'radial-gradient(circle, rgb(var(--c-accent) / 0.35), transparent 60%)' }}
            />
            <div
                className="absolute top-1/3 -right-40 w-[50rem] h-[50rem] rounded-full opacity-20 blur-[120px] animate-pulse-glow"
                style={{ background: 'radial-gradient(circle, rgb(var(--c-accent-secondary) / 0.35), transparent 60%)', animationDelay: '1.5s' }}
            />
            <div
                className="absolute bottom-0 left-1/3 w-[40rem] h-[40rem] rounded-full opacity-15 blur-[120px] animate-pulse-glow"
                style={{ background: 'radial-gradient(circle, rgb(var(--c-accent-glow) / 0.3), transparent 60%)', animationDelay: '3s' }}
            />

            {/* Lens flares */}
            <div
                className="lens-flare top-[15%] right-[10%] w-32 h-32 opacity-30"
                style={{ background: 'radial-gradient(circle, rgb(var(--c-accent-light) / 0.6), transparent 70%)' }}
            />
            <div
                className="lens-flare bottom-[25%] left-[8%] w-40 h-40 opacity-20"
                style={{ background: 'radial-gradient(circle, rgb(var(--c-accent-secondary) / 0.6), transparent 70%)' }}
            />

            {/* Floating light streak */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-px animate-pulse-glow"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgb(var(--c-accent) / 0.5), transparent)',
                    boxShadow: '0 0 24px rgb(var(--c-accent) / 0.4)'
                }}
            />

            {/* Geometric rotating rings */}
            <div className="absolute -bottom-32 -right-32 w-[36rem] h-[36rem] border border-ink/[0.04] rounded-full animate-spin-slow" />
            <div
                className="absolute -bottom-16 -right-16 w-[24rem] h-[24rem] border border-neon/10 rounded-full animate-spin-slow"
                style={{ animationDirection: 'reverse', animationDuration: '30s' }}
            />

            {/* Subtle grid — ink tint works on both themes */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgb(var(--c-ink) / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--c-ink) / 0.06) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                    maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
                }}
            />

            {/* Particle canvas */}
            <canvas ref={canvasRef} className="absolute inset-0" />
        </div>
    )
}
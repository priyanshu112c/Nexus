import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * PreLoader — Cinematic loading screen with animated logo and progress counter.
 */
export default function PreLoader() {
    const [progress, setProgress] = useState(0)
    const [done, setDone] = useState(false)

    useEffect(() => {
        let value = 0
        const interval = setInterval(() => {
            value += Math.random() * 18 + 4
            if (value >= 100) {
                value = 100
                clearInterval(interval)
                setTimeout(() => setDone(true), 500)
            }
            setProgress(Math.floor(value))
        }, 160)
        return () => clearInterval(interval)
    }, [])

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-noir"
                    exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
                >
                    {/* Ambient glow */}
                    <div className="absolute w-[30rem] h-[30rem] rounded-full blur-[100px] opacity-20 animate-pulse-glow" style={{ background: 'radial-gradient(circle, rgb(var(--c-accent) / 0.5), transparent 60%)' }} />

                    {/* Logo mark */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="relative mb-10"
                    >
                        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                            <defs>
                                <linearGradient id="loaderGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#4d9fff" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                            <rect x="2" y="2" width="96" height="96" rx="24" stroke="url(#loaderGrad)" strokeWidth="1.5" opacity="0.4" />
                            <motion.path
                                d="M25 55 L47 33 L57 43 L35 65 Z"
                                fill="url(#loaderGrad)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            />
                            <motion.path
                                d="M43 55 L60 38 L70 48 L53 65 Z"
                                fill="url(#loaderGrad)"
                                opacity="0.7"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.7 }}
                                transition={{ delay: 0.5 }}
                            />
                        </svg>
                    </motion.div>

                    {/* Brand name */}
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                        className="font-display text-4xl font-bold tracking-[0.3em] uppercase mb-10"
                    >
                        Nex<span className="text-gradient">us</span>
                    </motion.h1>

                    {/* Progress bar */}
                    <div className="w-64 h-px bg-ink/10 overflow-hidden rounded-full relative">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon to-neon-purple"
                            style={{ width: `${progress}%`, boxShadow: '0 0 20px rgb(var(--c-accent) / 0.6)' }}
                        />
                    </div>
                    <div className="mt-4 font-mono text-sm text-ink/40">
                        {progress}%
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
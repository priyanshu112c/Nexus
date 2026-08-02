import { useState, useEffect } from 'react'

/**
 * useCountdown — Live countdown timer to a target timestamp.
 * @param {Number} target Timestamp in ms
 * @param {Boolean} active Whether to run (default true)
 * @returns {Object} { days, hours, minutes, seconds, expired }
 */
export function useCountdown(target, active = true) {
    const [now, setNow] = useState(Date.now())

    useEffect(() => {
        if (!active) return undefined
        const interval = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(interval)
    }, [active])

    const diff = Math.max(0, target - now)
    const expired = diff <= 0

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds, expired }
}
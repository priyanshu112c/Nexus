import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext(null)

export const THEMES = {
    midnight: 'midnight', // Dark Luxury — Apple Dark / Nothing / Tesla cyberpunk
    scandi: 'scandi' // Scandinavian Luxury — Apple Light / Linear / Stripe
}

const STORAGE_KEY = 'nexus-theme'

/** Maps any legacy values (old dark/light system) to the new theme names. */
function normalizeTheme(value) {
    if (value === 'light' || value === 'scandi') return THEMES.scandi
    return THEMES.midnight
}

/**
 * Reads the theme from <html data-theme> (set by the no-flash inline script
 * in index.html). Falls back to midnight.
 */
function getInitialTheme() {
    if (typeof window === 'undefined') return THEMES.midnight
    const current = document.documentElement.getAttribute('data-theme')
    return normalizeTheme(current)
}

/**
 * ThemeProvider — dual-theme system.
 * Persists in localStorage, applies data-theme on <html> (no flash thanks to
 * the inline bootstrap script), and exposes a toggle helper. The full-site
 * morph transition is driven by <ThemeMorphOverlay /> which reads the
 * transform origin + theme colors provided through context state here.
 */
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme)
    // Morph overlay state: { x, y } is where the circular wipe originates.
    const [morph, setMorph] = useState(null)

    // Keep documentElement + storage in sync (also covers outside changes).
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        try {
            localStorage.setItem(STORAGE_KEY, theme)
        } catch {
            /* storage unavailable (private mode) — theme still applies this session */
        }
    }, [theme])

    const toggleTheme = useCallback((event) => {
        // Capture click origin for the circular morph wipe.
        const origin = event?.currentTarget
            ? (() => {
                const rect = event.currentTarget.getBoundingClientRect()
                return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
            })()
            : { x: window.innerWidth / 2, y: window.innerHeight / 2 }

        setMorph(origin)
        setTheme((prev) => (prev === THEMES.midnight ? THEMES.scandi : THEMES.midnight))
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, morph, setMorph }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
    return ctx
}

export default ThemeContext
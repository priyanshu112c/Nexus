import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

/**
 * ThemeMorphOverlay — premium circular morph wipe when switching themes.
 * The overlay expands from the toggle's click position, washing the entire
 * viewport through the incoming theme's fade color, then is removed.
 */
export default function ThemeMorphOverlay() {
    const { morph, setMorph, theme } = useTheme()

    const fade = theme === 'scandi' ? '#f5f3ef' : '#060608'

    return (
        <AnimatePresence>
            {morph && (
                <motion.div
                    key={`morph-${morph.x}-${morph.y}-${theme}`}
                    className="fixed inset-0 z-[95] pointer-events-none rounded-full"
                    initial={{ width: 0, height: 0, opacity: 0.9 }}
                    animate={{ width: 'max(220vmax, 220vmax)', height: 'max(220vmax, 220vmax)', opacity: 0.9 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        left: morph.x,
                        top: morph.y,
                        x: '-50%',
                        y: '-50%',
                        background: fade,
                        boxShadow: `0 0 120px 20px ${fade}`,
                        zIndex: 95
                    }}
                    onAnimationComplete={() => setMorph(null)}
                />
            )}
        </AnimatePresence>
    )
}
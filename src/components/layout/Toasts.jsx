import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'

const toastConfig = {
    success: { Icon: FiCheckCircle, color: 'text-success/', border: 'border-success/30' },
    error: { Icon: FiAlertCircle, color: 'text-danger', border: 'border-danger/30' },
    info: { Icon: FiInfo, color: 'text-neon-light', border: 'border-neon/30' }
}

/**
 * Toasts — Global animated notification stack (bottom-right).
 */
export default function Toasts() {
    const { toasts } = useStore()

    return (
        <div className="fixed bottom-6 right-6 z-[150] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => {
                    const { Icon, color, border } = toastConfig[toast.type] || toastConfig.info
                    return (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 80, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 80, scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                            className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl glass-strong ${border} shadow-card backdrop-blur-2xl`}
                        >
                            <Icon className={color} size={18} />
                            <p className="text-sm text-ink/90">{toast.message}</p>
                            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-neon to-neon-purple toast-progress" />
                        </motion.div>
                    )
                })}
            </AnimatePresence>
            <style>{`
                .toast-progress {
                    animation: toastBar 3.5s linear forwards;
                }
                @keyframes toastBar {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `}</style>
        </div>
    )
}
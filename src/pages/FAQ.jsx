import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiHelpCircle, FiTruck, FiRefreshCw, FiShield, FiCreditCard } from 'react-icons/fi'
import { faqs } from '../data'
import { SectionHeading } from '../components/ui'

const topics = [
    { icon: FiTruck, label: 'Shipping' },
    { icon: FiRefreshCw, label: 'Returns' },
    { icon: FiShield, label: 'Warranty' },
    { icon: FiCreditCard, label: 'Payment' }
]

export default function FAQ() {
    const [open, setOpen] = useState(0)
    const [activeTopic, setActiveTopic] = useState('All')

    const filtered = activeTopic === 'All' ? faqs : faqs.filter((f) => f.category === activeTopic)

    return (
        <div className="max-w-[900px] mx-auto px-6 pt-40 pb-20">
            <SectionHeading
                eyebrow="Need Help?"
                title="Frequently Asked Questions"
                subtitle="Everything you need to know about ordering, shipping, returns, and more."
            />

            {/* Topic chips */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-10">
                {['All', ...topics.map((t) => t.label)].map((topic) => (
                    <button
                        key={topic}
                        onClick={() => {
                            setActiveTopic(topic)
                            setOpen(0)
                        }}
                        className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${activeTopic === topic
                            ? 'bg-gradient-to-r from-neon to-neon-purple text-ink shadow-glow'
                            : 'glass text-ink/60 hover:text-ink hover:border-neon/40'
                            }`}
                        data-hover
                    >
                        {topic}
                    </button>
                ))}
            </div>

            {/* FAQ items */}
            <div className="space-y-4">
                {filtered.map((faq, i) => {
                    const isOpen = open === i
                    return (
                        <motion.div
                            key={faq.question}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: i * 0.06 }}
                            className={`glass rounded-3xl overflow-hidden transition-all duration-500 ${isOpen ? 'border-neon/30 shadow-glow' : 'hover:border-neon/20'}`}
                        >
                            <button
                                onClick={() => setOpen(isOpen ? -1 : i)}
                                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                                data-hover
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen
                                        ? 'bg-gradient-to-br from-neon to-neon-purple text-ink'
                                        : 'glass text-neon-light'
                                        }`}>
                                        <FiHelpCircle size={17} />
                                    </span>
                                    <h3 className="font-display font-semibold">{faq.question}</h3>
                                </div>
                                <motion.span
                                    animate={{ rotate: isOpen ? 45 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isOpen ? 'text-neon-light' : 'text-ink/40'}`}
                                >
                                    <FiPlus size={16} />
                                </motion.span>
                            </button>
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-6 pb-6 pl-20 text-sm text-ink/50 leading-relaxed">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
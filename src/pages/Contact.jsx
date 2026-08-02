import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiClock, FiSend, FiMessageCircle, FiHeadphones } from 'react-icons/fi'
import { SectionHeading } from '../components/ui'
import { useStore } from '../context/StoreContext'

const channels = [
    { icon: FiMail, title: 'Email Us', value: 'support@nexus.store', sub: 'Replies within 24 hours' },
    { icon: FiMessageCircle, title: 'Live Chat', value: 'Available 24/7', sub: 'Average response 2 min' },
    { icon: FiHeadphones, title: 'Call Us', value: '+1 (800) NEXUS-01', sub: 'Mon–Sat, 9am–9pm EST' },
    { icon: FiMapPin, title: 'Visit Us', value: '500 Innovation Drive', sub: 'San Francisco, CA' }
]

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: 'General', message: '' })
    const { addToast } = useStore()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.message) {
            addToast('Please fill in all fields', 'error')
            return
        }
        addToast('Message sent! We\'ll be in touch soon ✨', 'success')
        setForm({ name: '', email: '', subject: 'General', message: '' })
    }

    return (
        <div className="max-w-[1400px] mx-auto px-6 pt-40 pb-20">
            <SectionHeading
                eyebrow="Get In Touch"
                title="We'd Love To Hear From You"
                subtitle="Questions, feedback, or just want to talk tech? Our concierge team is ready 24/7."
            />

            {/* Channels */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
                {channels.map(({ icon: Icon, title, value, sub }, i) => (
                    <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: i * 0.08 }}
                        className="glass rounded-3xl p-6 hover:border-neon/20 hover:shadow-glow transition-all duration-500 group"
                        data-hover
                    >
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-neon to-neon-purple flex items-center justify-center mb-4 shadow-glow group-hover:scale-110 transition-transform">
                            <Icon className="text-ink" size={18} />
                        </div>
                        <h3 className="font-display font-semibold mb-1">{title}</h3>
                        <p className="text-sm text-ink/70 mb-1">{value}</p>
                        <p className="text-xs text-ink/40">{sub}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6 }}
                    className="glass-strong rounded-[2rem] p-8"
                >
                    <h3 className="font-display text-2xl font-bold mb-6">Send A Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div className="relative">
                                <label className="block text-xs text-ink/40 mb-2.5">Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Your name"
                                    className="w-full px-5 py-3.5 rounded-2xl glass bg-transparent text-sm placeholder:text-ink/25 focus:outline-none focus:border-neon/50 transition-colors"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-xs text-ink/40 mb-2.5">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="you@email.com"
                                    className="w-full px-5 py-3.5 rounded-2xl glass bg-transparent text-sm placeholder:text-ink/25 focus:outline-none focus:border-neon/50 transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-ink/40 mb-2.5">Subject</label>
                            <select
                                value={form.subject}
                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                className="w-full px-5 py-3.5 rounded-2xl glass bg-noir text-sm focus:outline-none focus:border-neon/50 transition-colors"
                            >
                                {['General', 'Order Support', 'Returns', 'Partnership', 'Press'].map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-ink/40 mb-2.5">Message</label>
                            <textarea
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                placeholder="How can we help?"
                                rows="5"
                                className="w-full px-5 py-3.5 rounded-2xl glass bg-transparent text-sm placeholder:text-ink/25 focus:outline-none focus:border-neon/50 transition-colors resize-none"
                            />
                        </div>
                        <motion.button
                            type="submit"
                            whileTap={{ scale: 0.97 }}
                            className="w-full py-4 rounded-full bg-gradient-to-r from-neon to-neon-purple font-semibold text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300 flex items-center justify-center gap-2"
                            data-hover
                        >
                            <FiSend size={16} /> Send Message
                        </motion.button>
                    </form>
                </motion.div>

                {/* Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="glass rounded-[2rem] p-8 relative overflow-hidden"
                >
                    <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-neon/10 blur-[80px] pointer-events-none" />
                    <h3 className="font-display text-2xl font-bold mb-6">Frequently Asked</h3>

                    {[
                        { q: 'How fast is shipping?', a: 'Free 2-day shipping on all orders over $1,000. Standard orders arrive in 3–5 business days.' },
                        { q: 'What is your return policy?', a: 'You have 30 days to return any product for a full refund — no questions asked.' },
                        { q: 'Do your products come with warranty?', a: 'Every NEXUS product includes a 2-year manufacturer warranty as standard.' },
                        { q: 'Can I track my order?', a: 'Yes, you\'ll receive tracking updates via email and SMS from the moment your order ships.' }
                    ].map(({ q, a }) => (
                        <div key={q} className="mb-6">
                            <p className="font-semibold text-sm mb-1.5">{q}</p>
                            <p className="text-sm text-ink/40 leading-relaxed">{a}</p>
                        </div>
                    ))}

                    <div className="flex items-center gap-3 p-4 rounded-2xl glass mt-6">
                        <FiClock className="text-neon-light shrink-0" size={18} />
                        <div>
                            <p className="text-sm font-semibold">Business Hours</p>
                            <p className="text-xs text-ink/40">24/7 Support · Live Chat Always On</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
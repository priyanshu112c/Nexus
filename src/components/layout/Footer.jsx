import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiInstagram, FiTwitter, FiYoutube, FiGithub, FiSend, FiShield, FiTruck, FiRefreshCw, FiHeadphones } from 'react-icons/fi'
import { useState } from 'react'
import { useStore } from '../../context/StoreContext'

const footerLinks = {
    Shop: [
        { label: 'All Products', to: '/products' },
        { label: 'Flash Deals', to: '/deals' },
        { label: 'Gaming', to: '/products?category=gaming' },
        { label: 'Audio', to: '/products?category=headphones' },
        { label: 'Wishlist', to: '/wishlist' }
    ],
    Company: [
        { label: 'About NEXUS', to: '/about' },
        { label: 'Contact', to: '/contact' },
        { label: 'FAQ', to: '/faq' },
        { label: 'Careers', to: '/about' },
        { label: 'Press', to: '/about' }
    ],
    Support: [
        { label: 'Help Center', to: '/faq' },
        { label: 'Shipping Info', to: '/faq' },
        { label: 'Returns & Refunds', to: '/faq' },
        { label: 'Warranty', to: '/faq' },
        { label: 'Privacy Policy', to: '/about' }
    ]
}

const socials = [
    { Icon: FiInstagram, label: 'Instagram' },
    { Icon: FiTwitter, label: 'Twitter' },
    { Icon: FiYoutube, label: 'YouTube' },
    { Icon: FiGithub, label: 'GitHub' }
]

export default function Footer() {
    const [email, setEmail] = useState('')
    const { addToast } = useStore()

    const subscribe = (e) => {
        e.preventDefault()
        if (!email.includes('@')) {
            addToast('Please enter a valid email', 'error')
            return
        }
        addToast('Subscribed to NEXUS updates! 🎉', 'success')
        setEmail('')
    }

    return (
        <footer className="relative z-10 mt-24 overflow-hidden">
            {/* Gradient line */}
            <div className="glow-line" />

            {/* Ambient glow */}
            <div
                className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] rounded-full blur-[120px] opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(77,159,255,0.5), transparent 60%)' }}
            />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-10">
                {/* Features strip */}
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-16 sm:mb-20">
                    {[
                        { Icon: FiTruck, title: 'Express Delivery', sub: 'Same-day shipping available' },
                        { Icon: FiShield, title: '2-Year Warranty', sub: 'Extended coverage included' },
                        { Icon: FiRefreshCw, title: '30-Day Returns', sub: 'No questions asked' },
                        { Icon: FiHeadphones, title: '24/7 Support', sub: 'Dedicated concierge line' }
                    ].map(({ Icon, title, sub }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl sm:rounded-2xl glass hover:border-neon/20 transition-colors duration-300 group"
                        >
                            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-neon/20 to-neon-purple/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                                <Icon className="text-neon-light" size={16} />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm font-semibold">{title}</p>
                                <p className="text-[10px] sm:text-xs text-ink/40">{sub}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main footer grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2.5 mb-6">
                            <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
                                <defs>
                                    <linearGradient id="footerGrad" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#4d9fff" />
                                        <stop offset="100%" stopColor="#8b5cf6" />
                                    </linearGradient>
                                </defs>
                                <rect width="100" height="100" rx="24" fill="url(#footerGrad)" opacity="0.1" />
                                <path d="M25 55 L47 33 L57 43 L35 65 Z" fill="url(#footerGrad)" />
                                <path d="M43 55 L60 38 L70 48 L53 65 Z" fill="url(#footerGrad)" opacity="0.7" />
                            </svg>
                            <span className="font-display font-bold text-xl tracking-[0.25em] uppercase">
                                Nex<span className="text-gradient">us</span>
                            </span>
                        </Link>
                        <p className="text-sm text-ink/40 leading-relaxed mb-6 max-w-sm">
                            The future of technology retail. Premium devices, cinematic experiences, and a shopping journey engineered to inspire.
                        </p>

                        {/* Newsletter */}
                        <form onSubmit={subscribe} className="max-w-sm">
                            <p className="text-xs font-semibold tracking-widest uppercase text-ink/50 mb-3">
                                Join the inner circle
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-ink/[0.04] border border-ink/10 placeholder:text-ink/30 text-xs sm:text-sm focus:outline-none focus:border-neon/50 focus:shadow-glow transition-all duration-300"
                                />
                                <motion.button
                                    type="submit"
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-r from-neon to-neon-purple flex items-center justify-center text-ink shadow-glow hover:shadow-glow-lg transition-shadow duration-300 shrink-0"
                                    aria-label="Subscribe"
                                    data-hover
                                >
                                    <FiSend size={15} />
                                </motion.button>
                            </div>
                        </form>

                        {/* Socials */}
                        <div className="flex gap-2.5 mt-8">
                            {socials.map(({ Icon, label }) => (
                                <motion.a
                                    key={label}
                                    href="#"
                                    aria-label={label}
                                    whileHover={{ y: -4, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-ink/60 hover:text-ink hover:border-neon/40 hover:shadow-glow transition-all duration-300"
                                    data-hover
                                >
                                    <Icon size={16} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-semibold tracking-widest uppercase text-ink/60 mb-5">{title}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.to}
                                            className="text-sm text-ink/40 hover:text-neon-light transition-colors duration-300 inline-flex items-center gap-1.5 group"
                                        >
                                            <span className="w-0 group-hover:w-3 h-px bg-neon-light transition-all duration-300" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-ink/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-ink/30">
                        © {new Date().getFullYear()} NEXUS. Crafted for the future. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-ink/30">
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Cookies</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-ink/30">
                        <span className="inline-block w-2 h-2 rounded-full bg-success/ animate-pulse-glow" />
                        All systems operational
                    </div>
                </div>
            </div>

            {/* Giant typography */}
            <div className="relative select-none pointer-events-none">
                <span className="block text-center font-display font-bold uppercase text-[14vw] leading-none text-ink/[0.025] tracking-[0.1em]">
                    Nexus
                </span>
            </div>
        </footer>
    )
}
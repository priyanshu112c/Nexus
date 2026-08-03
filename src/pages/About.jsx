import { motion } from 'framer-motion'
import { FiUsers, FiGlobe, FiAward, FiHeart } from 'react-icons/fi'
import { SectionHeading } from '../components/ui'
import { brands } from '../data'

const stats = [
    { value: '250K+', label: 'Happy Customers' },
    { value: '48', label: 'Countries Served' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '99.9%', label: 'On-Time Delivery' }
]

const values = [
    { icon: FiUsers, title: 'People First', text: 'Every product we ship is backed by humans who genuinely care about your experience.' },
    { icon: FiGlobe, title: 'Global Reach', text: 'From Tokyo to Toronto, we deliver premium technology to 48 countries worldwide.' },
    { icon: FiAward, title: 'Quality Obsessed', text: 'We hand-test every single product that enters our curated collection.' },
    { icon: FiHeart, title: 'Built To Love', text: 'We believe technology should spark joy — not just sit on a desk.' }
]

export default function About() {
    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-28 sm:pt-40 pb-20">
            <SectionHeading
                eyebrow="Our Story"
                title="Redefining How The World Shops For Tech"
                subtitle="We started NEXUS with a single belief — shopping for premium technology should feel as extraordinary as the products themselves."
            />

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-16 sm:mb-24">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center hover:shadow-glow transition-shadow duration-500"
                        data-hover
                    >
                        <p className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-gradient-static mb-2">{stat.value}</p>
                        <p className="text-xs sm:text-sm text-ink/40">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Values */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-24">
                {values.map(({ icon: Icon, title, text }, i) => (
                    <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="relative group glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:border-neon/20 hover:shadow-glow transition-all duration-500"
                        data-hover
                    >
                        <div className="absolute top-0 right-8 w-20 h-20 rounded-full bg-neon/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-neon to-neon-purple flex items-center justify-center mb-4 sm:mb-5 shadow-glow">
                            <Icon className="text-ink" size={16} />
                        </div>
                        <h3 className="font-display text-base sm:text-lg font-bold mb-2">{title}</h3>
                        <p className="text-xs sm:text-sm text-ink/50 leading-relaxed">{text}</p>
                    </motion.div>
                ))}
            </div>

            {/* Brands */}
            <div className="glass-strong rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-12 text-center">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                    Powering The <span className="text-gradient">Future</span>
                </h2>
                <p className="text-ink/40 max-w-xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base">
                    We partner with the most innovative brands on the planet to bring you the very best technology has to offer.
                </p>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    {brands.map((brand, i) => (
                        <motion.div
                            key={brand.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                            className="group flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl glass hover:border-neon/30 transition-all duration-300"
                            data-hover
                        >
                            <img src={brand.image} alt={brand.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span className="font-display font-semibold text-xs sm:text-sm group-hover:text-neon-light transition-colors">{brand.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
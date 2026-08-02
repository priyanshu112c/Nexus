import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { FiArrowRight, FiPlay } from 'react-icons/fi'
import MagneticButton from '../ui/MagneticButton'
import { useTheme } from '../../context/ThemeContext'

/**
 * Reads a CSS variable as an RGB triplet and returns a THREE.Color.
 * Lets the 3D sculpture morph together with the rest of the site when
 * the theme switches.
 */
function themeColor(name) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    const [r, g, b] = raw.split(/\s+/).map(Number)
    return new THREE.Color(`rgb(${r}, ${g}, ${b})`)
}

/** Theme-aware lights — re-computed when the theme switches */
function SceneLights() {
    const { theme } = useTheme()
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} color={themeColor('--c-accent-light')} />
            <pointLight position={[-5, -3, 3]} intensity={2.5} color={themeColor('--c-accent-secondary')} />
            <pointLight position={[4, 2, -4]} intensity={1.5} color={themeColor('--c-accent-glow')} />
        </>
    )
}

/** Abstract 3D product sculpture — rotating glass shape with neon core */
function ProductSculpture() {
    const group = useRef()
    const { theme } = useTheme()

    const accent = useMemo(() => themeColor('--c-accent'), [theme])
    const secondary = useMemo(() => themeColor('--c-accent-secondary'), [theme])
    const core = useMemo(() => themeColor('--c-ink'), [theme])

    useFrame((state) => {
        group.current.rotation.y = state.clock.elapsedTime * 0.25
        group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.15
        group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    })

    return (
        <group ref={group}>
            {/* Main torus knot */}
            <mesh>
                <torusKnotGeometry args={[1.1, 0.32, 220, 32]} />
                <meshPhysicalMaterial
                    color={accent}
                    metalness={0.9}
                    roughness={0.08}
                    transmission={0.6}
                    thickness={0.8}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </mesh>
            {/* Purple accent ring */}
            <mesh rotation={[Math.PI / 2.4, 0, 0]}>
                <torusGeometry args={[1.7, 0.02, 32, 100]} />
                <meshStandardMaterial
                    color={secondary}
                    emissive={secondary}
                    emissiveIntensity={1.5}
                    metalness={0.5}
                    roughness={0.2}
                />
            </mesh>
            {/* Core sphere */}
            <mesh>
                <sphereGeometry args={[0.4, 64, 64]} />
                <meshStandardMaterial
                    color={core}
                    emissive={accent}
                    emissiveIntensity={2.5}
                    roughness={0.05}
                    metalness={0.4}
                />
            </mesh>
        </group>
    )
}

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-36 pb-20">
            {/* Cinematic local ambient */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] rounded-full bg-neon/[0.06] blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] rounded-full bg-neon-purple/[0.06] blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                {/* Left - Text content */}
                <div className="text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-neon/20 mb-8"
                    >
                        <span className="relative flex w-2 h-2">
                            <span className="absolute inline-flex w-full h-full animate-ping bg-neon rounded-full opacity-75" />
                            <span className="relative inline-flex w-2 h-2 bg-neon rounded-full" />
                        </span>
                        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ink/70">
                            The Future Has Arrived
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.35 }}
                        className="font-display font-bold text-5xl md:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6"
                    >
                        Experience
                        <br />
                        <span className="text-gradient">Technology</span>
                        <br />
                        In Motion
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.55 }}
                        className="text-ink/50 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10"
                    >
                        NEXUS is not just a store — it's a cinematic journey through the finest devices ever engineered. Discover, experience, and own the future.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.75 }}
                        className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
                    >
                        <MagneticButton
                            variant="primary"
                            className="group"
                            onClick={() => window.location.href = '/products'}
                        >
                            Explore Collection
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                        </MagneticButton>
                        <MagneticButton
                            variant="ghost"
                            className="group"
                            onClick={() => window.location.href = '/about'}
                        >
                            <FiPlay className="group-hover:scale-110 transition-transform duration-300" />
                            Watch Showcase
                        </MagneticButton>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.1 }}
                        className="grid grid-cols-3 gap-6 mt-14 max-w-md mx-auto lg:mx-0"
                    >
                        {[
                            { value: '500+', label: 'Flagship Devices' },
                            { value: '40+', label: 'Global Brands' },
                            { value: '99.9%', label: 'Delight Rate' }
                        ].map((s) => (
                            <div key={s.label} className="text-center lg:text-left">
                                <p className="font-display text-3xl font-bold text-gradient-static">{s.value}</p>
                                <p className="text-xs text-ink/40 mt-1">{s.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right - 3D product */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="relative h-[420px] md:h-[560px] lg:h-[640px]"
                >
                    <Canvas
                        camera={{ position: [0, 0, 6], fov: 42 }}
                        dpr={[1, 2]}
                        gl={{ antialias: true, alpha: true }}
                    >
                        <SceneLights />
                        <Suspense fallback={null}>
                            <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
                                <ProductSculpture />
                            </Float>
                            <ContactShadows position={[0, -2.3, 0]} opacity={0.4} scale={8} blur={2.5} color="#000" />
                            <Environment preset="city" />
                        </Suspense>
                    </Canvas>

                    {/* Floating badge cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                        className="absolute top-12 left-8 glass rounded-2xl px-5 py-4 shadow-card backdrop-blur-xl"
                    >
                        <p className="text-xs text-ink/40 mb-1">Flagship Launch</p>
                        <p className="font-display font-semibold text-sm">Aura Pro 16″</p>
                        <div className="flex items-center gap-1.5 mt-2">
                            <span className="px-2 py-0.5 rounded-full bg-success/15 text-success/ text-[10px] font-bold border border-success/20">
                                NOW LIVE
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.7, duration: 0.8 }}
                        className="absolute bottom-16 right-6 glass rounded-2xl px-5 py-4 shadow-card backdrop-blur-xl"
                    >
                        <p className="text-xs text-ink/40 mb-1">Up to</p>
                        <p className="font-display text-2xl font-bold text-gradient-static">40% OFF</p>
                        <p className="text-[10px] text-ink/40">Summer Tech Festival</p>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] tracking-[0.3em] uppercase text-ink/30">Scroll</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-0.5 h-10 bg-gradient-to-b from-neon to-transparent"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
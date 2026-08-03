export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                xs: '480px'
            },
            colors: {
                // Semantic surface tokens — values come from CSS variables per theme.
                noir: {
                    DEFAULT: 'rgb(var(--c-base) / <alpha-value>)',
                    900: 'rgb(var(--c-pane) / <alpha-value>)',
                    800: 'rgb(var(--c-pane) / <alpha-value>)',
                    700: 'rgb(var(--c-pane-raised) / <alpha-value>)',
                    600: 'rgb(var(--c-pane-raised) / <alpha-value>)',
                    500: 'rgb(var(--c-pane-hover) / <alpha-value>)'
                },
                // Accent tokens — electric neon in midnight, brand blue in scandi.
                neon: {
                    DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
                    light: 'rgb(var(--c-accent-light) / <alpha-value>)',
                    purple: 'rgb(var(--c-accent-secondary) / <alpha-value>)',
                    'purple-light': 'rgb(var(--c-accent-secondary-light) / <alpha-value>)',
                    glow: 'rgb(var(--c-accent-glow) / <alpha-value>)'
                },
                // Text token (replaces raw `white/xx`).
                ink: {
                    DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)'
                },
                // Overlay scrim (replaces raw `black/xx`).
                night: {
                    DEFAULT: 'rgb(var(--c-night) / <alpha-value>)'
                },
                // Theme-aware status colors.
                danger: 'rgb(var(--c-danger) / <alpha-value>)',
                success: 'rgb(var(--c-success) / <alpha-value>)',
                warning: 'rgb(var(--c-warning) / <alpha-value>)',
                // Legacy aliases kept for continuity.
                graphite: 'rgb(var(--c-graphite) / <alpha-value>)',
                gunmetal: 'rgb(var(--c-gunmetal) / <alpha-value>)'
            },
            fontFamily: {
                display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
                body: ['Inter', 'system-ui', 'sans-serif']
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '3rem'
            },
            boxShadow: {
                glow: 'var(--shadow-glow)',
                'glow-lg': 'var(--shadow-glow-lg)',
                'glow-purple': 'var(--shadow-glow-purple)',
                card: 'var(--shadow-card)',
                'card-hover': 'var(--shadow-card-hover)'
            },
            keyframes: {
                'float-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' }
                },
                'spin-slow': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' }
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: 0.6 },
                    '50%': { opacity: 1 }
                },
                'gradient-move': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' }
                }
            },
            animation: {
                'float-slow': 'float-slow 6s ease-in-out infinite',
                shimmer: 'shimmer 2.5s linear infinite',
                'spin-slow': 'spin-slow 20s linear infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'gradient-move': 'gradient-move 8s ease infinite'
            }
        }
    },
    plugins: []
}
export const categories = [
    {
        id: 'laptops',
        name: 'Laptops',
        tagline: 'Power Redefined',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1600&auto=format&fit=crop',
        count: 48,
        gradient: 'from-blue-500/20 to-purple-500/20'
    },
    {
        id: 'headphones',
        name: 'Audio',
        tagline: 'Hear Everything',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop',
        count: 36,
        gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
        id: 'gaming',
        name: 'Gaming',
        tagline: 'Enter The Arena',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
        count: 42,
        gradient: 'from-red-500/20 to-orange-500/20'
    },
    {
        id: 'monitors',
        name: 'Displays',
        tagline: 'See Beyond',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1600&auto=format&fit=crop',
        count: 28,
        gradient: 'from-cyan-500/20 to-blue-500/20'
    },
    {
        id: 'phones',
        name: 'Phones',
        tagline: 'The Future In Hand',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop',
        count: 32,
        gradient: 'from-emerald-500/20 to-teal-500/20'
    },
    {
        id: 'wearables',
        name: 'Wearables',
        tagline: 'Always Connected',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop',
        count: 24,
        gradient: 'from-amber-500/20 to-yellow-500/20'
    }
]

export const products = [
    {
        id: 1,
        name: 'Aura Pro 16″ Laptop',
        brand: 'NEXUS',
        category: 'laptops',
        price: 2499,
        originalPrice: 2899,
        rating: 4.9,
        reviews: 1234,
        badge: 'Bestseller',
        badgeType: 'blue',
        colors: ['#1e293b', '#334155', '#475569'],
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1200&auto=format&fit=crop'
        ],
        description: 'An ultra-thin workstation-grade laptop with a cinematic 16″ mini-LED display, Mach 3 silicon, and 28 hours of battery. Built for creators who refuse compromise.',
        specs: [
            { name: 'Processor', value: 'Mach 3 Pro (16-core)' },
            { name: 'Display', value: '16″ Mini-LED 120Hz' },
            { name: 'Memory', value: '32GB Unified' },
            { name: 'Storage', value: '1TB NVMe Gen4' },
            { name: 'Battery', value: '28-hour video playback' },
            { name: 'Weight', value: '1.4 kg' }
        ]
    },
    {
        id: 2,
        name: 'Pulse ANC Wireless Headphones',
        brand: 'SONA',
        category: 'headphones',
        price: 349,
        originalPrice: 449,
        rating: 4.8,
        reviews: 2311,
        badge: 'New',
        badgeType: 'purple',
        colors: ['#0f172a', '#312e81', '#6d28d9'],
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop'
        ],
        description: 'Flagship active noise cancellation with adaptive soundscapes, studio-grade drivers, and spatial audio engineered for total immersion.',
        specs: [
            { name: 'Driver', value: '40mm Beryllium' },
            { name: 'ANC', value: 'Adaptive -42dB' },
            { name: 'Battery', value: '60 hours' },
            { name: 'Codecs', value: 'LDAC, aptX HD' },
            { name: 'Weight', value: '254 g' }
        ]
    },
    {
        id: 3,
        name: 'Vortex RGB Mechanical Keyboard',
        brand: 'KEYFORT',
        category: 'gaming',
        price: 189,
        originalPrice: 229,
        rating: 4.7,
        reviews: 876,
        badge: 'Hot',
        badgeType: 'blue',
        colors: ['#0f172a', '#1e1b4b'],
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1200&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1585076641399-5c06e1b7c022?q=80&w=1200&auto=format&fit=crop'
        ],
        description: 'A gasket-mounted 75% powerhouse with linear optical switches, tri-mode connectivity, and per-key RGB with reactive lighting.',
        specs: [
            { name: 'Switches', value: 'Optical Linear' },
            { name: 'Layout', value: '75% Gasket' },
            { name: 'Polling', value: '8000Hz' },
            { name: 'Connectivity', value: 'Tri-mode' },
            { name: 'Battery', value: '4000mAh' }
        ]
    },
    {
        id: 4,
        name: 'UltraView 32″ 4K OLED Monitor',
        brand: 'VISTA',
        category: 'monitors',
        price: 1299,
        originalPrice: 1499,
        rating: 4.9,
        reviews: 654,
        badge: 'Premium',
        badgeType: 'purple',
        colors: ['#0f172a', '#1e293b'],
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1547119957-637f8679db1e?q=80&w=1200&auto=format&fit=crop'
        ],
        description: 'A 32″ true-black OLED masterpiece with 1000 nits peak brightness, 240Hz refresh, and color accuracy beyond cinema standards.',
        specs: [
            { name: 'Panel', value: '32″ QD-OLED' },
            { name: 'Refresh', value: '240Hz' },
            { name: 'Response', value: '0.03ms GtG' },
            { name: 'HDR', value: 'DisplayHDR 1000' },
            { name: 'Color', value: '99% DCI-P3' }
        ]
    },
    {
        id: 5,
        name: 'Nova X Pro Smartphone',
        brand: 'PRISM',
        category: 'phones',
        price: 1099,
        originalPrice: 1199,
        rating: 4.6,
        reviews: 1876,
        badge: 'Flagship',
        badgeType: 'blue',
        colors: ['#0f172a', '#064e3b', '#1e1b4b'],
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop'
        ],
        description: 'A titanium-framed flagship with a 200MP triple camera system, bendable LTPO display, and 100W hyper charge.',
        specs: [
            { name: 'Display', value: '6.8″ LTPO 1-120Hz' },
            { name: 'Camera', value: '200MP Triple' },
            { name: 'Chip', value: 'Titanium X1' },
            { name: 'Battery', value: '5500mAh 100W' },
            { name: 'Build', value: 'Grade 5 Titanium' }
        ]
    },
    {
        id: 6,
        name: 'PulseFit Elite Smartwatch',
        brand: 'ONYX',
        category: 'wearables',
        price: 449,
        originalPrice: 529,
        rating: 4.7,
        reviews: 998,
        badge: 'New',
        badgeType: 'purple',
        colors: ['#0f172a', '#1e293b', '#334155'],
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=1200&auto=format&fit=crop'
        ],
        description: 'Sapphire glass, dual-band GPS, and a health suite that monitors ECG, blood oxygen, and recovery — elegance engineered.',
        specs: [
            { name: 'Display', value: '1.43″ AMOLED' },
            { name: 'Sensors', value: 'ECG + SpO2' },
            { name: 'Battery', value: '14 days' },
            { name: 'Rating', value: '10ATM' },
            { name: 'Case', value: 'Titanium' }
        ]
    },
    {
        id: 7,
        name: 'Apex ROG Gaming Laptop',
        brand: 'RIVEN',
        category: 'gaming',
        price: 3299,
        originalPrice: 3599,
        rating: 4.8,
        reviews: 745,
        badge: 'Limited',
        badgeType: 'blue',
        colors: ['#0f172a', '#2e1065'],
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1603481546238-487240415921?q=80&w=1200&auto=format&fit=crop'
        ],
        description: 'Desktop-class performance meets liquid metal cooling. A 18″ 4K 240Hz beast with a 4090-class GPU.',
        specs: [
            { name: 'GPU', value: 'RTX 4090 16GB' },
            { name: 'Display', value: '18″ 4K 240Hz' },
            { name: 'Cooling', value: 'Liquid Metal' },
            { name: 'Keyboard', value: 'Per-key RGB' },
            { name: 'Audio', value: 'Dolby Atmos' }
        ]
    },
    {
        id: 8,
        name: 'EchoStudio Pro Speakers',
        brand: 'SONA',
        category: 'headphones',
        price: 799,
        originalPrice: 899,
        rating: 4.9,
        reviews: 432,
        badge: 'Premium',
        badgeType: 'purple',
        colors: ['#0f172a', '#1e1b4b'],
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1200&auto=format&fit=crop'
        ],
        description: 'Room-filling 360° sound with a 6.5″ woven driver and adaptive room correction. Your personal concert hall.',
        specs: [
            { name: 'Driver', value: '6.5″ Woven' },
            { name: 'Power', value: '200W RMS' },
            { name: 'Connectivity', value: 'Wi-Fi 6 + BT' },
            { name: 'Audio', value: '360° Spatial' },
            { name: 'Frequency', value: '28Hz - 40kHz' }
        ]
    },
    {
        id: 9,
        name: 'AeroMax Gaming Chair',
        brand: 'RIVEN',
        category: 'gaming',
        price: 549,
        originalPrice: 649,
        rating: 4.6,
        reviews: 523,
        badge: 'Popular',
        badgeType: 'blue',
        colors: ['#0f172a', '#111827', '#1e1b4b'],
        image: 'https://images.unsplash.com/photo-1588751866526-6d9124bd590f?q=80&w=1200&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1588751866526-6d9124bd590f?q=80&w=1200&auto=format&fit=crop'
        ],
        description: 'Ergonomic memory-foam racing seat with 4D armrests, breathable graphene leather, and a 180° recline.',
        specs: [
            { name: 'Material', value: 'Graphene Leather' },
            { name: 'Armrests', value: '4D Adjustable' },
            { name: 'Recline', value: '90° - 180°' },
            { name: 'Capacity', value: '150 kg' },
            { name: 'Foam', value: 'Cold-Cure Memory' }
        ]
    },
    {
        id: 10,
        name: 'SkyView 4K Drone',
        brand: 'AERIS',
        category: 'phones',
        price: 1399,
        originalPrice: 1599,
        rating: 4.8,
        reviews: 312,
        badge: 'Flagship',
        badgeType: 'purple',
        colors: ['#0f172a', '#1e293b'],
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop'
        ],
        description: 'A 5.4K cinema drone with 3-axis gimbal, obstacle avoidance, and 40-minute flight time. The sky, mastered.',
        specs: [
            { name: 'Camera', value: '5.4K 3-Axis' },
            { name: 'Range', value: '15 km' },
            { name: 'Flight', value: '40 minutes' },
            { name: 'Sensors', value: 'Omnidirectional' },
            { name: 'Speed', value: '72 km/h Sport' }
        ]
    },
    {
        id: 11,
        name: 'MirrorCam DSLR Camera',
        brand: 'LUMIX',
        category: 'monitors',
        price: 1899,
        originalPrice: 2099,
        rating: 4.9,
        reviews: 267,
        badge: 'Pro',
        badgeType: 'blue',
        colors: ['#0f172a', '#111827'],
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop'
        ],
        description: 'A 61MP full-frame camera with AI autofocus and triple-card workflow. Capture reality at its finest.',
        specs: [
            { name: 'Sensor', value: '61MP FF BSI' },
            { name: 'ISO', value: '50 - 204800' },
            { name: 'AF', value: 'AI 759-point' },
            { name: 'Video', value: '8K 30p' },
            { name: 'Stabilization', value: '8-Stop IBIS' }
        ]
    }
]

export const brands = [
    { name: 'Apple', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=400&auto=format&fit=crop', tag: 'Think Different' },
    { name: 'Sony', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=400&auto=format&fit=crop', tag: 'Make Believe' },
    { name: 'Samsung', image: 'https://images.unsplash.com/photo-1601303516530-8b9a3028e6e7?q=80&w=400&auto=format&fit=crop', tag: 'Do What You Can\'t' },
    { name: 'Nothing', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400&auto=format&fit=crop', tag: 'Pure. Flawless.' },
    { name: 'Nike', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop', tag: 'Just Do It' },
    { name: 'Adidas', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400&auto=format&fit=crop', tag: 'Impossible Is Nothing' },
    { name: 'Logitech', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=400&auto=format&fit=crop', tag: 'Design To Amaze' },
    { name: 'ASUS', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=400&auto=format&fit=crop', tag: 'In Search Of Incredible' }
]

export const reviews = [
    {
        id: 1,
        name: 'Aarav Mehta',
        role: 'Creative Director',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=12',
        text: 'The Aura Pro is a beast. The display is cinematic and the build feels like a luxury object. NEXUS delivers an experience, not just a product.'
    },
    {
        id: 2,
        name: 'Sophia Chen',
        role: 'Sound Engineer',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=47',
        text: 'I\'ve tested every flagship headphone on the market. The Pulse ANC is on another level — the soundstage is unreal for the price.'
    },
    {
        id: 3,
        name: 'Liam Rodriguez',
        role: 'Pro Gamer',
        rating: 4.5,
        avatar: 'https://i.pravatar.cc/150?img=68',
        text: 'The Apex laptop crushes every title at max settings. The 240Hz panel with G-Sync is buttery smooth. Zero regrets.'
    },
    {
        id: 4,
        name: 'Emma Thompson',
        role: 'Photographer',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=32',
        text: 'The UltraView OLED monitor made color grading effortless. 1000 nits of truth. My studio upgraded overnight.'
    },
    {
        id: 5,
        name: 'Rohan Kapoor',
        role: 'Tech Reviewer',
        rating: 4.5,
        avatar: 'https://i.pravatar.cc/150?img=59',
        text: 'From unboxing to setup, everything feels premium. The floating animations and UI are unlike anything I\'ve reviewed.'
    },
    {
        id: 6,
        name: 'Isabella Rossi',
        role: 'Product Designer',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=24',
        text: 'Ordered the Nova X Pro and it arrived in beautiful packaging. Fast shipping, flawless display, incredible battery life.'
    }
]

export const deals = [
    {
        id: 1,
        productId: 1,
        title: 'Aura Pro 16″',
        originalPrice: 2899,
        price: 1999,
        discount: 31,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop',
        ends: Date.now() + 1000 * 60 * 60 * 36
    },
    {
        id: 2,
        productId: 2,
        title: 'Pulse ANC Wireless',
        originalPrice: 449,
        price: 279,
        discount: 38,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
        ends: Date.now() + 1000 * 60 * 60 * 24
    },
    {
        id: 3,
        productId: 4,
        title: 'UltraView 32″ OLED',
        originalPrice: 1499,
        price: 999,
        discount: 33,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop',
        ends: Date.now() + 1000 * 60 * 60 * 12
    }
]

export const aiRecommendations = [
    {
        id: 1,
        title: 'Because you viewed',
        product: 'Aura Pro 16″ Laptop',
        match: '98%',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop',
        reason: 'Matches your preferred display & performance profile'
    },
    {
        id: 2,
        title: 'Perfect pairing',
        product: 'PulseFit Elite Watch',
        match: '94%',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
        reason: 'Completes your NEXUS ecosystem setup'
    },
    {
        id: 3,
        title: 'Trending for you',
        product: 'Vortex RGB Keyboard',
        match: '91%',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop',
        reason: 'Popular with other Aura Pro owners'
    }
]

export const trendingSearches = [
    'Aura Pro',
    'Wireless Headphones',
    'OLED Monitor',
    'Mechanical Keyboard',
    'Gaming Laptop',
    '4K Drone'
]

export const faqs = [
    {
        category: 'Shipping',
        question: 'How fast is NEXUS shipping?',
        answer: 'Orders placed before 8 PM ship the same day. Standard delivery arrives in 2-4 business days, while NEXUS Express delivers in 24 hours to metro cities.'
    },
    {
        category: 'Returns',
        question: 'What is your return policy?',
        answer: 'We offer a 30-day no-questions-asked return policy on all items. Products must be in original condition with all accessories and packaging.'
    },
    {
        category: 'Warranty',
        question: 'Do you offer warranty on products?',
        answer: 'Every product includes a minimum 1-year manufacturer warranty. Premium members receive extended 3-year coverage at no extra cost on select items.'
    },
    {
        category: 'Shipping',
        question: 'Can I track my order in real time?',
        answer: 'Absolutely. Once your order ships, you\'ll receive a tracking link with live GPS updates. You can also track orders in your NEXUS account.'
    },
    {
        category: 'Payment',
        question: 'Are your products authentic?',
        answer: 'Yes. Every product sold on NEXUS is 100% authentic and sourced directly from authorized brand distributors.'
    }
]

export const formatPrice = (price) => `$${price.toLocaleString('en-US')}`
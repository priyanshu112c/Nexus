import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('nexus-cart')
        return stored ? JSON.parse(stored) : []
    })
    const [wishlist, setWishlist] = useState(() => {
        const stored = localStorage.getItem('nexus-wishlist')
        return stored ? JSON.parse(stored) : []
    })
    const [cartOpen, setCartOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [quickView, setQuickView] = useState(null)
    const [toasts, setToasts] = useState([])

    useEffect(() => {
        localStorage.setItem('nexus-cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        localStorage.setItem('nexus-wishlist', JSON.stringify(wishlist))
    }, [wishlist])

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now() + Math.random()
        setToasts((prev) => [...prev, { id, message, type }])
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 3500)
    }, [])

    const addToCart = useCallback(
        (product, qty = 1) => {
            setCart((prev) => {
                const existing = prev.find((item) => item.id === product.id)
                if (existing) {
                    return prev.map((item) =>
                        item.id === product.id ? { ...item, qty: item.qty + qty } : item
                    )
                }
                return [...prev, { ...product, qty }]
            })
            addToast(`${product.name} added to cart`, 'success')
        },
        [addToast]
    )

    const removeFromCart = useCallback((id) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }, [])

    const updateQty = useCallback((id, qty) => {
        if (qty <= 0) {
            setCart((prev) => prev.filter((item) => item.id !== id))
            return
        }
        setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty } : item)))
    }, [])

    const clearCart = useCallback(() => {
        setCart([])
    }, [])

    const toggleWishlist = useCallback(
        (product) => {
            setWishlist((prev) => {
                const exists = prev.some((item) => item.id === product.id)
                if (exists) {
                    addToast(`${product.name} removed from wishlist`, 'info')
                    return prev.filter((item) => item.id !== product.id)
                }
                addToast(`${product.name} added to wishlist`, 'success')
                return [...prev, product]
            })
        },
        [addToast]
    )

    const isInWishlist = useCallback(
        (id) => wishlist.some((item) => item.id === id),
        [wishlist]
    )

    const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart])
    const cartTotal = useMemo(
        () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
        [cart]
    )

    const value = useMemo(
        () => ({
            cart,
            wishlist,
            cartOpen,
            searchOpen,
            quickView,
            toasts,
            cartCount,
            cartTotal,
            setCartOpen,
            setSearchOpen,
            setQuickView,
            addToast,
            addToCart,
            removeFromCart,
            updateQty,
            clearCart,
            toggleWishlist,
            isInWishlist
        }),
        [
            cart,
            wishlist,
            cartOpen,
            searchOpen,
            quickView,
            toasts,
            cartCount,
            cartTotal,
            addToast,
            addToCart,
            removeFromCart,
            updateQty,
            clearCart,
            toggleWishlist,
            isInWishlist
        ]
    )

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
    const context = useContext(StoreContext)
    if (!context) {
        throw new Error('useStore must be used within StoreProvider')
    }
    return context
}
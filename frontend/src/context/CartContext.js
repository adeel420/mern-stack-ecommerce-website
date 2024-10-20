import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch cart based on logged-in user token
        const fetchCart = () => {
            if (token) {
                const userCart = localStorage.getItem(`cart_${token}`); // Save cart with user-specific key
                if (userCart) {
                    setCart(JSON.parse(userCart));
                }
            }
        };

        fetchCart();
    }, [token]);

    // Sync cart with localStorage when it changes
    useEffect(() => {
        if (token && cart.length > 0) {
            localStorage.setItem(`cart_${token}`, JSON.stringify(cart));
        }
    }, [cart, token]);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the Cart context
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

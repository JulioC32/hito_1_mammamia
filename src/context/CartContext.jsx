import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addProduct = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p =>
          p.id === product.id ? { ...p, count: p.count + 1 } : p
        );
      }
      return [...prev, { ...product, count: 1 }];
    });
  };

  const increaseCount = (id) => {
    setCart(prev =>
      prev.map(p => (p.id === id ? { ...p, count: p.count + 1 } : p))
    );
  };

  const decreaseCount = (id) => {
    setCart(prev =>
      prev
        .map(p => (p.id === id ? { ...p, count: p.count - 1 } : p))
        .filter(p => p.count > 0)
    );
  };

  const removeProduct = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const total = cart.reduce((acc, p) => acc + p.price * p.count, 0);

  return (
    <CartContext.Provider
      value={{ cart, addProduct, increaseCount, decreaseCount, removeProduct, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

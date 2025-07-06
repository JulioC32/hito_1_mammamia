import { createContext, useContext, useState, useEffect } from 'react';

export const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
  // Estado carrito
  const [cart, setCart] = useState([]);

  // Estado pizzas (fetch)
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pizzas al montar
  useEffect(() => {
    const fetchPizzas = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/pizzas');
        if (!res.ok) throw new Error('Error al obtener las pizzas');
        const data = await res.json();
        setPizzas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  // Funciones carrito
  const addToCart = (pizza) => {
    const existing = cart.find(item => item.id === pizza.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...pizza, quantity: 1 }]);
    }
  };

  const removeFromCart = (pizzaId) => {
    setCart(cart.filter(item => item.id !== pizzaId));
  };

  const increaseQty = (pizzaId) => {
    setCart(cart.map(item =>
      item.id === pizzaId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQty = (pizzaId) => {
    setCart(cart.map(item =>
      item.id === pizzaId
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <PizzaContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        pizzas,
        loading,
        error
      }}
    >
      {children}
    </PizzaContext.Provider>
  );
};

export const usePizzaContext = () => useContext(PizzaContext);


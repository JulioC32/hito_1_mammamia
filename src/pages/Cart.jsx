import React, { useState } from 'react';
import { usePizzaContext } from '../context/PizzaContext';
import { useUserContext } from '../context/UserContext';
import '../index.css';

const Cart = () => {
  const { cart, increaseCount, decreaseCount, total, clearCart } = usePizzaContext();
  const { token } = useUserContext();
  const [message, setMessage] = useState('');

  const handlePay = async () => {
    if (!token) {
      setMessage('Debes iniciar sesión para realizar el pago.');
      return;
    }

    if (cart.length === 0) {
      setMessage('Tu carrito está vacío.');
      return;
    }

    try {
      const response = await fetch('/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cart }),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la compra.');
      }

      // Suponemos que el backend devuelve algún dato útil
      const data = await response.json();

      setMessage('Gracias por su compra. ¡Pago realizado con éxito!');
      clearCart();
    } catch (error) {
      setMessage(error.message || 'Error en la compra. Intenta nuevamente.');
    }
  };

  if (cart.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <div className="cart-container">
      <h2>🛒 Tu Carrito</h2>

      <ul className="cart-list">
        {cart.map(({ id, img, name, price, count }) => (
          <li key={id} className="cart-item">
            <img src={img} alt={name} className="cart-img" />
            <div className="cart-info">
              <h4 className="text-capitalize">{name}</h4>
              <p>Precio unitario: ${price.toLocaleString()}</p>
              <p>Cantidad: {count}</p>
              <div className="btn-count">
                <button className="btn-minus" onClick={() => decreaseCount(id)}>-</button>
                <button className="btn-plus" onClick={() => increaseCount(id)}>+</button>
              </div>
              <p className="fw-bold">Subtotal: ${(price * count).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>

      <h3>Total: ${total.toLocaleString()}</h3>

      <button className="btn-pay" onClick={handlePay} disabled={!token}>
        Pagar
      </button>

      {message && <p className={`mt-2 ${message.includes('éxito') ? 'text-success' : 'text-danger'}`}>{message}</p>}

      {!token && (
        <p className="text-danger mt-2">⚠️ Debes iniciar sesión para realizar el pago.</p>
      )}
    </div>
  );
};

export default Cart;

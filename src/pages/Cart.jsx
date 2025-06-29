import React, { useState } from 'react';
import { pizzas as initialCart } from '../components/pizzas';
import '../index.css';

const Cart = () => {
  const [cart, setCart] = useState(initialCart);

  const increaseCount = (id) => {
    setCart((prev) =>
      prev.map((pizza) =>
        pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza
      )
    );
  };

  const decreaseCount = (id) => {
    setCart((prev) =>
      prev
        .map((pizza) =>
          pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza
        )
        .filter((pizza) => pizza.count > 0)
    );
  };

  const total = cart.reduce((acc, pizza) => acc + pizza.price * pizza.count, 0);

  const handlePay = () => {
    alert(`Gracias por su compra. Total a pagar: $${total.toLocaleString()}`);
    setCart([]); // Limpia el carrito al pagar
  };

  if (cart.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <div className="cart-container">
      <h2>🛒 Detalles del pedido:</h2>
      <ul className="cart-list">
        {cart.map(({ id, img, name, price, count }) => (
          <li key={id} className="cart-item">
            <img src={img} alt={name} className="cart-img" />
            <div className="cart-info">
              <h4 className="text-capitalize">{name}</h4>
              <p>Precio unitario: ${price.toLocaleString()}</p>
              <p>Cantidad: {count}</p>
              <div className="btn-count">
                <button className="btn-minus" onClick={() => decreaseCount(id)}>
                  -
                </button>
                <button className="btn-plus" onClick={() => increaseCount(id)}>
                  +
                </button>
              </div>
              <p className="fw-bold">
                Subtotal: ${(price * count).toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <h2>Total: ${total.toLocaleString()}</h2>
      <button className="btn-pay" onClick={handlePay}>
        Pagar
      </button>
    </div>
  );
};

export default Cart;

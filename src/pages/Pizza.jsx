import React from 'react';
import { useParams } from 'react-router-dom';
import { usePizzaContext } from '../context/PizzaContext';
import '../index.css';

const Pizza = () => {
  const { id } = useParams();
  const { pizzas, loading, error } = usePizzaContext();

  if (loading) return <p>Cargando pizza...</p>;
  if (error) return <p>Error: {error}</p>;

  // Buscar la pizza por id en el array de pizzas
  const pizza = pizzas.find((p) => p.id === id);

  if (!pizza) return <p>No se encontró la pizza.</p>;

  return (
    <div className="pizza-detail">
      <h2>{pizza.name}</h2>
      <img src={pizza.img} alt={pizza.name} className="pizza-img" />
      <p>{pizza.desc}</p>

      <h4>Ingredientes:</h4>
      <ul>
        {pizza.ingredients.map((ingredient, idx) => (
          <li key={idx}>🍕 {ingredient}</li>
        ))}
      </ul>

      <p>
        <strong>Precio:</strong> ${pizza.price.toLocaleString()}
      </p>

      <button disabled>Añadir al carrito</button>
    </div>
  );
};

export default Pizza;




import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { usePizzaContext } from '../context/PizzaContext';
import '../index.css';

const CardPizza = ({ pizza }) => {
  const [expanded, setExpanded] = useState(false);
  const { addToCart } = usePizzaContext(); // ⬅️ accedemos al contexto

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="pizza-card-container" style={{ height: '100%' }}>
      <div className="pizza-card">
        <img className="pizza-image border rounded" src={pizza.img} alt={pizza.name} />
        <h2 className="pizza-title">{pizza.name}</h2>

        <div className={`description-container ${expanded ? 'expanded' : ''}`}>
          <p className="description-pizza">{pizza.desc}</p>
          <button className="see-more" onClick={toggleDescription}>
            {expanded ? '↑ Mostrar menos' : '↓ Ver más'}
          </button>
        </div>

        <hr />
        <p className="ingredients">🍕 {pizza.ingredients.join(' ')}</p>
        <hr />
        <p className="price fw-bold">Precio: ${pizza.price.toLocaleString()}</p>

        <div className="btn-section">
          <button className="ver-mas-btn">Ver más 👀</button>
          <button className="anadir-btn" onClick={() => addToCart(pizza)}>
            Añadir 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

CardPizza.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    img: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardPizza;

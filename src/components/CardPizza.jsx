import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../index.css';

const CardPizza = ({ name, price, ingredients, img, desc }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="pizza-card-container" style={{height: '100%'}}>
      <div className="pizza-card">
        <img className="pizza-image border rounded" src={img} alt={name} />
        <h2 className="pizza-title">{name}</h2>

        <div className={`description-container ${expanded ? 'expanded' : ''}`}>
          <p className="description-pizza">{desc}</p>
          <button className="see-more" onClick={toggleDescription}>
            {expanded ? '↑ Mostrar menos' : '↓ Ver más'}
          </button>
        </div>

        <hr />
        <p className="ingredients">🍕 {ingredients.join(' ')}</p>
        <hr />
        <p className="price fw-bold">Precio: ${price.toLocaleString()}</p>

        <div className="btn-section">
          <button className="ver-mas-btn">Ver más 👀</button>
          <button className="anadir-btn">Añadir 🛒</button>
        </div>
      </div>
    </div>
  );
};

CardPizza.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default CardPizza;

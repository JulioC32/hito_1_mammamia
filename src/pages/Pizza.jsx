import { useEffect, useState } from "react";
import "../index.css";

const Pizza = () => {
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pizzas/p001");
        if (!res.ok) throw new Error("Error al obtener la pizza");
        const data = await res.json();
        setPizza(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, []);

  if (loading) return <p>Cargando pizza...</p>;
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
        <strong>Precio:</strong> ${pizza.price}
      </p>

      <button disabled>Añadir al carrito</button>
    </div>
  );
};

export default Pizza;


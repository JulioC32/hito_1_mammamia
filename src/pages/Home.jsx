import React from 'react';
import CardPizza from '../components/CardPizza';
import Header from '../components/Header';
import { usePizzaContext } from '../context/PizzaContext';
import '../index.css';

const Home = () => {
  const { pizzas, loading, error } = usePizzaContext();

  if (loading) return <p>Cargando pizzas...</p>;
  if (error) return <p>Error al cargar pizzas: {error}</p>;

  return (
    <>
      <Header />
      <main className="pizza-grid">
        {pizzas.map((pizza) => (
          <CardPizza key={pizza.id} pizza={pizza} />
        ))}
      </main>
    </>
  );
};

export default Home;


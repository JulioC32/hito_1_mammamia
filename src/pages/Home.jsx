import { useEffect, useState } from 'react';
import CardPizza from '../components/CardPizza';
import Header from '../components/Header';
import '../index.css';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/pizzas');
        const data = await res.json();
        setPizzas(data);
      } catch (error) {
        console.error('Error al obtener las pizzas:', error);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <>
      <Header />
      <main className="pizza-grid">
        {pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            name={pizza.name}
            price={pizza.price}
            ingredients={pizza.ingredients}
            img={pizza.img}
            desc={pizza.desc}
          />
        ))}
      </main>
    </>
  );
};

export default Home;

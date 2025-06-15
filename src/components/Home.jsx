import CardPizza from './CardPizza';
import Header from './Header';
import { pizzas } from './pizzas';
import '../index.css';

const Home = () => {
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

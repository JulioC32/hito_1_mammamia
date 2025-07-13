import { Link, useNavigate } from 'react-router-dom';
import { usePizzaContext } from '../context/PizzaContext';
import { useUserContext } from '../context/UserContext'; 

const Navbar = () => {
  const { cart } = usePizzaContext();
  const { token, logout } = useUserContext(); // ✅ Obtenemos token y logout
  const navigate = useNavigate();

  // Calculamos total en precio y cantidad
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <nav className="navbar bg-dark px-4">
      <div className="d-flex align-items-center w-100 justify-content-between">
        <div className="d-flex align-items-center gap-4">
          <span className="text-white fw-bold fs-5">🍕 Pizzería Mamma Mia!</span>

          <Link to="/" className="btn btn-outline-light">Home</Link>

          {token ? (
            <>
              <Link to="/profile" className="btn btn-outline-light">🔓 Profile</Link>
              <button className="btn btn-outline-light" onClick={logout}>🔒 Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light">🔐 Login</Link>
              <Link to="/register" className="btn btn-outline-light">📝 Register</Link>
            </>
          )}
        </div>

        <div>
          <button className="btn btn-outline-light" onClick={goToCart}>
            🛒 {totalItems} {totalItems === 1 ? 'producto' : 'productos'} - ${totalPrice.toLocaleString()}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


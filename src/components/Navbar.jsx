import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const total = 25000;
  const token = false;
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <nav className="navbar bg-dark px-4">
      <div className="d-flex align-items-center w-100 justify-content-between">
        <div className="d-flex align-items-center gap-4">
          <span className="text-white fw-bold fs-5">🍕 Pizzería Mamma Mia!</span>

          <Link to="/" className="btn btn-outline-light">
            Home
          </Link>

          {token ? (
            <>
              <Link to="/profile" className="btn btn-outline-light">
                🔓 Profile
              </Link>
              <button className="btn btn-outline-light" onClick={() => alert('Cerrar sesión')}>
                🔒 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light">
                🔐 Login
              </Link>
              <Link to="/register" className="btn btn-outline-light">
                📝 Register
              </Link>
            </>
          )}
        </div>

        <div>
          <button className="btn btn-outline-light" onClick={goToCart}>
            🛒 Total: ${total.toLocaleString()}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

  
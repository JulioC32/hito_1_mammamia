const Navbar = () => {
    const total = 25000;
    const token = false;
  
    return (
      <nav className="navbar bg-dark px-4">
        <div className="d-flex align-items-center w-100 justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <span className="text-white fw-bold fs-5">🍕 Pizzería Mamma Mia!</span>
  
            <button className="btn btn-outline-light">Home</button>
  
            {token ? (
              <>
                <button className="btn btn-outline-light">🔓 Profile</button>
                <button className="btn btn-outline-light">🔒 Logout</button>
              </>
            ) : (
              <>
                <button className="btn btn-outline-light">🔐 Login</button>
                <button className="btn btn-outline-light">📝 Register</button>
              </>
            )}
          </div>

          <div>
            <button className="btn btn-outline-light">
              🛒 Total: ${total.toLocaleString()}
            </button>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  
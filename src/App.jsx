import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUserContext } from './context/UserContext'; // Para usar en Protected/PublicRoute
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Pizza from './pages/Pizza';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import { PizzaProvider } from './context/PizzaContext';
import { UserProvider } from './context/UserContext';

// Componente para rutas privadas
function ProtectedRoute({ children }) {
  const { token } = useUserContext();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

// Componente para rutas públicas (login, register)
function PublicRoute({ children }) {
  const { token } = useUserContext();
  if (token) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <UserProvider>
      <PizzaProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Rutas públicas solo para no autenticados */}
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<Pizza />} />

            {/* Ruta protegida */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </PizzaProvider>
    </UserProvider>
  );
}

export default App;

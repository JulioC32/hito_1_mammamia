// src/components/Profile.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Profile.css'; // opcional para estilos

const Profile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Simulamos obtener el email del "usuario logueado"
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Si no hay usuario, redirigir al login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Elimina datos del usuario y redirige
    localStorage.removeItem('userEmail');
    localStorage.removeItem('tokenLogin'); // si usas token
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <h2>👤 Perfil de Usuario</h2>
      <p>Correo electrónico: <strong>{email}</strong></p>
      <button className="btn-logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;

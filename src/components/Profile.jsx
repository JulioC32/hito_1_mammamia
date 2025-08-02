import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import './Profile.css';

const Profile = () => {
  const { email, token, logout } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <h2>👤 Perfil de Usuario</h2>
      <p>Correo electrónico: <strong>{email || 'Cargando...'}</strong></p>
      <button className="btn-logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;



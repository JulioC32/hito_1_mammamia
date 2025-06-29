import { Link } from 'react-router-dom';
import './NotFound.css'; // Nuevo archivo de estilos

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="anime-text">😵 404 - Página no encontrada</h1>
      <p className="anime-subtext">La ruta que estás buscando no existe o fue movida.</p>
      <Link to="/" className="btn-home">
        🔙 Volver al inicio
      </Link>
      <img
        src="https://i.pinimg.com/originals/b5/17/24/b5172403ee241a32199a2428eaf596f4.gif"
        alt="Not Found Anime"
        className="notfound-img anime-glow"
      />
    </div>
  );
};

export default NotFound;

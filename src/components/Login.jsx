import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!email || !password) {
      setMessage({ type: 'error', text: 'Todos los campos son obligatorios.' });
      return;
    }

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres.' });
      return;
    }

    // Aquí podrías agregar la validación contra una API si lo deseas
    setMessage({ type: 'success', text: '¡Inicio de sesión exitoso!' });

    // Limpiar campos
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {message.text && (
          <p className={`message ${message.type}`}>{message.text}</p>
        )}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;

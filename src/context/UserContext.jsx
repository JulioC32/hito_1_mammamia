import { createContext, useContext, useState } from 'react';


export const UserContext = createContext();

// Provider
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login fallido');
      }

      const data = await response.json();
      setToken(data.token);
      setEmail(data.email);
    } catch (error) {
      console.error('Error en login:', error.message);
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registro fallido');
      }

      const data = await response.json();
      setToken(data.token);
      setEmail(data.email);
    } catch (error) {
      console.error('Error en registro:', error.message);
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
  };

  const getProfile = async () => {
    if (!token) {
      console.warn('No hay token disponible');
      return null;
    }

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo obtener el perfil');
      }

      const profile = await response.json();

      if (profile.email) {
        setEmail(profile.email);
      }

      return profile;
    } catch (error) {
      console.error('Error al obtener el perfil:', error.message);
      return null;
    }
  };

  return (
    <UserContext.Provider
      value={{
        token,
        email,
        login,
        register,
        logout,
        getProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);




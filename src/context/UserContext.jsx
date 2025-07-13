import { createContext, useContext, useState } from 'react';

// Crear el contexto
export const UserContext = createContext();

// Provider
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true); // Estado por defecto

  const logout = () => {
    setToken(false);
  };

  return (
    <UserContext.Provider value={{ token, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

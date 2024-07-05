import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/authService';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect( () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      console.log('No token found');
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    loginService(email, password)
      .then((data) => {
  
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.userInfo.name);
        localStorage.setItem('userFirstName',data.userInfo.firstName);
  
        setUser(data.userInfo);
        setIsAuthenticated(true);
        navigate('/home');
      })
      .catch((error) => {
        console.error('Login error:', error.message);
      });
  };


  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthLogin = () => {
  return useContext(AuthContext);
};

// Login.jsx
import React, { useState } from 'react';
import Input from '../components/Input';
import '../styles/Login.css'; // Import du fichier principal des styles
import { useAuthLogin } from '../context/authContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthLogin();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);


    try {
      login(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Connexion</h2>
        <Input
          type="text"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Entrez votre email"
        />
        <Input
          type="password"
          label="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Entrez votre mot de passe"
        />
        {error && (<span>{error}</span>)}
        <button type="submit" onClick={handleSubmit}>Se connecter</button>
      </form>
    </div>
  );
};

export default Login;

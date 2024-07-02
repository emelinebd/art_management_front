// Login.jsx
import React, { useState } from 'react';
import Input from '../components/Input';
import '../styles/Login.css'; // Import du fichier principal des styles

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour soumettre les données (connexion, validation, etc.)
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Connexion</h2>
        <Input
          type="text"
          label="Nom d'utilisateur"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Entrez votre nom d'utilisateur"
        />
        <Input
          type="password"
          label="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Entrez votre mot de passe"
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;

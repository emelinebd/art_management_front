// src/pages/Users.jsx

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import UserNameDisplay from "../components/UserNameDisplay";
import Button from '../components/Button';
import Alert from '../components/Alert';
import '../styles/Users.css';

const Users = () => {
  const [alert, setAlert] = useState({ type: '', message: '' });

  // Fonction pour afficher une alerte
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: '', message: '' }); // Effacer l'alerte après 5 secondes
    }, 5000);
  };

  // Exemple de déclenchement d'une alerte
  const handleButtonClick = () => {
    showAlert('warning', 'Attention ! Des utilisateurs n’ont pas encore validé leur profil.');
  };

  return (
    <div className="homepage">
      <Sidebar />
      <div className="allcontent">
        <UserNameDisplay/>
        <div className="content">
          <Button text="Ajouter un client" className="button" onClick={handleButtonClick} />
          {alert.message && <Alert type={alert.type} message={alert.message} />}
        </div>
      </div>
    </div>
  );
};

export default Users;

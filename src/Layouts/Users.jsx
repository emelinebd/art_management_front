// src/pages/Users.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UserNameDisplay from "../components/UserNameDisplay";
import Button from '../components/Button';
import Alert from '../components/Alert';
import UserCard from '../components/UserCard';
import '../styles/Users.css';

const users = [
  { name: 'John Doe', email: 'john.doe@example.fr', status: 'Vérifié', boardCount: 10 },
  { name: 'Jane Smith', email: 'jane.smith@example.fr', status: 'En attente', boardCount: 5 },
  // Ajoutez plus d'utilisateurs ici
];

const Users = () => {
  const [alert, setAlert] = React.useState({ type: '', message: '' });

  // Fonction pour afficher une alerte
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: '', message: '' }); // Effacer l'alerte après 5 secondes
    }, 5000);
  };

  return (
    <div className="homepage">
      <Sidebar />
      <div className="allcontent">
        <UserNameDisplay />
        <div className="content">
          <div className="containingbutton">
            <Link to="/add-user" className="button-link">
              <Button text="Ajouter un client" className="button" />
            </Link>
          </div>
          {alert.message && <Alert type={alert.type} message={alert.message} />}
          <div className="user-list">
            {users.map((user, index) => (
              <Link key={index} to={`/users/${encodeURIComponent(user.name)}`} className="user-link">
                <UserCard
                  name={user.name}
                  email={user.email}
                  status={user.status}
                  boardCount={user.boardCount}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;

import React from 'react';
import '../styles/homepage.css';
import SidebarImage from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthLogin } from '../context/authContext.jsx';

const Sidebar = () => {
  const { logout } = useAuthLogin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/home">
          <img src={SidebarImage} alt="Sidebar Image" className="sidebar-image" />
        </Link>
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/home">Tableau de bord</Link></li>
        <li><Link to="/Users">Clients</Link></li>
        <li><Link to="/Paints">Tableaux</Link></li>
      </ul>
      <button className="deconnexion" type="button" onClick={handleLogout}>
        Déconnexion
      </button>
    </div>
  );
};

export default Sidebar;

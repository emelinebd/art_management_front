import React from 'react';
import '../styles/homepage.css';
import SidebarImage from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={SidebarImage} alt="Sidebar Image" className="sidebar-image"/>
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/home">Tableau de bord</Link></li>
        <li><Link to="/Users">Clients</Link></li>
        <li><a href="#">Tableaux</a></li>
      </ul>
      <button className="deconnexion" type="submit">Deconnexion</button>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import '../styles/homepage.css';
import SidebarImage from '../assets/images/logo.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={SidebarImage} alt="Sidebar Image" className="sidebar-image"/>
      </div>
      <ul className="sidebar-menu">
        <li><a href="#">Tableau de bord</a></li>
        <li><a href="#">Clients</a></li>
        <li><a href="#">Tableaux</a></li>
      </ul>
      <button className="deconnexion" type="submit">Deconnexion</button>
    </div>
  );
};

export default Sidebar;

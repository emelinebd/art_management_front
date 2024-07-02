// Homepage.jsx

import React from 'react';
import Sidebar from '../components/Sidebar';
import UserNameDisplay from "../components/UserNameDisplay";
import '../styles/homepage.css'; // Import des styles spécifiques à la page d'accueil

const Homepage = () => {
  return (
    <div className="homepage">
      <Sidebar />
      <div className="allcontent">
        <UserNameDisplay/>
        <div className="content">
          <h1>Juillet 2024</h1>
          <p>This is the main content area where you can display various admin functionalities.</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

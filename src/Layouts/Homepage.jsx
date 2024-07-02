// Homepage.jsx

import React from 'react';
import Sidebar from '../components/Sidebar';
import UserNameDisplay from "../components/UserNameDisplay";
import MonthYearDisplay from "../components/MonthYearDisplay";
import '../styles/homepage.css'; // Import des styles spécifiques à la page d'accueil

const Homepage = () => {
  return (
    <div className="homepage">
      <Sidebar />
      <div className="allcontent">
        <UserNameDisplay/>
        <div className="content">
          <MonthYearDisplay />
          <div className="flex">
            <div className="ca">
              <h2>Chiffre d'affaire</h2>
              <h2 className="paddingbottom">12 789€</h2>
            </div>
            <div className="grid">
              <div className="carre">
                <p>Nombre de vente</p>
                <p className="stat">15 <span className="spancarre">+</span></p>
              </div>
              <div className="carre">
                <p>Acquéreurs</p>
                <p className="stat">4 <span className="spancarre">+</span></p>
              </div>
              <div className="carre">
                <p>Taux d'évolution</p>
                <p className="stat">+11,4 <span className="spancarre">%</span></p>
              </div>
              <div className="carre">
                <p>Certificats générés</p>
                <p className="stat">12 <span className="spancarre">+</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

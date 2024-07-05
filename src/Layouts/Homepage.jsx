import React, {useEffect, useState} from 'react';
import Sidebar from '../components/Sidebar';
import UserNameDisplay from "../components/UserNameDisplay";
import MonthYearDisplay from "../components/MonthYearDisplay";
import { API_URL } from '../services/authService';
import '../styles/homepage.css'; // Import des styles spécifiques à la page d'accueil3


export const getDashboardInfos = async () => {
  const response = await fetch(`${API_URL}/dashboard`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  
  return response.json();
}


const Homepage = () => {

  const [totalCertificates, setTotalCertificates] = useState('');
  const [totalCustomers, setTotalCustomers] = useState('');
  const [totalRevenue, setTotalRevenue] = useState('');
  const [totalSales, setTotalSales] = useState('');
  const [evolution, setEvolution] = useState('');

  useEffect(() => {
    getDashboardInfos()
      .then(data => {
        setTotalCertificates(data.totalCertificates);
        setTotalCustomers(data.totalCustomers);
        setTotalRevenue(data.totalRevenue);
        setTotalSales(data.totalSales);
        setEvolution(data.evolution);
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error.message);
      });
  }, []);



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
              <h2 className="paddingbottom">{totalRevenue}€</h2>
            </div>
            <div className="grid">
              <div className="carre">
                <p>Nombre de vente</p>
                <p className="stat">{totalSales}<span className="spancarre">+</span></p>
              </div>
              <div className="carre">
                <p>Acquéreurs</p>
                <p className="stat">{totalCustomers}<span className="spancarre">+</span></p>
              </div>
              <div className="carre">
                <p>Taux d'évolution</p>
                <p className="stat">{evolution} <span className="spancarre">%</span></p>
              </div>
              <div className="carre">
                <p>Certificats générés</p>
                <p className="stat">{totalCertificates}<span className="spancarre">+</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

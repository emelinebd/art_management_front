import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "../components/Sidebar.jsx";
import UserNameDisplay from "../components/UserNameDisplay.jsx";
import Button from '../components/Button.jsx';
import CustomerPaint from "../components/CustomerPaint.jsx";
import { API_URL } from '../services/authService'; 
import '../styles/User.css';
import '../styles/CustomerPaint.css';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null); 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/customers/${id}`, { 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        
      }
    };

    fetchUser();
  }, [id]); 
  
  const generateCertificate = async (paint_id) => {
    try {
      const response = await fetch(`${API_URL}/certificate/generate`, {
        method: 'POST', // Utilisation de la méthode POST pour créer un certificat
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          paint_id: paint_id,
          customer_id: customer.id // Utilisation de customer.id extrait du state
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      window.location.reload();

    } catch (error) {
      console.error('Error generating certificate:', error.message);
      // Gérer l'erreur ou afficher un message d'erreur à l'utilisateur
    }
  };

  if (!user) {
    return <div>Chargement...</div>; 
  }

  const { customer, totalPaintings, totalCertificates, totalSpent } = user;

  return (
    <div className="homepage">
      <Sidebar />
      <div className="allcontent">
        <UserNameDisplay />
        <div className="content">
          <div className="flex">
            <div className="right">
              <h1>{customer.firstname} {customer.lastname}</h1>
              <div className="InfoUser">
                <p><span className="bold">Adresse email</span> : {customer.email}</p>
                <p><span className="bold">Téléphone</span> : {customer.phone}</p>
                <p><span className="bold">Adresse postale</span> : {customer.address} {customer.postalCode} {customer.town}</p>
              </div>
              <div className="flex statistique">
                <div className="paint">
                  <p>Tableaux</p>
                  <p className="number">{totalPaintings}</p>
                </div>
                <div className="certificate">
                  <p>Certificats</p>
                  <p className="number">{totalCertificates}</p>
                </div>
                <div className="spendmoney">
                  <p>Argents dépensés</p>
                  <p className="number">{totalSpent}€</p>
                </div>
              </div>
            </div>
            <div className="left">
              {customer.Sales && customer.Sales.length > 0 ? (
                customer.Sales.map(sale => (
                  <div key={sale.id} className="paint-card">
                    <div className="tableau-image">
                      <img src={`${API_URL}/${sale.Paint.Images[0].path}`} alt={sale.Paint.Images[0].name}/>
                    </div>
                    <div className="tableau-info">
                      <h2>{sale.Paint.title}</h2>
                      <p><span className="bold">Description</span> : {sale.Paint.description}</p>
                      <p><span className="bold">Artiste</span> : {sale.Paint.artist}</p>
                      <p><span className="bold">Méthode</span> : {sale.Paint.method}</p>
                      <p><span className="bold">Dimensions</span> : {sale.Paint.width} x {sale.Paint.height} cm</p>
                      <p><span className="bold">Prix</span> : {sale.Paint.prize}€</p>
                    </div>
                    {sale.Paint.Certificate !== null ? (
                      <div className='tableau-actions'>
                       <Button text={'Voir le certificat'} onClick={()=>{ window.open(`${API_URL}/${sale.Paint.Certificate.linkPdf}`)}}/>
                      </div>
                    ) : (
                      <div className='tableau-actions'>
                       <Button text={'Générer le certificat'} onClick={()=>{ generateCertificate(sale.Paint.id)}}/>
                       
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>Aucun tableau acheté.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UserNameDisplay from '../components/UserNameDisplay';
import Button from '../components/Button';
import Alert from '../components/Alert';
import UserCard from '../components/UserCard';
import { API_URL } from '../services/authService';
import '../styles/Users.css';

const Users = () => {
  const [customers, setCustomers] = useState([]);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${API_URL}/customers`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers data:', error.message);
        showAlert('error', 'Erreur lors de la récupération des clients.');
      }
    };

    fetchCustomers();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: '', message: '' }); // Effacer l'alerte après 5 secondes
    }, 5000);
  };

  const deleteCustomer = async (customerId) => {
    try {
      const response = await fetch(`${API_URL}/customers/${customerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setCustomers(customers.filter(customer => customer.id !== customerId));
      showAlert('success', 'Utilisateur supprimé avec succès.');
    } catch (error) {
      console.error('Error deleting customer:', error.message);
      showAlert('error', 'Erreur lors de la suppression de l\'utilisateur.');
    }
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
            {customers.map((user, index) => (
              <UserCard
                key={index}
                id={user.id}
                name={user.firstname}
                email={user.email}
                status={user.status}
                boardCount={user.paintingsPurchasedCount}
                onDeleteClick={deleteCustomer} // Assurez-vous que deleteCustomer est passé à UserCard
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;

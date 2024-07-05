import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UserNameDisplay from '../components/UserNameDisplay';
import Button from '../components/Button';
import Alert from '../components/Alert';
import PaintCard from '../components/PaintCard';
import { API_URL } from '../services/authService';
import '../styles/Paints.css'; // Assurez-vous d'importer vos styles CSS

const Paints = () => {
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [paints, setPaints] = useState([]);

  useEffect(() => {
    const fetchPaints = async () => {
      try {
        const response = await fetch(`${API_URL}/paints`, {
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
        setPaints(data);
      } catch (error) {
        console.error('Error fetching paints data:', error.message);
        showAlert('error', 'Erreur lors de la récupération des peintures.');
      }
    };

    fetchPaints();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: '', message: '' }); // Effacer l'alerte après 5 secondes
    }, 5000);
  };

  const deletePaint = async (paintId) => {
    try {
      const response = await fetch(`${API_URL}/paints/${paintId}`, {
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

      setPaints(paints.filter(paint => paint.id !== paintId));
      showAlert('success', 'Tableau supprimé avec succès.');
    } catch (error) {
      console.error('Error deleting paint:', error.message);
      showAlert('error', 'Erreur lors de la suppression du tableau.');
    }
  };

  return (
    <div className="homepage">
      <Sidebar />
      <div className="allcontent">
        <UserNameDisplay />
        <div className="content">
          <div className="containingbutton">
            <Link to="/add-paint" className="button-link">
              <Button text="Ajouter un tableau" className="button" />
            </Link>
          </div>
          {alert.message && <Alert type={alert.type} message={alert.message} />}
          <div className="paint-list">
            {paints.map((paint, index) => (
              <PaintCard
                key={index}
                tableau={paint}
                onModifyClick={() => {
                  showAlert('info', `Modification du tableau "${paint.title}"`);
                }}
                onDeleteClick={deletePaint} // Passer la fonction de suppression à PaintCard
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paints;

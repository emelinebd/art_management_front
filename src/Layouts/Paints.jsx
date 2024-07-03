import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UserNameDisplay from "../components/UserNameDisplay";
import Button from '../components/Button';
import Alert from '../components/Alert';
import PaintCard from '../components/PaintCard';
import '../styles/Paints.css'; // Assurez-vous d'importer vos styles CSS

const paints = [
  {
    id: 1,
    nom: 'Le Jardin des délices',
    numero: '001',
    technique: 'Peinture à l\'huile',
    dimensions: '220 x 195 cm',
    date: '1480-1490',
    image: 'https://example.com/tableau1.jpg',
    imageCount: 5,
    price: 5670,
  },
  {
    id: 2,
    nom: 'La Joconde',
    numero: '002',
    technique: 'Peinture à l\'huile',
    dimensions: '77 x 53 cm',
    date: '1503-1506',
    image: 'https://example.com/tableau2.jpg',
    imageCount: 3,
    price: 8900,
  }
];

const Paints = () => {
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
                  // Logique pour modifier le tableau
                  showAlert('info', `Modification du tableau "${paint.nom}"`);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paints;

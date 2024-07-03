import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "../components/Sidebar.jsx";
import UserNameDisplay from "../components/UserNameDisplay.jsx";
import CustomerPaint from "../components/CustomerPaint.jsx";
import '../styles/User.css';

const users = [
  { name: 'John Doe', email: 'john.doe@example.fr', address: '33 rue de Lille', city:'Lille', zip:'59000', phone: '06 66 66 66 66', paint: '21', certificate:'18', spend:'8 784' },
  { name: 'Jane Smith', email: 'jane.smith@example.fr', address: '45 avenue du Soleil', city:'Lille', zip:'59000', phone: '07 77 77 77 77',paint: '15', certificate:'15', spend:'4 296' },
  // Ajoutez plus d'utilisateurs ici
];

const paints = [
  {
    id: 1,
    nom: 'Le Jardin des délices',
    numero: '001',
    technique: 'Peinture à l\'huile',
    dimensions: '220 x 195 cm',
    date: '1480-1490',
    description: 'Tableau de Jérôme Bosch représentant un jardin fantastique.',
    image: '../assets/images/paint.webp',
  },
  {
    id: 2,
    nom: 'La Joconde',
    numero: '002',
    technique: 'Peinture à l\'huile',
    dimensions: '77 x 53 cm',
    date: '1503-1506',
    description: 'Portrait de Mona Lisa, peint par Léonard de Vinci.',
    image: '../assets/images/paint.webp',
  }
];

const User = () => {
  const { name } = useParams(); // Récupérer le paramètre 'name' depuis l'URL

  // Trouver l'utilisateur correspondant dans la liste
  const user = users.find(user => user.name === decodeURIComponent(name));

  if (!user) {
    return <div>Utilisateur non trouvé</div>; // Gérer le cas où l'utilisateur n'est pas trouvé
  }

  return (
    <div className="homepage">
      <Sidebar />
      <div className="allcontent">
        <UserNameDisplay/>
        <div className="content">
          <div className="flex">
            <div className="right">
              <h1>{user.name}</h1>
              <div className="InfoUser">
                <p><span className="bold">Adresse email</span> : {user.email}</p>
                <p><span className="bold">Téléphone</span> : {user.phone}</p>
                <p><span className="bold">Adresse postale</span> : {user.address} {user.zip} {user.city}</p>
              </div>
              <div className="flex statistique">
                <div className="paint">
                  <p>Tableaux</p>
                  <p className="number"> {user.paint}</p>
                </div>
                <div className="certificate">
                  <p>Certificats</p>
                  <p className="number"> {user.certificate}</p>
                </div>
                <div className="spendmoney">
                  <p>Argents dépensés</p>
                  <p className="number"> {user.spend}€</p>
                </div>
              </div>
            </div>
            <div className="left">
              <CustomerPaint paints={paints} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

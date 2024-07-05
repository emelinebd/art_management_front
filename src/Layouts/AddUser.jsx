import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import '../styles/AddUser.css';
import Sidebar from "../components/Sidebar.jsx";
import UserNameDisplay from "../components/UserNameDisplay.jsx";
import { API_URL } from '../services/authService.js';

export const addUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

const AddUser = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [town, setTown] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [complement, setComplement] = useState('');
  const [Error, setError] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier les champs requis
    let formIsValid = true;

    if (!firstname) {
      setError('Ce champs est requis');
      formIsValid = false;
    } else {
      setError('');
    }
    if (!lastname) {
      setError('Ce champs est requis');
      formIsValid = false;
    } else {
      setError('');
    }
    if (!email) {
      setError('Ce champs est requis');
      formIsValid = false;
    } else {
      setError('');
    }

    if (!phone) {
      setError('Ce champs est requis');
      formIsValid = false;
    } else {
      setError('');
    }

    if (!address) {
      setError('Ce champs est requis');
      formIsValid = false;
    } else {
      setError('');
    }

    if (!town) {
      setError('Ce champs est requis');
      formIsValid = false;
    } else {
      setError('');
    }

    if (!postalCode) {
      setError('Ce champs est requis');
      formIsValid = false;
    } else {
      setError('');
    }

    // Soumettre le formulaire si tous les champs sont valides
    if (formIsValid) {
      const userData = { firstname, lastname, email, phone, address, town, postalCode, complement };

      addUser(userData)
        .then(data => {
          console.log('Client ajouté:', data);
          navigate('/users');
        })
        .catch(error => {
          console.error('Erreur lors de l\'ajout du client:', error.message);
          setError('Erreur lors de l\'ajout du client');
        });
    }
  };

  return (
    <div className="homepage">
      <Sidebar/>
      <div className="allcontent">
        <UserNameDisplay/>
        <div className="content">
          <h1>Ajouter un client</h1>
          <form onSubmit={handleSubmit} className="add-user-form">
            <div className="form-row">
              <Input
                type="text"
                label="Prénom"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="Exemple : Pierre"
                error={Error}
              />
              <Input
                type="text"
                label="Nom"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Exemple : Martin"
              />
            </div>
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Exemple : pierre.martin@exemple.fr"
              error={Error}
            />
            <Input
              type="text"
              label="Téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Exemple : 06 66 66 66 66"
              error={Error}
            />
            <div className="form-row">
              <Input
                type="text"
                label="Adresse"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Exemple : 33 rue de Lille"
                error={Error}
              />
              <Input
                type="text"
                label="Complément"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                placeholder="Exemple : Appt 19 Résidence Boris Vian"
                error={Error}
              />
            </div>
            <div className="form-row">
              <Input
                type="text"
                label="Ville"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                placeholder="Exemple : LILLE"
                error={Error}
              />
              <Input
                type="text"
                label="Code postal"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Exemple : 59000"
                error={Error}
              />
            </div>
            <div className="form-buttons">
              <Button text="Annuler" className="btn-cancel" onClick={() => navigate('/users')}/>
              <Button text="Valider" className="btn-submit" onClick={handleSubmit}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;

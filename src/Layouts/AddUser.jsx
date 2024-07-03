import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import '../styles/AddUser.css';
import Sidebar from "../components/Sidebar.jsx";
import UserNameDisplay from "../components/UserNameDisplay.jsx";

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [complement, setComplement] = useState('');
  const [Error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier les champs requis
    let formIsValid = true;

    if (!name) {
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

    if (!city) {
      setError('Ce champs est requis');
      formIsValid = false;
    } else {
      setError('');
    }

    if (!zip) {
      setError('Ce champs est requis');
      formIsValid = false;
    } else {
      setError('');
    }

    // Soumettre le formulaire si tous les champs sont valides
    if (formIsValid) {
      // Logique pour ajouter le client (par exemple, envoyer les données à une API)
      console.log('Client ajouté:', { name, email, phone, address, city, zip, complement });
      // Après l'ajout, vous pouvez rediriger l'utilisateur vers la liste des utilisateurs
      navigate('/users');
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Exemple : Placeholder"
                error={Error}
              />
              <Input
                type="text"
                label="Label"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Exemple : LILLE"
                error={Error}
              />
              <Input
                type="text"
                label="Code postal"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
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

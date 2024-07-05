import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import '../styles/AddUser.css';
import Sidebar from "../components/Sidebar.jsx";
import UserNameDisplay from "../components/UserNameDisplay.jsx";
import { API_URL } from '../services/authService.js';

const EditUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    town: '',
    postalCode: '',
    complement: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        const { customer } = userData;

        setFormData({
          firstname: customer.firstname || '',
          lastname: customer.lastname || '',
          email: customer.email || '',
          phone: customer.phone || '',
          address: customer.address || '',
          town: customer.town || '',
          postalCode: customer.postalCode || '',
          complement: customer.complement || ''
        });

      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setError('Erreur lors de la récupération des données utilisateur.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Champ avec le name ${name} modifié avec la valeur : ${value}`);
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des données
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.phone || !formData.address || !formData.town || !formData.postalCode) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    console.log('Form data to be submitted:', formData);

    try {
      const response = await fetch(`${API_URL}/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      alert('Informations mises à jour avec succès !');
      navigate('/users');
    } catch (error) {
      console.error('Error updating user data:', error.message);
      setError('Erreur lors de la mise à jour des informations utilisateur.');
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="homepage">
      <Sidebar />
      <div className="allcontent">
        <UserNameDisplay />
        <div className="content">
          <h1>Modifier un client</h1>
          <form onSubmit={handleSubmit} className="add-user-form">
            <div className="form-row">
              <Input
                type="text"
                label="Prénom"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                placeholder="Exemple : Placeholder"
                error={error}
              />
              <Input
                type="text"
                label="Nom"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                placeholder="Exemple : Martin"
                error={error}
              />
            </div>
            <Input
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Exemple : pierre.martin@exemple.fr"
              error={error}
            />
            <Input
              type="text"
              label="Téléphone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Exemple : 06 66 66 66 66"
              error={error}
            />
            <div className="form-row">
              <Input
                type="text"
                label="Adresse"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Exemple : 33 rue de Lille"
                error={error}
              />
              <Input
                type="text"
                label="Complément"
                name="complement"
                value={formData.complement}
                onChange={handleInputChange}
                placeholder="Exemple : Appt 19 Résidence Boris Vian"
                error={error}
              />
            </div>
            <div className="form-row">
              <Input
                type="text"
                label="Ville"
                name="town"
                value={formData.town}
                onChange={handleInputChange}
                placeholder="Exemple : LILLE"
                error={error}
              />
              <Input
                type="text"
                label="Code postal"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="Exemple : 59000"
                error={error}
              />
            </div>
            <div className="form-buttons">
              <Button text="Annuler" className="btn-cancel" onClick={() => navigate('/users')} />
              <Button text="Valider" className="btn-submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

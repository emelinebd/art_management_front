import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import UserNameDisplay from '../components/UserNameDisplay';
import '../styles/AddPainting.css';

// Importation de l'icône de poubelle (exemple avec Font Awesome)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const AddPainting = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [file, setFile] = useState(null); // State pour le fichier sélectionné
  const [dragOver, setDragOver] = useState(false); // State pour la mise en surbrillance de la zone de glisser-déposer
  const navigate = useNavigate();

  // Fonction pour gérer le changement de fichier
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Met à jour le fichier sélectionné dans l'état `file`
  };

  // Fonction pour gérer l'événement de survol lors du glisser-déposer
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true); // Met à jour l'état pour indiquer que l'utilisateur survole la zone
  };

  // Fonction pour gérer l'événement de sortie du survol lors du glisser-déposer
  const handleDragLeave = () => {
    setDragOver(false); // Réinitialise l'état lorsque l'utilisateur ne survole plus la zone
  };

  // Fonction pour gérer le dépôt d'un fichier lors du glisser-déposer
  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]); // Met à jour le fichier sélectionné avec celui déposé
    setDragOver(false); // Réinitialise l'état de survol
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour ajouter le tableau (par exemple, envoyer les données à une API)
    console.log('Tableau ajouté:', { title, method, length, width, creationDate, description, quantity, file });
    // Après l'ajout, vous pouvez rediriger l'utilisateur vers la liste des tableaux
    navigate('/paintings');
  };

  // Fonction pour supprimer le fichier sélectionné
  const handleFileRemove = () => {
    setFile(null); // Réinitialise l'état `file` à `null`
  };

  return (
    <div className="homepage">
      <Sidebar />
      <div className="allcontent">
        <UserNameDisplay />
        <div className="content">
          <h1>Ajouter un Tableau</h1>
          <form onSubmit={handleSubmit} className="add-painting-form">
            <div className="Champs">
              <div className="form-row">
                <Input
                  type="text"
                  label="Titre"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Exemple : Pink Light"
                />
                <Input
                  type="text"
                  label="Méthode"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  placeholder="Exemple : Encre"
                />
              </div>
              <div className="form-row">
                <Input
                  type="text"
                  label="Longueur"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="Exemple : 90"
                />
                <Input
                  type="text"
                  label="Largeur"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="Exemple : 60"
                />
              </div>
              <Input
                type="text"
                label="Date de création"
                value={creationDate}
                onChange={(e) => setCreationDate(e.target.value)}
                placeholder="Exemple : 11/2022"
              />
              <Input
                type="text"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Exemple : Lorem ipsum"
              />
              <Input
                type="text"
                label="Quantité"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Exemple : 30"
              />
            </div>
            <div className="uploadValidate">
              <div
                className={`form-file-upload ${dragOver ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <label htmlFor="file-upload" className="custom-file-upload">
                  <span>Importer un fichier ou déposer le ici</span>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>
              {file && (
                <div className="file-info">
                  <span>{file.name}</span>
                  <FontAwesomeIcon icon={faTrashAlt} onClick={handleFileRemove} className="trash-icon" />
                </div>
              )}
              <div className="form-buttons">
                <Button text="Annuler" className="btn-cancel" onClick={() => navigate('/paintings')} />
                <Button text="Valider" className="btn-submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPainting;

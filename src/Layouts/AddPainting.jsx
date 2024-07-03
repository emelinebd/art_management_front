import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import UserNameDisplay from '../components/UserNameDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/AddPainting.css';

const AddPainting = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [files, setFiles] = useState([]); // State pour les fichiers sélectionnés
  const [dragOver, setDragOver] = useState(false); // State pour la mise en surbrillance de la zone de glisser-déposer
  const navigate = useNavigate();

  // Fonction pour gérer le changement de fichier
  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFiles([...files, ...filesArray]);
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
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]); // Ajoute les fichiers déposés à la liste des fichiers
    setDragOver(false); // Réinitialise l'état de survol
  };

  // Fonction pour gérer la suppression d'un fichier
  const handleFileRemove = (indexToRemove) => {
    const updatedFiles = files.filter((file, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour ajouter les tableaux (envoyer les données à une API, etc.)
    console.log('Tableaux ajoutés:', { title, method, length, width, creationDate, description, quantity, files });
    // Rediriger l'utilisateur vers la liste des tableaux après l'ajout
    navigate('/paintings');
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
                  <span className="btn-choose">Choisir un fichier</span>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple // Permettre le choix de plusieurs fichiers
                  />
                </label>
              </div>
              {files.length > 0 && (
                <div className="file-info">
                  {files.map((file, index) => (
                    <div key={index} className="file-item">
                      <span>{file.name}</span>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => handleFileRemove(index)}
                        className="trash-icon"
                      />
                    </div>
                  ))}
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

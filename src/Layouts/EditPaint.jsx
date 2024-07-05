import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import UserNameDisplay from '../components/UserNameDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/AddPainting.css';
import { API_URL } from '../services/authService';

const updatePaint = (id, paintData) => {
  const formData = new FormData();
  formData.append('title', paintData.title);
  formData.append('description', paintData.description);
  formData.append('method', paintData.method);
  formData.append('width', paintData.width);
  formData.append('height', paintData.height);
  formData.append('prize', paintData.prize);
  formData.append('quantity', 'available');
  formData.append('createdAt', paintData.createdAt);

  if (paintData.files) {
    paintData.files.forEach((file) => {
      formData.append('files', file);
    });
  }

  return fetch(`${API_URL}/paints/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': localStorage.getItem('token')
    },
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.message);
        });
      }
      return response.json();
    });
};

const EditPaint = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    method: '',
    height: '',
    width: '',
    createdAt: '',
    description: '',
    prize: '',
    files: []
  });
  const [dragOver, setDragOver] = useState(false); // Ajouter l'état dragOver
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPainting = async () => {
      try {
        const response = await fetch(`${API_URL}/paints/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const paintingData = await response.json();

        setFormData({
          title: paintingData.title || '',
          method: paintingData.method || '',
          height: paintingData.height || '',
          width: paintingData.width || '',
          createdAt: paintingData.createdAt || '',
          description: paintingData.description || '',
          prize: paintingData.prize || '',
          files: paintingData.Images || []
        });

      } catch (error) {
        console.error('Error fetching painting data:', error.message);
        setError('Erreur lors de la récupération des données du tableau.');
      } finally {
        setLoading(false);
      }
    };

    fetchPainting();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFormData(prevFormData => ({
      ...prevFormData,
      files: [...prevFormData.files, ...filesArray]
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFormData(prevFormData => ({
      ...prevFormData,
      files: [...prevFormData.files, ...droppedFiles]
    }));
    setDragOver(false);
  };

  const handleFileRemove = (indexToRemove) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      files: prevFormData.files.filter((file, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updatePaint(id, formData)
      .then(data => {
        console.log('Peinture mise à jour:', data);
        navigate('/paints');
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la peinture:', error.message);
        setError('Erreur lors de la mise à jour de la peinture.');
      });
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
          <h1>Modifier un Tableau</h1>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit} className="add-painting-form">
            <div className="Champs">
              <div className="form-row">
                <Input
                  type="text"
                  label="Titre"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Exemple : Pink Light"
                  error={error}
                />
                <Input
                  type="text"
                  label="Méthode"
                  name="method"
                  value={formData.method}
                  onChange={handleInputChange}
                  placeholder="Exemple : Encre"
                  error={error}
                />
              </div>
              <div className="form-row">
                <Input
                  type="text"
                  label="Longueur"
                  name="width"
                  value={formData.width}
                  onChange={handleInputChange}
                  placeholder="Exemple : 90"
                  error={error}
                />
                <Input
                  type="text"
                  label="Largeur"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="Exemple : 60"
                  error={error}
                />
              </div>
              <Input
                type="date"
                label="Date de création"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleInputChange}
                placeholder="Exemple : 11/2022"
                error={error}
              />
              <Input
                type="text"
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Exemple : Lorem ipsum"
                error={error}
              />
              <Input
                type="text"
                label="Prix"
                name="prize"
                value={formData.prize}
                onChange={handleInputChange}
                placeholder="Exemple : 30"
                error={error}
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
                    multiple
                  />
                </label>
              </div>
              {formData.files.length > 0 && (
                <div className="file-info">
                  {formData.files.map((file, index) => (
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
                <Button text="Annuler" className="btn-cancel" onClick={() => navigate('/Paints')} />
                <Button text="Valider" className="btn-submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPaint;

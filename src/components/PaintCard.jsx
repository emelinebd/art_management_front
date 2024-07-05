import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PaintCard.css';
import { Link } from 'react-router-dom';
import { API_URL } from '../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PaintCard = ({ tableau, onModifyClick, onDeleteClick }) => {
  const { title, id, method, width, prize, height, createdAt, Images } = tableau;

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le tableau "${title}" ?`)) {
      onDeleteClick(id);
    }
  };

  return (
    <div className="paint-card">
      <div className="paint-image">
        {Images.length > 0 ? (
          <img src={`${API_URL}/${Images[0].path}`} alt={Images[0].name} />
        ) : (
          <p>Pas d'image disponible</p>
        )}
      </div>
      <div className="paint-info">
        <h3>{title}</h3>
        <p>{id}</p>
        <p>{method}</p>
        <p>{width}x{height}</p>
        <p>{new Date(createdAt).toLocaleDateString()}</p>
      </div>
      <div className="paint-number-image">
        <span className="image-count">{Images.length}</span>
      </div>
      <div className="modif-price">
        <div className="user-actions">
          <Link to={`/edit-paint/${id}`} className="edit-button">✎</Link>
        </div>
        <div className="delete-button">
          <button className='Delete' onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <div className="price">
          <p>{prize}<span>€</span></p>
        </div>
      </div>
    </div>
  );
};

PaintCard.propTypes = {
  tableau: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    method: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    prize: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    Images: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })).isRequired,
  }).isRequired,
  onModifyClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default PaintCard;

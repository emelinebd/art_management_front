// src/components/UserCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/UserCard.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const UserCard = ({ id, name, email, status, boardCount, onDeleteClick }) => {

  const getStatusClass = () => {
    if (status === 'verified') {
      return 'verified';
    } else if (status === 'pending') {
      return 'pending';
    } else {
      return '';
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${name} (${email}) ?`)) {
      onDeleteClick(id); // Appel de la fonction onDeleteClick si l'utilisateur confirme
    }
  };

  return (
    <div className="user-card">
      <div className="user-info">
        <Link to={`/users/${id}`} className="edit-button">
        <h3>
          {name}
        </h3>
        </Link>
        <p>{email}</p>
      </div>
      <div className="user-status">
        <span className={`status-badge ${status === 'VERIFIED' ? 'verified' : 'pending'}`}>
          {status}
        </span>
      </div>
      <div className="user-boards">
        <span className="boards-count">{boardCount}</span>
      </div>
      <div className="user-actions">
        <Link to={`/edit/${id}`} className="edit-button">✎</Link>
        <div className="delete-button">
          <button className='Delete' onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  boardCount: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired, // Assurez-vous que onDeleteClick est défini comme une fonction requise
};

export default UserCard;

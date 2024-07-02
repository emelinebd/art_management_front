// src/components/UserCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/UserCard.css';

const UserCard = ({ name, email, status, imagesCount }) => {
  return (
    <div className="user-card">
      <div className="user-info">
        <h3>{name}</h3>
        <p>{email}</p>
      </div>
      <div className="user-status">
        <span className={`status-badge ${status === 'Vérifié' ? 'verified' : 'pending'}`}>
          {status === 'Vérifié' ? '✔ Vérifié' : '⏳ En attente'}
        </span>
      </div>
      <div className="user-images">
        <span className="images-count">{imagesCount}</span>
      </div>
      <div className="user-actions">
        <button className="edit-button">
          ✎
        </button>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  imagesCount: PropTypes.number.isRequired,
};

export default UserCard;

// src/components/UserCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/UserCard.css';

const UserCard = ({ name, email, status, boardCount }) => {
  return (
    <div className="user-card">
      <div className="user-info">
        <h3>{name}</h3>
        <p>{email}</p>
      </div>
      <div className="user-status">
        <span className={`status-badge ${status === 'Vérifié' ? 'verified' : 'pending'}`}>
          {status}
        </span>
      </div>
      <div className="user-boards">

        <span className="boards-count">{boardCount}</span>
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
  boardCount: PropTypes.number.isRequired,
};

export default UserCard;

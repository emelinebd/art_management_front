import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Alert.css'; // Créez ce fichier pour styliser l'alerte

const Alert = ({ type, message }) => {
  return (
    <div className={`alert alert-${type}`}>
      {message}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning']).isRequired,
  message: PropTypes.string.isRequired,
};

export default Alert;

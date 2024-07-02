// src/components/Input.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './Input.css'; // Importez votre fichier CSS pour les styles

const Input = ({ type, label, value, onChange, placeholder }) => {
  return (
    <div className="input-group">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="custom-input"
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Input;

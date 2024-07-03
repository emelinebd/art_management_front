// src/components/Input.jsx

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Input.css';

const Input = ({ type, label, value, onChange, placeholder, error }) => {
  return (
    <div className="input-group">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`custom-input ${error ? 'error' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string // Ajout du prop error
};

export default Input;

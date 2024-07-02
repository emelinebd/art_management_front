import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, className, onClick }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  onClick: () => {},
};

export default Button;


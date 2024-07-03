import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PaintCard.css';
import { Link } from 'react-router-dom';

const PaintCard = ({ tableau, onModifyClick }) => {
  const { nom, numero, technique, dimensions, date, image, imageCount, price } = tableau;

  return (
    <Link to={`/tableaux/${encodeURIComponent(nom)}`}>
      <div className="paint-card">
        <div className="paint-image">
          <img src={image} alt={nom}/>
        </div>
        <div className="paint-info">
          <h3>{nom}</h3>
          <p>{numero}</p>
          <p>{technique}</p>
          <p>{dimensions}</p>
          <p>{date}</p>
        </div>
        <div className="paint-number-image">
          <span className="image-count">{imageCount}</span>
        </div>
        <div className="modif-price">
          <div className="user-actions">
            <button className="edit-button">
              ✎
            </button>
          </div>
          <div className="price">
            <p>{price}<span>€</span></p>
          </div>
        </div>
      </div>
    </Link>
  );
};

PaintCard.propTypes = {
  tableau: PropTypes.shape({
    nom: PropTypes.string.isRequired,
    numero: PropTypes.string.isRequired,
    technique: PropTypes.string.isRequired,
    dimensions: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onModifyClick: PropTypes.func.isRequired,
};

export default PaintCard;

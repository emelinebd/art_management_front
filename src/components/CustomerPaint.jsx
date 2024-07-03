import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button'; // Assurez-vous d'importer votre composant Button
import '../styles/CustomerPaint.css'; // Assurez-vous d'importer vos styles CSS

const CustomerPaint = ({ paints }) => {
  return (
    <div className="tableaux-client">
      {paints.map((tableau, index) => (
        <div key={index} className="tableau-item flex">
          <div className="tableau-image">
            <img src={tableau.image} alt={tableau.nom}/>
          </div>
          <div className="tableau-info">
            <h3>{tableau.nom}</h3>
            <p>{tableau.numero}</p>
            <p>{tableau.technique}</p>
            <p>{tableau.dimensions}</p>
            <hr/>
            <h4>{tableau.date}</h4>
            <p>{tableau.description}</p>
          </div>
          <div className="tableau-actions">
            <Button text="Générer certificat" className="btn-generate-certificate"
                    onClick={() => handleGenerateCertificate(tableau.id)}/>
          </div>
        </div>
      ))}
    </div>
  );
};

CustomerPaint.propTypes = {
  paints: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nom: PropTypes.string.isRequired,
    numero: PropTypes.string.isRequired,
    technique: PropTypes.string.isRequired,
    dimensions: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
};

export default CustomerPaint;

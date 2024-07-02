import React from 'react';

const MonthYearDisplay = () => {
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' }); // Récupère le nom du mois
  const year = currentDate.getFullYear(); // Récupère l'année

  return (
    <div>
      <h1 className="moisAnnee">{month} {year}</h1>
    </div>
  );
};

export default MonthYearDisplay;

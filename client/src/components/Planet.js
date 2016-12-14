import React, { PropTypes } from 'react';

const determineStrokeColor = (belongsTo, selected) => {
  const defaultStroke = belongsTo ? 'blue' : 'red';

  if (selected) {
    return 'darkorchid';
  }

  return defaultStroke;
};

const Planet = (props) => {
  const { planet, planet: { coordinates: [planetY, planetX] }, rowStep, colStep, onClick } = props;
  const smallestDimesion = rowStep > colStep ? colStep : rowStep;
  const radius = (smallestDimesion / 2) - (smallestDimesion * 0.05);
  const svgX = (planetX * colStep) + (colStep / 2);
  const svgY = (planetY * rowStep) + (rowStep / 2);

  return (
    <circle
      cx={svgX}
      cy={svgY}
      r={radius}
      fill={planet.belongsTo ? 'blue' : 'red'}
      onClick={onClick}
      key={planet.id}
      stroke={determineStrokeColor(planet.belongsTo, planet.selected)}
      strokeWidth="3"
    />
  );
};

Planet.propTypes = {
  planet: PropTypes.object.isRequired,
  rowStep: PropTypes.number.isRequired,
  colStep: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Planet;

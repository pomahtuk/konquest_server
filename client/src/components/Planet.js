import React, { PropTypes } from 'react';

const GameGrid = (props) => {
  const { planet: { coordinates: [planetX, planetY] }, rowStep, colStep } = props;
  const smallestDimesion = rowStep > colStep ? colStep : rowStep;
  const radius = (smallestDimesion / 2) - (smallestDimesion * 0.05);
  const svgX = (planetX * rowStep) + (rowStep / 2);
  const svgY = (planetY * colStep) + (colStep / 2);

  return (
    <circle cx={svgX} cy={svgY} r={radius} fill="red" />
  );
};

GameGrid.propTypes = {
  planet: PropTypes.object.isRequired,
  rowStep: PropTypes.number.isRequired,
  colStep: PropTypes.number.isRequired,
};

export default GameGrid;

import React, { PropTypes } from 'react';

const renderLine = (coords, key) => (
  <line {...coords} stroke="green" strokeDasharray="5,5" strokeWidth={1} key={key} />
);

const GameGrid = (props) => {
  const { colStep, rowStep, colCount, rowCount } = props;
  const gridLines = [];
  let coords;

  for (let colNumber = 0; colNumber <= colCount; colNumber += 1) {
    coords = {
      x1: colNumber * colStep,
      x2: colNumber * colStep,
      y1: 0,
      y2: rowStep * rowCount,
    };
    gridLines.push(renderLine(coords, `c_${colNumber}`));
  }

  for (let rowNumber = 0; rowNumber <= rowCount; rowNumber += 1) {
    coords = {
      y1: rowNumber * rowStep,
      y2: rowNumber * rowStep,
      x1: 0,
      x2: colStep * colCount,
    };
    gridLines.push(renderLine(coords, `r_${rowNumber}`));
  }

  return (
    <g className="gameFieldGrid">
      {gridLines}
    </g>
  );
};

GameGrid.propTypes = {
  rowStep: PropTypes.number.isRequired,
  colStep: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  colCount: PropTypes.number.isRequired,
};

export default GameGrid;

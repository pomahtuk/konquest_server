import React, { PropTypes } from 'react';

const GameGrid = (props) => {
  const { colStep, rowStep, colCount, rowCount } = props;
  const gridLines = [];
  let coords;

  for (let colNumber = 0; colNumber <= colCount; colNumber += 1) {
    coords = {
      x1: colNumber * rowStep,
      x2: colNumber * rowStep,
      y1: 0,
      y2: colStep * colCount,
    };
    gridLines.push(<line {...coords} stroke="green" strokeWidth={1} key={`c_${colNumber}`} />);
  }

  for (let rowNumber = 0; rowNumber <= rowCount; rowNumber += 1) {
    coords = {
      y1: rowNumber * colStep,
      y2: rowNumber * colStep,
      x1: 0,
      x2: rowStep * rowCount,
    };
    gridLines.push(<line {...coords} stroke="green" strokeWidth={1} key={`r_${rowNumber}`} />);
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

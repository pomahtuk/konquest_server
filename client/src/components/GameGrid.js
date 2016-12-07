import React, { PropTypes } from 'react';

const GameGrid = (props) => {
  const { width, height, settings: { height: colCount, width: rowCount } } = props;
  const rowStep = width / rowCount;
  const colStep = height / colCount;
  const gridLines = [];
  let coords;

  for (let colNumber = 0; colNumber <= colCount; colNumber += 1) {
    coords = {
      x1: colNumber * rowStep,
      x2: colNumber * rowStep,
      y1: 0,
      y2: height,
    };
    gridLines.push(<line {...coords} stroke="green" strokeWidth={1} key={`c_${colNumber}`} />);
  }

  for (let rowNumber = 0; rowNumber <= rowCount; rowNumber += 1) {
    coords = {
      y1: rowNumber * colStep,
      y2: rowNumber * colStep,
      x1: 0,
      x2: width,
    };
    gridLines.push(<line {...coords} stroke="green" strokeWidth={1} key={`r_${rowNumber}`} />);
  }

  return (
    <g>
      {gridLines}
    </g>
  );
};

GameGrid.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  settings: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
};

export default GameGrid;

import React, { PropTypes } from 'react';

import GameGrid from './GameGrid';

const GameField = props => (
  <div className="gameField" style={{ marginTop: '20px' }}>
    <svg id={props.gameId || 'game'} width={props.width} height={props.height}>
      <GameGrid
        width={props.width}
        height={props.height}
        settings={props.settings}
      />
    </svg>
  </div>
);

GameField.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  gameId: PropTypes.string,
  settings: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
};

GameField.defaultProps = {
  width: 640,
  height: 480,
  settings: {
    height: 10,
    width: 10,
  },
};

export default GameField;

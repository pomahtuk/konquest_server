import React, { PropTypes } from 'react';

import GameGrid from './GameGrid';
import Planet from './Planet';

const GameField = (props) => {
  const { planets, gameId, height, width, settings: { height: rowCount, width: colCount }, onPlanetClick } = props;
  const rowStep = height / rowCount;
  const colStep = width / colCount;

  return (
    <div className="gameField" style={{ marginTop: '20px' }}>
      <svg id={gameId || 'game'} width={width} height={height}>
        <GameGrid
          rowStep={rowStep}
          colStep={colStep}
          colCount={colCount}
          rowCount={rowCount}
        />

        <g className="gameFieldPlanets">
          {[...planets.values()].map(planet => <Planet
            planet={planet}
            rowStep={rowStep}
            colStep={colStep}
            key={planet.id}
            onClick={() => onPlanetClick(planet.id)}
          />)}
        </g>
      </svg>
    </div>
  );
};

GameField.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  gameId: PropTypes.string,
  planets: PropTypes.object.isRequired,
  settings: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  onPlanetClick: PropTypes.func.isRequired,
};

GameField.defaultProps = {
  width: 640,
  height: 480,
  planets: [
    {
      coordinates: [0, 0],
    }, {
      coordinates: [2, 2],
    },
  ],
  settings: {
    height: 10,
    width: 10,
  },
};

export default GameField;

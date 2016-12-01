import 'babel-polyfill';
import { expect } from 'chai';
import generateGameField from '../../helpers/generateGameField';

let gameField;

const gameFieldSettings = {
  width: 20,
  height: 20,
  players: 4,
  planetCount: 40,
};

describe('Game Field generator', () => {
  before(() => {
    gameField = generateGameField(gameFieldSettings);
    // make sure we are having a gamefield after all
    expect(gameField).to.be.an('array');
  });

  it('Should generate field matching initial params', () => {
    const { width, height, players, planetCount: planets } = gameFieldSettings;
    let planetCount = 0;
    let playersCount = 0;
    let quadrant;
    // check dimensions
    expect(gameField.length).to.equal(height);
    expect(gameField[0].length).to.equal(width);
    // check players count and planets count
    for (let i = 0; i < height; i += 1) {
      for (let j = 0; j < width; j += 1) {
        quadrant = gameField[i][j];
        if (quadrant.planet) {
          if (quadrant.planet.belongsTo) {
            playersCount += 1;
          } else {
            planetCount += 1;
          }
        }
      }
    }

    expect(planetCount).to.equal(planets);
    expect(playersCount).to.equal(players);
  });
});

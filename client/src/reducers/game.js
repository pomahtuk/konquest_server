import { GAME_SET_DEMO_FIELD } from '../constants/game';

const ectractPlanetsFromGameField = (gameField) => {
  const planets = [];

  gameField.forEach((row) => {
    row.forEach((cell) => {
      if (cell.planet) {
        planets.push(cell.planet);
      }
    });
  });

  return planets;
};

const auth = (state = {
  isLoading: true,
  planets: [],
  settings: {
    width: 10,
    height: 10,
  },
}, action) => {
  switch (action.type) {
    case GAME_SET_DEMO_FIELD:
      return Object.assign({}, state, {
        planets: ectractPlanetsFromGameField(action.gameField),
        settings: action.settings,
        isLoading: false
      });
    default:
      return state;
  }
};

export default auth;

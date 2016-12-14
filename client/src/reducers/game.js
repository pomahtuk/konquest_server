import { GAME_SET_DEMO_FIELD, GAME_TOGGLE_PLANET_STATE } from '../constants/game';

const ectractPlanetsFromGameField = (gameField) => {
  const planets = new Map();

  gameField.forEach((row) => {
    row.forEach((cell) => {
      if (cell.planet) {
        planets.set(cell.planet.id, cell.planet);
      }
    });
  });

  return planets;
};

const getNewToggledPlanetsState = ({ planets, selectedPlanets }, planetId) => {
  const newPlanets = new Map(planets);
  let newSelectedPlanets = new Map(selectedPlanets);
  // copy planet
  const targetPlanet = Object.assign({}, newPlanets.get(planetId));

  if (targetPlanet.selected) {
    // delete if we are deselecting
    newSelectedPlanets.delete(targetPlanet.id);
  } else {
    // add if we are selecting
    if (newSelectedPlanets.size === 2) {
      // we reached maximal number, restart;
      // clean selected state of planets
      newSelectedPlanets.forEach((oldSelectedPlanet) => {
        newPlanets.set(oldSelectedPlanet.id, Object.assign({}, oldSelectedPlanet, {
          selected: false
        }));
      });
      // clean selected map
      newSelectedPlanets = new Map();
    }
    newSelectedPlanets.set(targetPlanet.id, targetPlanet);
  }
  // update selected flag on a planet intself
  targetPlanet.selected = !targetPlanet.selected;
  // make sure we are in map
  newPlanets.set(targetPlanet.id, targetPlanet);

  return {
    planets: newPlanets,
    selectedPlanets: newSelectedPlanets,
  };
};


const auth = (state = {
  isLoading: true,
  planets: new Map(),
  selectedPlanets: new Map(),
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
    case GAME_TOGGLE_PLANET_STATE:
      return Object.assign({}, state, getNewToggledPlanetsState(state, action.planetId));
    default:
      return state;
  }
};

export default auth;

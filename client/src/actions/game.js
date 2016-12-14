import api from '../api';
import { GAME_SET_DEMO_FIELD, GAME_TOGGLE_PLANET_STATE } from '../constants/game';

const setDemoGameField = (response, params) => ({
  type: GAME_SET_DEMO_FIELD,
  gameField: response,
  settings: params
});

export const togglePlanetState = planetId => ({
  type: GAME_TOGGLE_PLANET_STATE,
  planetId
});

export const getDemoGameField = params => dispatch => api.getDemoGameField(params)
  .then(response => response.data)
  .then((data) => {
    dispatch(setDemoGameField(data, params));
  })
  .catch((error) => {
    // need to handle error properly
    console.log(error);
    // for further processing
    throw error;
  });

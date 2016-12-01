const getRandomIntFromZero = max => Math.floor(Math.random() * max);

const getRandomIntArbitrary = (min, max) => Math.floor((Math.random() * (max - min)) + min);

const getRandomArbitrary = (min, max) => (Math.random() * (max - min)) + min;

const getPlanetStrengthAdjuster = (coordinates, settings) => {
  const planetShouldBeWeaker = (coordinates[0] <= 1 || coordinates[0] >= settings.height - 1)
    || (coordinates[1] <= 1 || coordinates[1] >= settings.width - 1);

  if (planetShouldBeWeaker) {
    // lets assume this is weak enought
    return getRandomArbitrary(0, 0.5);
  }

  return 0;
};

const coordinatesDiceRoll = (height, width) =>
  [getRandomIntFromZero(height), getRandomIntFromZero(width)];

const getNeightboursArray = ([rowIndex, columnIndex], settings) => {
  const maxRowIndex = rowIndex + 1 >= settings.height ? rowIndex : rowIndex + 1;
  const minRowIndex = rowIndex - 1 < 0 ? rowIndex : rowIndex - 1;
  const maxColIndex = columnIndex + 1 >= settings.width ? columnIndex : columnIndex + 1;
  const minColIndex = columnIndex - 1 < 0 ? columnIndex : columnIndex - 1;

  const neightboursArray = [];

  for (let i = minRowIndex; i <= maxRowIndex; i += 1) {
    for (let j = minColIndex; j <= maxColIndex; j += 1) {
      neightboursArray.push([i, j]);
    }
  }

  return neightboursArray;
};

const couldWePlacePlanetHere = (gameField, coordinates, settings) => {
  const [rowIndex, columnIndex] = coordinates;
  // might be not a best solution to declare like this
  const neightborsArray = getNeightboursArray(coordinates, settings);

  let somethingPlacedInSurrounding = false;

  // first - check original spot
  if (gameField[rowIndex][columnIndex].planet) {
    return false;
  }

  // then check surroundings
  somethingPlacedInSurrounding = neightborsArray.some(([neighbourRowIndex, neighbourColumnIndex]) =>
    !!gameField[neighbourRowIndex][neighbourColumnIndex].planet
  );

  return !somethingPlacedInSurrounding;
  // return true;
};

const generatePlanet = (coordinates, settings) => {
  // make some random numbers here
  // but reminder - planets closer to edges
  // should be weaker so player will always be able
  // to capture first one
  const weaknessMultiplier = getPlanetStrengthAdjuster(coordinates, settings);
  const planetProduction = getRandomIntArbitrary(5, 10);

  const planet = {
    coordinates,
    shipAmount: planetProduction,
    production: planetProduction,
    shipStrength: getRandomArbitrary(0.3, 1 - weaknessMultiplier),
    belongsTo: null,
  };

  return planet;
};

const generatePlayerPlanet = (coordinates, playerIndex) => {
  const planet = {
    coordinates,
    shipAmount: 10,
    production: 10,
    shipStrength: 0.75,
    belongsTo: `player${playerIndex}`,
  };

  return planet;
};

const populateGameFieldWithPlanets = (gameField, settings) => {
  const { width, height, planetCount, players } = settings;
  const newGameField = Object.assign({}, gameField);
  const playerLocations = [
    [0, 0],
    [height - 1, width - 1],
    [height - 1, 0],
    [0, width - 1],
  ];

  // first - create players planets
  for (let pIndex = 0; pIndex < players; pIndex += 1) {
    const [pRowIndex, pColumnIndex] = playerLocations[pIndex];

    newGameField[pRowIndex][pColumnIndex] = generatePlayerPlanet(playerLocations[pIndex], pIndex);
  }

  // make a coordinates dice roll for each planet
  for (let planetIndex = 0; planetIndex < planetCount; planetIndex += 1) {
    let coordinates = coordinatesDiceRoll(height, width);

    while (!couldWePlacePlanetHere(gameField, coordinates, settings)) {
      coordinates = coordinatesDiceRoll(height, width);
    }

    const [rowIndex, columnIndex] = coordinates;

    // at this point we do have vacant coordinates
    newGameField[rowIndex][columnIndex].planet = generatePlanet(coordinates, settings);
  }

  return newGameField;
};

const generateGameField = (settings) => {
  const { width, height } = settings;
  const gameField = [];

  for (let i = 0; i < height; i += 1) {
    gameField[i] = [];
    for (let j = 0; j < width; j += 1) {
      gameField[i][j] = {};
    }
  }

  // now generate planets to field
  return populateGameFieldWithPlanets(gameField, settings);
};

export default generateGameField;

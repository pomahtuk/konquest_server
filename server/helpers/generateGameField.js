const getRandomIntFromZero = max => Math.floor(Math.random() * max);

const getRandomArbitrary = (min, max) => (Math.random() * (max - min)) + min;

const getPlanetStrengthAdjuster = (coordinates, settings) => {
  const planetShouldBeWeaker = (coordinates[0] <= 1 || coordinates[0] >= settings.height - 1)
    || (coordinates[1] <= 1 || coordinates[1] >= settings.width - 1);

  if (planetShouldBeWeaker) {
    // lets assume this is weak enought
    return getRandomArbitrary(0, 5);
  }

  return 0;
};

const coordinatesDiceRoll = (height, width) =>
  [getRandomIntFromZero(height), getRandomIntFromZero(width)];

const getNeightboursArray = ([rowIndex, columnIndex], settings) => {
  const maxRowIndex = rowIndex + 1 > settings.height ? rowIndex : rowIndex + 1;
  const minRowIndex = rowIndex - 1 < 0 ? rowIndex : rowIndex - 1;
  const maxColIndex = columnIndex + 1 > settings.width ? columnIndex : columnIndex + 1;
  const minColIndex = columnIndex - 1 < 0 ? columnIndex : columnIndex - 1;

  return [];
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
};

const generatePlanet = (coordinates, settings) => {
  // make some random numbers here
  // but reminder - planets closer to edges
  // should be weaker so player will always be able
  // to capture first one
  const weaknessMultiplier = getPlanetStrengthAdjuster(coordinates, settings);
  const planetProduction = getRandomIntFromZero(10);

  const planet = {
    coordinates,
    shipAmount: planetProduction,
    production: planetProduction,
    shipStrength: getRandomArbitrary(0, 1 - weaknessMultiplier),
    belongsTo: null,
  };

  return planet;
};

const populateGameFieldWithPlanets = (gameField, settings) => {
  const { width, height, planetCount } = settings;
  const newGameField = Object.assign({}, gameField);

  // first - create players planets

  // make a coordinates dice roll for each planet
  [...Array(planetCount)].forEach(() => {
    let coordinates = coordinatesDiceRoll(height, width);

    while (!couldWePlacePlanetHere(gameField, coordinates, settings)) {
      coordinates = coordinatesDiceRoll(height, width);
    }

    // at this point we do have vacant coordinates
    newGameField[height][width] = generatePlanet(coordinates, settings);
  });

  return newGameField;
};

const generateGameField = (settings) => {
  const { width, height } = settings;

  const gameField = [...Array(height)].map((_, rowIndex) => {
    const gameFieldRow = [...Array(width)].map((__, columnIndex) => {
      // here we need to generate cell
      const gameCell = {
        coordinates: [rowIndex, columnIndex],
      };
      return gameCell;
    });
    return gameFieldRow;
  });

  // now generate planets to field
  return populateGameFieldWithPlanets(gameField, settings);
};

export default generateGameField;

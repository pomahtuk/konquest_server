const getRandomIntFromZero = max => Math.floor(Math.random() * (max + 1));

const coordinatesDiceRoll = (height, width) =>
  [getRandomIntFromZero(height), getRandomIntFromZero(width)];

const couldWePlacePlanetHere = (gameField, coordinates) => {
  const [rowIndex, columnIndex] = coordinates;
  // might be not a best solution to declare like this
  const neightborsArray = [
    [rowIndex - 1, columnIndex - 1],
    [rowIndex - 1, columnIndex],
    [rowIndex - 1, columnIndex + 1],
    [rowIndex, columnIndex - 1],
    [rowIndex, columnIndex + 1],
    [rowIndex + 1, columnIndex - 1],
    [rowIndex + 1, columnIndex],
    [rowIndex + 1, columnIndex + 1],
  ];

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

const generatePlanet = (coordinates) => {
  // make some random numbers here
  // but reminder - planets closer to edges
  // should be weaker so player will always be able
  // to capture first one
  const planet = {
    coordinates,
    shipAmount: 0,
    production: 10,
    shipStrength: 1,
    belongsTo: null,
  };

  return planet;
};

const populateGameFieldWithPlanets = (gameField, settings) => {
  const { width, height, planetCount } = settings;
  const newGameField = Object.assign({}, gameField);

  // make a coordinates dice roll for each planet
  [...Array(planetCount)].forEach(() => {
    let coordinates = coordinatesDiceRoll(height, width);

    while (!couldWePlacePlanetHere(gameField, coordinates)) {
      coordinates = coordinatesDiceRoll(height, width);
    }

    // at this point we do have vacant coordinates
    newGameField[height][width] = generatePlanet(coordinates);
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

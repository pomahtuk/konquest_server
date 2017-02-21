let settings = {};

const getRandomIntArbitrary = (min, max) => Math.floor((Math.random() * (max - min)) + min);

const getRandomArbitrary = (min, max) => (Math.random() * (max - min)) + min;

const getPlanetStrengthAdjuster = (coordinates) => {
  const { width, height } = settings;

  const planetShouldBeWeaker = (coordinates[0] <= 1 || coordinates[0] >= height - 1)
    || (coordinates[1] <= 1 || coordinates[1] >= width - 1);

  if (planetShouldBeWeaker) {
    // lets assume this is weak enought
    return getRandomArbitrary(0, 0.5);
  }

  return 0;
};

const getNeightboursArray = ([rowIndex, columnIndex]) => {
  const { width, height } = settings;
  const maxRowIndex = rowIndex + 1 >= height ? rowIndex : rowIndex + 1;
  const minRowIndex = rowIndex - 1 < 0 ? rowIndex : rowIndex - 1;
  const maxColIndex = columnIndex + 1 >= width ? columnIndex : columnIndex + 1;
  const minColIndex = columnIndex - 1 < 0 ? columnIndex : columnIndex - 1;

  const neighboursArray = [];

  for (let i = minRowIndex; i <= maxRowIndex; i += 1) {
    for (let j = minColIndex; j <= maxColIndex; j += 1) {
      neighboursArray.push([i, j]);
    }
  }

  return neighboursArray;
};

const generatePlanet = (coordinates) => {
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
    id: `x${coordinates[0]}y${coordinates[1]}`,
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
    id: `p${playerIndex}x${coordinates[0]}y${coordinates[1]}`,
  };

  return planet;
};

const generateGameField = (requestSettings, attempts = 0) => {
  settings = requestSettings;
  let resultingGameField = [];

  const freeCoords = new Set();
  const { width, height, players, planetCount } = settings;
  const maxAttempts = 1000;
  let shouldStartOver = false;

  for (let i = 0; i < height; i += 1) {
    resultingGameField[i] = [];
    for (let j = 0; j < width; j += 1) {
      resultingGameField[i][j] = {};
      // mark as vacnt
      freeCoords.add(JSON.stringify([i, j]));
    }
  }

  // now generate planets to field
  const playerLocations = [
    [0, 0],
    [height - 1, width - 1],
    [height - 1, 0],
    [0, width - 1],
  ];

  // first - create players planets
  for (let pIndex = 0; pIndex < players; pIndex += 1) {
    const [pRowIndex, pColumnIndex] = playerLocations[pIndex];
    resultingGameField[pRowIndex][pColumnIndex].planet = generatePlayerPlanet(playerLocations[pIndex], pIndex);
    // mark player locations unavailable
    freeCoords.delete(JSON.stringify([pRowIndex, pColumnIndex]));
    // mark surroundings unavailable
    getNeightboursArray([pRowIndex, pColumnIndex]).forEach(neighborCoords =>
      freeCoords.delete(JSON.stringify(neighborCoords))
    );
  }

  // pick random free coord and place planet there
  // remove this coord and surroundings from roster
  for (let planetIndex = 0; planetIndex < planetCount; planetIndex += 1) {
    // random point between 0 and number of keys left
    const freeCoordsKeys = [...freeCoords.keys()];

    if (freeCoordsKeys.length > 0) {
      const randomPointIndex = getRandomIntArbitrary(0, freeCoordsKeys.length);
      const randomPointRaw = freeCoordsKeys[randomPointIndex];
      const randomPoint = JSON.parse(freeCoordsKeys[randomPointIndex]);
      freeCoords.delete(randomPointRaw);
      resultingGameField[randomPoint[0]][randomPoint[1]].planet = generatePlanet(randomPoint);
      getNeightboursArray(randomPoint).forEach(neighborCoords => freeCoords.delete(JSON.stringify(neighborCoords)));
    } else {
      shouldStartOver = true;
    }
  }

  // now it is time to try few more times
  if (shouldStartOver && attempts < maxAttempts) {
    resultingGameField = generateGameField(requestSettings, attempts + 1);
  } else if (shouldStartOver) {
    // now we faied enought, considering problem unsolvable
    return [];
  }

  return resultingGameField;
};

module.exports = generateGameField;

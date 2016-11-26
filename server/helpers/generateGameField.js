const getRandomIntFromZero = max => Math.floor(Math.random() * (max + 1));

const coordinatesDiceRoll = (height, width) =>
  [getRandomIntFromZero(height), getRandomIntFromZero(width)];

const isPlanetAllreadyThere = (gameField, coordinates) => {
  const [rowIndex, columnIndex] = coordinates;
  return !!gameField[rowIndex][columnIndex].planet;
};

const populateGameFieldWithPlanets = (gameField, settings) => {
  const { width, height, planetCount } = settings;

  // make a coordinates dice roll for each planet
  [...Array(planetCount)].forEach(() => {
    let coordinates = coordinatesDiceRoll(height, width);

    while (!isPlanetAllreadyThere(gameField, coordinates)) {
      coordinates = coordinatesDiceRoll(height, width);
    }

    // at this point we do have vacant coordinates

    return true;
  });

  return gameField;
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

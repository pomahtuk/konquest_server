import mongoose, { Schema } from 'mongoose';

// own helpers
import applyTurnToGame from '../helpers/applyTurnToGameField';
import generatePrivateKey from '../helpers/generatePrivateKey';
// import generateGameField from '../helpers/generateGameField';

const Game = new Schema({
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Account'
    }
  ],
  privateKey: { type: String, default: generatePrivateKey() },
  turns: [
    {
      player: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
      },
      actions: [{ type: Schema.Types.Mixed }],
    }
  ],
  settings: {
    height: {
      type: Number,
      required: true,
      min: [5, 'Field height is too small'],
      max: [20, 'Field height is too big'],
    },
    width: {
      type: Number,
      required: true,
      min: [5, 'Field width is too small'],
      max: [20, 'Field width is too big'],
    },
    planetCount: {
      type: Number,
      required: true,
      min: [2, 'Not enought planet to fight for'],
      max: [20, 'Field height is too big'],
    },
    players: {
      type: Number,
      required: true,
      min: [2, 'There is no fun playing alone'],
      max: [4, 'Too many players']
    }
  },
  initialState: {
    initialFleets: [],
    // initial game field state
    initialGameField: [
      [
        {
          coordinates: {
            type: Array,
            required: true,
          },
          planet: {
            coordinates: {
              type: Array,
              required: true,
            },
            shipAmount: {
              type: Number,
              required: true,
              min: [0, 'You could not have negative amount of ships on the planet'],
              max: [9999, 'Too many ships, looks like a mistake']
            },
            production: {
              type: Number,
              required: true,
              min: [0, 'Planet could not produce negative amount of ships'],
              max: [9999, 'Too many ships, looks like a mistake']
            },
            shipStrength: {
              type: Number,
              required: true,
              min: [0, 'Ship strength could not be that small'],
              max: [9999, 'No way this ships could be that strong']
            },
            belongsTo: null,
          }
        }
      ]
    ],
  },
  dateStarted: { type: Date, default: Date.now },
});


/*
 * Validations
 */
// game should have at least two players
Game.path('players').validate(
  players => players && (players.length >= 2) && (players.length <= 4),
  'Game should have at least two players and no more than 4'
);

// we could not have more planets than cells on gamefield
Game.path('settings').schema.path('height').validate(
  height => height > 4,
  'Height of gamefield should be more than 4'
);

// we could not have more planets than cells on gamefield
Game.path('settings').schema.path('width').validate(
  width => width > 4,
  'Width of gamefield should be more than 4'
);

// we could not have more planets than cells on gamefield
Game.path('settings').schema.path('planetCount').validate((planetCount) => {
  const { height, width, players } = this.settings;
  // rought formula to get max amount of planets for gamefield
  const maxCountForSetup = Math.ceil(((height * width) / 4) - ((height + width) / height));
  // should be better than this, no direct swarms
  return planetCount <= (maxCountForSetup - players);
}, 'Too many free planets, not fitting gamefield');


/*
 * Model methonds
 */
// this filed will represent state of game
// after initial generation and with all turns applied
Game.methods.getGameState = (turn) => {
  const { turns, initialState } = this;
  // let us check function argument. If none provided - return latest state,
  // if value present and <= than turns count - return state on this turn
  const targetedTour = (turn || turn === 0) ? turn : turns.length - 1;

  // now based on settings and turns determine state of gamefield
  const effectiveTurns = turns.slice(0, targetedTour + 1);
  const gameState = effectiveTurns.reduce(applyTurnToGame, initialState);

  return gameState;
};

const gameModel = mongoose.model('Game', Game);

export default gameModel;

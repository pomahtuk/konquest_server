import mongoose, { Schema } from 'mongoose';
// import Promise from 'bluebird';

// own helpers
import applyTurnToGame from '../helpers/applyTurnToGameField';
// import generateGameField from '../helpers/generateGameField';

const Game = new Schema({
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Account'
    }
  ],
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
  players => players && (players.length >= 2),
  'Game should have at least two players'
);

// we could not have more planets than cells on gamefield
// TODO: smarter limit calculation, but we re good for now;
Game.path('settings').schema.path('planetCount').validate((planetCount) => {
  const { height, width, players } = this.settings;
  // should be better than this, no direct swarms
  return planetCount <= (height + width + players);
}, 'Game should have at least two players');


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

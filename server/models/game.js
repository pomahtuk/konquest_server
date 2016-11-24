import mongoose, { Schema } from 'mongoose';
// import Promise from 'bluebird';

// own helpers
import applyTurnToGameField from '../helpers/applyTurnToGameField';

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
    size: {
      width: {
        type: Number,
        required: true,
        min: [5, 'Field width is too small'],
        max: [20, 'Field width is too big'],
      },
      height: {
        type: Number,
        required: true,
        min: [5, 'Field height is too small'],
        max: [20, 'Field height is too big'],
      }
    },
    players: {
      type: Number,
      required: true,
      min: [2, 'There is no fun playing alone'],
      max: [4, 'Too many players']
    }
  },
  // initial game field state
  initialGameField: Schema.type.Mixed,
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

/*
 * Model methonds
 */
// this filed will represent state of gamefield
// after initial generation and with all turns applied
Game.methods.getGameFieldState = (turn) => {
  // let us check function argument. If none provided - return latest state,
  // if value present and <= than turns count - return state on this turn
  const targetedTour = (turn || turn === 0) ? turn : this.turns.length - 1;

  // now based on settings and turns determine state of gamefield
  const effectiveTurns = this.turns.slice(0, targetedTour + 1);
  const gameFieldState = effectiveTurns.reduce(applyTurnToGameField, this.initialGameField);

  return gameFieldState;
};

const gameModel = mongoose.model('Game', Game);

export default gameModel;

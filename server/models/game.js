import mongoose, { Schema } from 'mongoose';
// import Promise from 'bluebird';

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
  // this filed will represent state of gamefield
  // after initial generation and with all turns applied
  gameField: Schema.type.Mixed,
  // initial game field state
  initialGameField: Schema.type.Mixed,
  dateStarted: { type: Date, default: Date.now },
});

// game should have at least two players
Game.path('players').validate(
  players => (players && players.length >= 2),
  'Game should have at least two players'
);

const gameModel = mongoose.model('Game', Game);

export default gameModel;

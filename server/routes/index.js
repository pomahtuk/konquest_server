import express from 'express';

import generateGameField from '../helpers/generateGameField';

const router = new express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

/* GET game field. */
router.get('/field', (req, res) => {
  const gameField = generateGameField({
    width: 10,
    height: 10,
    planetCount: 10,
    players: 2,
  });

  res.json(gameField);
});

export default router;

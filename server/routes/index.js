import express from 'express';

import generateGameField from '../helpers/generateGameField';

const router = new express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

/* GET game field. */
router.get('/field', (req, res) => {
  console.log(req.query);

  const gameField = generateGameField(req.query);

  res.json(gameField);
});

export default router;

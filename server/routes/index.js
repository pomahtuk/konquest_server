import express from 'express';
const router = new express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

export default router;

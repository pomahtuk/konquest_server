import express from 'express';
import passport from 'passport';
import PrettyError from 'pretty-error';

import Account from '../models/account';

const pretty = new PrettyError();
const router = new express.Router();

router.get('/me', (req, res) => {
  res.json({
    user: req.user
  });
});

router.post('/register', (req, res, next) => {
  const newAccount = new Account({ username: req.body.username });

  Account.register(newAccount, req.body.password)
    .then(() => {
      passport.authenticate('local')(req, res, () => {
        req.session.save((sessionSaveError) => {
          if (sessionSaveError) {
            return next(sessionSaveError);
          }
          return res.json({
            user: newAccount
          });
        });
      });
    }, (registerError) => {
      res.json({ error: registerError });
    })
    .catch((chainError) => {
      // report error to console;
      console.log(pretty.render(chainError));
      return next(chainError);
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({
    user: req.user
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({
    user: null,
  });
});

export default router;

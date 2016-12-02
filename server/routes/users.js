import express from 'express';
import passport from 'passport';
import Account from '../models/account';
import PrettyError from 'pretty-error';

const pretty = new PrettyError();
const router = new express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/register', (req, res) => {
  res.render('users/register', { });
});

router.get('/me', (req, res) => {
  res.json(req.user);
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
          return res.redirect('/');
        });
      });
    }, (registerError) => {
      res.render('users/register', { error: registerError });
    })
    .catch((chainError) => {
      // report arror to console;
      console.log(pretty.render(chainError));
      return next(chainError);
    });
});

router.get('/login', (req, res) => {
  res.render('users/login', { user: req.user });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;

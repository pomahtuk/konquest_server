import mongoose from 'mongoose';
import passport from 'passport';
import bluebird from 'bluebird';
import { Strategy as LocalStrategy } from 'passport-local';

// config
import dbParams from '../../config/db';

// models
import Account from '../models/account';

// initial config
// mongoose
mongoose.Promise = bluebird;
mongoose.connect(dbParams);

const passportSetup = () => {
  // local strategy
  passport.use(new LocalStrategy(Account.authenticate()));
  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());
};

export default passportSetup;

import mongoose from 'mongoose';
import passport from 'passport';
import bluebird from 'bluebird';
import { Strategy as LocalStrategy } from 'passport-local';

// models
import Account from '../models/account';

// initial config
// mongoose
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');

const passportSetup = () => {
  // local strategy
  passport.use(new LocalStrategy(Account.authenticate()));
  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());
};

export default passportSetup;

import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import favicon from 'serve-favicon';
import passport from 'passport';
import session from 'express-session';

import { publicDir } from '../../config/paths';

const initialAppSetup = (app) => {
  // view engine setup
  app.set('views', path.join(__dirname, '../../views'));
  app.set('view engine', 'pug');

  // uncomment after placing your favicon in /public
  app.use(favicon(path.join(publicDir, 'favicon.ico')));
  if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
  }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({
    secret: 'fgkljsdfh',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(publicDir));
};

export default initialAppSetup;

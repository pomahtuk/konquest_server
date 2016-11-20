// router
import index from './index';
import users from './users';

const setupRouter = (app) => {
  // use views
  app.use('/', index);
  app.use('/users', users);
};

export default setupRouter;

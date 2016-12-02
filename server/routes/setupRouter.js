// router
import path from 'path';
import index from './index';
import users from './users';

import { publicDir } from '../config/paths';

const setupRouter = (app) => {
  // use views
  app.use('/api', index);
  app.use('/api/users', users);

  app.get('*', (req, res) => {
    // handle all with react for now
    res.sendFile(path.join(publicDir, '/index.html'));
  });
};

export default setupRouter;

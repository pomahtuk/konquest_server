import express from 'express';
import http from 'http';
import normalizePort from './utils/normalizePort';

// initializers
import setupRouter from './routes/setupRouter';
import setupPassport from './utils/setupPassport';
import initialAppSetup from './utils/initialAppSetup';
import errorHandler from './utils/errorHandler';

const app = express();

/**
 * Setup app specific
 */
initialAppSetup(app);
setupRouter(app);
setupPassport(app);
errorHandler(app);

/*
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/*
 * Create HTTP server.
 */
const server = http.createServer(app);

/*
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`listening on ${port}`));

export default app;

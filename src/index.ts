import app from './app';
import config from './config/config';
import logger from './middleware/logger';

const port = Number(config.server.port);

const server = app.listen(port, () => {
  logger.log('info', `Server is running on Port: ${port}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing server.');
  server.close((err) => {
    logger.info('Server closed.');
    // eslint-disable-next-line no-process-exit
    process.exit(err ? 1 : 0);
  });
});

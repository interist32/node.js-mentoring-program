require('module-alias/register');

// eslint-disable-next-line import/first
import groupRouter from './routers/group.router';
// eslint-disable-next-line import/first
import userRouter from './routers/user.router';

import express = require('express');
import bodyParser = require('body-parser');
import {apiLogger} from './middlewares/api-logger';
import {errorHandler} from './middlewares/error-handler';
import {logger} from './middlewares/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(apiLogger);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is listening on http://localhost:${PORT}`);
});

process.on('unhandledRejection', function(reason) {
  logger.error('unhandledRejection', reason);
});

process.on('uncaughtException', function(err) {
  logger.error('UncaughtException:', err.message);
  logger.error(err.stack);
  process.exit(1);
})

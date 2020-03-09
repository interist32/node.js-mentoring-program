// eslint-disable-next-line import/first
import { checkAuthToken } from './middlewares/check-auth-token';
import groupRouter from './routers/group.router';
// eslint-disable-next-line import/first
import userRouter from './routers/user.router';
import authRouter from './routers/auth.router';
import { apiLogger } from './middlewares/api-logger';
import { errorHandler } from './middlewares/error-handler';
import logger from './middlewares/logger';

require('module-alias/register');

import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(apiLogger);
app.use('/login', authRouter);
app.use('/users', checkAuthToken, userRouter);
app.use('/groups', checkAuthToken, groupRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is listening on http://localhost:${PORT}`);
});

process.on('unhandledRejection', (reason) => {
  logger.error('unhandledRejection', reason);
});

process.on('uncaughtException', (err) => {
  logger.error('UncaughtException', err.message);
  logger.error(err);
  process.exit(1);
});

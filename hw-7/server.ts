// eslint-disable-next-line import/first
require('module-alias/register');
require('dotenv').config();

import {checkAuthToken} from './middlewares/check-auth-token';
import groupRouter from './routers/group.router';
import userRouter from './routers/user.router';
import authRouter from './routers/auth.router';
import {apiLogger} from './middlewares/api-logger';
import {errorHandler} from './middlewares/error-handler';
import logger from './middlewares/logger';

import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import {SERVER_PORT} from './config';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(apiLogger);
app.use('/login', authRouter);
app.use('/users', checkAuthToken, userRouter);
app.use('/groups', checkAuthToken, groupRouter);
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  logger.info(`Server is listening on http://localhost:${SERVER_PORT}`);
});

process.on('unhandledRejection', (reason) => {
  logger.error('unhandledRejection', reason);
});

process.on('uncaughtException', (err) => {
  logger.error('UncaughtException', err.message);
  logger.error(err);
  process.exit(1);
});

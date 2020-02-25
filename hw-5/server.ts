require('module-alias/register');

// eslint-disable-next-line import/first
import groupRouter from './routers/group.router';
// eslint-disable-next-line import/first
import userRouter from './routers/user.router';

import express = require('express');
import bodyParser = require('body-parser');
import {apiLogger} from './middlewares/api-logger';
import {errorHandler} from './middlewares/error-handler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(apiLogger);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

process.on('unhandledRejection', function(reason) {
  console.error('unhandledRejection', reason);
});

process.on('uncaughtException', function(err) {
  console.error('UncaughtException:', err.message);
  console.error(err.stack);
  process.exit(1);
})

require('module-alias/register');

// eslint-disable-next-line import/first
import groupsRouter from './routers/group.router';
// eslint-disable-next-line import/first
import usersRouter from './routers/user.router';

import express = require('express');
import bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

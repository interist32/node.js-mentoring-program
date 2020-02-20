require('module-alias/register');

// eslint-disable-next-line import/first
import groupRouter from './routers/group.router';
// eslint-disable-next-line import/first
import userRouter from './routers/user.router';

import express = require('express');
import bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

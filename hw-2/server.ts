require('module-alias/register');

// eslint-disable-next-line import/first
import usersRouter from './routes/users';

import express = require('express');
import bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

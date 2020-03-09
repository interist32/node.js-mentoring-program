import { login } from 'controllers/auth.controller';

import express = require('express');

const router = express.Router();

export default router
  .post('/', login);

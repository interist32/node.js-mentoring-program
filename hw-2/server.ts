import express = require('express');
import {UsersStorage} from './storage/users';
import bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const usersStorage = new UsersStorage();

app.get('/users', (req, res) => {
  res.json(usersStorage.getUsers());
});

app.get('/users/:id', (req, res) => {
  res.json(usersStorage.getUserById(req.params.id));
});

app.post('/users', (req, res) => {
  usersStorage.add(req.body.user);
  res.json('Created');
});

app.put('/users/:id', (req, res) => {
  usersStorage.update(req.body.user);
  res.json('Updated');
});

app.delete('/users/:id', (req, res) => {
  usersStorage.remove(req.params['id']);
  res.json('Softly deleted');
});

app.get('/getAutoSuggestUsers', (req, res) => {
  res.json(usersStorage.getUsers(
      req.query.login, Number(req.query.limit) || undefined));
});

app.listen(3000, () => {
  console.log('Server is listening');
});

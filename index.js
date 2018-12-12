const express = require('express');
const app = express();
const mongoose = require('mongoose');

const users = require('./routes/users');
const todos = require('./routes/todos');
const authorize = require('./routes/authorize');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('Successfully connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/todos', todos);
app.use('/api/authorize', authorize);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));

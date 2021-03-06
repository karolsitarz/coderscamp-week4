const express = require('express');
const app = express();
const mongoose = require('mongoose');

const users = require('./routes/users');
const todos = require('./routes/todos');
const auth = require('./routes/auth');
const logout = require('./routes/logout');

const authorize = require('./middleware/auth');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('Successfully connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use(require('cookie-parser')());
app.use(['/api/todos', '/api/auth'], authorize);
app.use('/api/users', users);
app.use('/api/todos', todos);
app.use('/api/auth', auth);
app.use('/api/logout', logout);
app.use('/', express.static('./static/'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));

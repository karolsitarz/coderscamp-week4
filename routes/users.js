const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

// create user
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send({
    _id: user._id,
    name: user.name,
    email: user.email
  });
});

// get user by id
router.get('/:id', async (req, res) => {
  res.send(await User.findById(req.params.id).select({
    'name': 1,
    'email': 1,
    'todoList': 1
  }));
});

// edit user

// delete user

module.exports = router;
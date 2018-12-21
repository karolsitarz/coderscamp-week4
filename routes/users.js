const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth');

// create user
router.post('/', authorize, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  if (req.userID != null) return res.status(400).json('You are already logged in!');

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json('User already registered.');

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email
  });
});

// get user by id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select({
    'name': 1,
    'email': 1,
    'todoList': 1
  });
  if (!user) return res.status(404).json('There is no user with this id.');

  res.json(user);
});

// edit user
router.put('/:id', authorize, async (req, res) => {
  if (!req.userID) return res.status(403).json('Access denied.');
  if (req.userID !== req.params.id) return res.status(403).json("Can't edit other users.");
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const user = await User.findById(req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  const result = await user.save();
  res.json(result);
});

// delete user
router.delete('/:id', authorize, async (req, res) => {
  if (!req.userID) return res.status(403).json('Access denied.');
  if (req.userID !== req.params.id) return res.status(403).json("Can't delete other users.");
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json('There is no todo with this id.');

  const result = await user.remove();
  res.json(result);
});
module.exports = router;

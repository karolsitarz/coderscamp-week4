const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

// create user
router.post('/', async (req, res) => {
  const { error } =
    Joi.validate(req.body, {
      email: Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(5).max(100).required()
    });

  if (error) return res.status(400).send(error.details[0].message);
  console.log(1);

  if (req.userID != null) return res.status(400).send('You are already logged in!');
  console.log(2);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');
  console.log(3);

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');
  console.log(4);

  // just a educational-purposes project, don't have to export secretKey to env
  const token = jwt.sign({ _id: user._id }, 'secretKey');
  // save the token as a cookie, for future authorization
  res.cookie('login-token', token).send('You are logged in!');
});
module.exports = router;

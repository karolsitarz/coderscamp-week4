const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

// create user
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  // just a educational-purposes project, don't have to export secretKey to env
  const token = jwt.sign({ _id: user._id }, 'secretKey');
  // save the token as a cookie, for future authorization
  res.send(token);
});

const validate = req => {
  return Joi.validate(req, {
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(5).max(100).required()
  });
};

module.exports = router;

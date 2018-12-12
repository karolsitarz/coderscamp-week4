const mongoose = require('mongoose');
const Joi = require('joi');

const Todo = mongoose.model('todos',
  new mongoose.Schema({
    // todo model
  })
);

const validate = todo => {
  return Joi.validate(todo, {
    // validation
  });
};

module.exports = { Todo, validate };

const mongoose = require('mongoose');
const Joi = require('joi');

const Todo = mongoose.model('todos',
  new mongoose.Schema({
    // model notatki
  })
);

const validate = todo => {
  return Joi.validate(todo, {
    // walidacja
  });
};

module.exports = { Todo, validate };

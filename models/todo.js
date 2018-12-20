const mongoose = require('mongoose');
const Joi = require('joi');

const Todo = mongoose.model('todos',
  new mongoose.Schema({
    text: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'done']
    }
  })
);

const validate = todo => {
  return Joi.validate(todo, {
    text: Joi.string().required().min(1).max(200),
    status: Joi.string().required().valid('active', 'done')
  });
};

module.exports = { Todo, validate };

const mongoose = require('mongoose');
const Joi = require('joi');

const Todo = mongoose.model('Todo',
  new mongoose.Schema({
    text: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 150
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'done'],
      lowercase: true
    }
  })
);

const validate = customer => {
  return Joi.validate(customer, {
    text: Joi.string().min(3).max(150).required(),
    status: Joi.string().lowercase().valid('active', 'done').required()
  });
};

module.exports = { Todo, validate };

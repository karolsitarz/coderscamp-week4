const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
    todoList: [ mongoose.SchemaTypes.ObjectId ]
  })
);

const validate = customer => {
  return Joi.validate(customer, {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(5).max(100).required()
  });
};

module.exports = { User, validate };

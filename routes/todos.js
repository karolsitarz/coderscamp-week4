const { Todo, validate } = require('../models/todo');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

// Read all todos
router.get('/', async (req, res) => {
  if (!req.userID) return res.status(403).json('Access denied.');

  const user = await User.findById(req.userID);
  if (!user) return res.status(404).json('User retrieval error.');

  const todos = await Todo.find({ '_id': { $in: user.todoList } });

  res.json(todos);
});
// Read single todo
router.get('/:id', async (req, res) => {
  if (!req.userID) return res.status(403).json('Access denied.');

  const user = await User.findById(req.userID);
  if (!user) return res.status(404).json('User retrieval error.');

  if (user.todoList.indexOf(req.params.id) === -1) return res.status(403).json("The user doesn't own this task.");

  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json('There is no todo with this id.');

  res.json(todo);
});

// Create new todo
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  if (!req.userID) return res.status(403).json('Access denied.');

  const todo = new Todo({
    text: req.body.text
  });
  const user = await User.findById(req.userID);

  const result = await todo.save();

  user.todoList.push(result._id);
  await user.save();

  res.json(result);
});

// Update todo
router.put('/:id', async (req, res) => {
  if (!req.userID) return res.status(403).json('Access denied.');

  const user = await User.findById(req.userID);
  if (!user) return res.status(404).json('User retrieval error.');

  if (user.todoList.indexOf(req.params.id) === -1) return res.status(403).json("The user doesn't own this task.");

  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json('There is no todo with this id.');

  // set previous value for edit, if untouched
  if (req.body.text == null) req.body.text = todo.text;

  const { error } = validate(req.body);
  if (error) res.status(400).json(error.details[0].message);

  todo.text = req.body.text;
  todo.status = req.body.status;

  const result = await todo.save();
  res.json(result);
});

// Delete todo
router.delete('/:id', async (req, res) => {
  if (!req.userID) return res.status(403).json('Access denied.');

  const user = await User.findById(req.userID);
  if (!user) return res.status(404).json('User retrieval error.');

  if (user.todoList.indexOf(req.params.id) === -1) return res.status(403).json("The user doesn't own this task.");

  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json('There is no todo with this id.');

  const result = await todo.remove();
  res.json(result);
});
module.exports = router;

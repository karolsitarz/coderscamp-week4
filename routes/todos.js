const { Todo, validate } = require('../models/todo');
const express = require('express');
const router = express.Router();


// Read all todos
router.get('/', async (req, res) => {
    const todos = await Todo.find();

    res.send(todos);
});
// Read single todo 
router.get('/:id', async (req,res)=>{
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send('There is no todo with this id.');

    res.send(todo);
});

//Create new todo

router.post('/', async (req,res)=>{
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    todo = new Todo({
        text: req.body.text,
        status: req.body.status
    });
    const result = await todo.save();
    res.send(result);
});

//Update todo
router.put('/:id', async (req,res)=>{
    const todo = await Todo.findById(req.params.id);
    if(!todo) return res.status(404).send('There is no todo with this id.');

    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    todo.text = req.body.text;
    todo.status = req.body.status;

    const result = await todo.save();
    res.send(result);
});

//Delete todo
router.delete('/:id', async (req,res)=>{
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send('There is no todo with this id.');

    const result = await todo.remove();
    res.send(result);
})
module.exports = router;

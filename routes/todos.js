const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const todos = {};
/* GET todos listing. */
router.get('/', (req, res) => {
  res.json(Object.values(todos));
});

router.post('/', (req, res) => {
  console.log('Received a POST request ... ');
  const newTodo = {
    ...req.body,
    id: uuid.v4()
  };
  todos[newTodo.id] = newTodo;
  res.json({
    ...newTodo
  });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;

  const todo = {
    ...todos[id]
  };
  delete todos[id];
  res.json(todo);
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const todo = {
    ...req.body,
    id: id
  };
  todos[todo.id] = todo;
  res.json(todo);
});

module.exports = router;

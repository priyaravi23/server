const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const users = {};
/* GET users listing. */
router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  console.log('Received a POST request ... ');
  const newUser = {
    ...req.body,
    id: uuid.v4()
  };
  users[newUser.id] = newUser;
  res.json({
    ...newUser
  });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;

  const user = {
    ...users[id]
  };
  delete users[id];
  res.json(user);
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const user = {
    ...req.body,
    id: id
  };
  users[user.id] = user;
  res.json(user);
});

module.exports = router;

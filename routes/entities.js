const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const entities = {};
/* GET entities listing. */
router.get('/', (req, res) => {
  res.json(entities);
});

router.post('/', (req, res) => {
  console.log('Received a POST request ... ');
  const newEntity = {
    ...req.body,
    id: uuid.v4()
  };
  entities[newEntity.id] = newEntity;
  res.json({
    ...newEntity
  });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;

  const entitity = {
    ...entities[id]
  };
  delete entities[id];
  res.json(entitity);
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const entitity = {
    ...req.body,
    id: id
  };
  entities[entitity.id] = entitity;
  res.json(entitity);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const items = {};
/* GET items listing. */
router.get('/', (req, res) => {
    res.json(items);
});

router.post('/', (req, res) => {
    console.log('Received a POST request ... ');
    const newItem = {
        ...req.body,
        id: uuid.v4()
    };
    items[newItem.id] = newItem;
    res.json({
        ...newItem
    });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    const item = {
        ...items[id]
    };
    delete items[id];
    res.json(item);
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const item = {
        ...req.body,
        id: id
    };
    items[item.id] = item;
    res.json(item);
});

module.exports = router;

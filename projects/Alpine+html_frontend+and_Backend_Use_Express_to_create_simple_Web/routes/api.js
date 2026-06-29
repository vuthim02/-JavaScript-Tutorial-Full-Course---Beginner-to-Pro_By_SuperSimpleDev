const express = require('express');
const router = express.Router();

let items = [
  { id: 1, name: 'Learn Alpine.js', completed: false },
  { id: 2, name: 'Build Express backend', completed: true },
  { id: 3, name: 'Connect frontend to backend', completed: false },
];

let nextId = 4;

router.get('/items', (req, res) => {
  res.json(items);
});

router.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const item = { id: nextId++, name, completed: false };
  items.push(item);
  res.status(201).json(item);
});

router.patch('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  if (req.body.name !== undefined) item.name = req.body.name;
  if (req.body.completed !== undefined) item.completed = req.body.completed;
  res.json(item);
});

router.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  items.splice(index, 1);
  res.json({ message: 'Item deleted' });
});

module.exports = router;

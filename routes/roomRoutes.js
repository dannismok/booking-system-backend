const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Create a new room
router.post('/', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).send(room);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all rooms
router.get('/', async (req, res) => {
  const rooms = await Room.find();
  res.send(rooms);
});

// Delete a room by ID
router.delete('/:id', async (req, res) => {
    try {
      const room = await Room.findByIdAndDelete(req.params.id);
      if (!room) {
        return res.status(404).send({ message: 'Room not found' });
      }
      res.send({ message: 'Room deleted successfully' });
    } catch (err) {
      res.status(500).send(err);
    }
  });

// Update a room by ID
router.patch('/:id', async (req, res) => {
    try {
      const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!room) {
        return res.status(404).send({ message: 'Room not found' });
      }
      res.send(room);
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router;
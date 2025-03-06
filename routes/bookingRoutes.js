const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).send(booking);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Retrieve all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId').populate('roomId');
    res.send(bookings);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Retrieve a specific booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('userId').populate('roomId');
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    res.send(booking);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a booking by ID
router.patch('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    res.send(booking);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a booking by ID
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    res.send({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
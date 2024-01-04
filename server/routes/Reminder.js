// server/routes/reminders.js
const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');

router.post('/set-reminder', async (req, res) => {
  const { userId, interval } = req.body;
  const reminder = new Reminder({ userId, interval });

  try {
    await reminder.save();
    res.status(201).json({ message: 'Reminder set successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to set reminder', error: error.message });
  }
});

router.get('/get-reminder/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const reminder = await Reminder.findOne({ userId });
    res.json({ reminder });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reminder', error: error.message });
  }
});

module.exports = router;

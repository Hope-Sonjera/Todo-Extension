// server/models/Reminder.js
const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  interval: { type: Number, required: true },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;

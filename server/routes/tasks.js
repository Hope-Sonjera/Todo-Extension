// server/routes/tasks.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Task = require('../models/Task');

// Create a task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, dueDate, reminders } = req.body;
    const userId = req.userId;

    const newTask = new Task({ title, description, dueDate, reminders, user: userId });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all tasks for a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await Task.find({ user: userId });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a task
router.put('/:taskId', authMiddleware, async (req, res) => {
  try {
    const { title, description, dueDate, reminders } = req.body;
    const taskId = req.params.taskId;
    const userId = req.userId;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { title, description, dueDate, reminders },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a task
router.delete('/:taskId', authMiddleware, async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.userId;

    const deletedTask = await Task.findOneAndDelete({ _id: taskId, user: userId });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(deletedTask);
  } catch (error) {
    console.error('Error deleting task', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Add Expense
router.post('/expense', auth, async (req, res) => {
  const { title, amount, category, date } = req.body;

  try {
    const newExpense = new Expense({
      user: req.user.id,
      title,
      amount,
      category,
      date
    });

    const expense = await newExpense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get Expenses
router.get('/expenses', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;

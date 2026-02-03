const express = require('express');
const router = express.Router();
const { createExpense, getExpenses, updateExpense, deleteExpense, getExpensesByYearAndMonth, getExpensesByYear} = require('../controllers/expenseController');

router.post('/', createExpense);
router.get('/:userId', getExpenses);
router.put('/:id/:userId', updateExpense);
router.delete('/:id/:userId', deleteExpense);
router.get('/year-month/:userId/:year/:month', getExpensesByYearAndMonth);
router.get('/year/:userId/:year', getExpensesByYear);

module.exports = router;
const express = require('express');
const router = express.Router();
const { createExpense, getExpenses, updateExpense, deleteExpense, getExpensesByYearAndMonth, getExpensesByYear} = require('../controllers/expenseController');

router.post('/', createExpense);
router.get('/', getExpenses);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
router.get('/year-month/:year/:month', getExpensesByYearAndMonth);
router.get('/year/:year', getExpensesByYear);
module.exports = router;
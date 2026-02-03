const Expense = require('../models/Expense');

// Create a new expense
const createExpense = async (req, res) => {
    try {
        const { name, amount, date, category, memberId, userId } = req.body;
        const expense = await Expense.create({ name, amount, date, category, memberId, userId });
        res.status(201).json({ success: true, message: "Expense created successfully!", expense });
    } catch (e) {
        return res.status(500).json({ success: false, message: "Server error", error: e.message });
    }
};

// Get all expenses for a user
const getExpenses = async (req, res) => {
    try {
        const { userId } = req.params;
        const expenses = await Expense.find({ userId }).populate('memberId').sort({ date: 1 });
        res.status(200).json({ success: true, expenses });
    } catch (e) {
        return res.status(500).json({ success: false, message: "Server error", error: e.message });
    }
};

// Update an expense
const updateExpense = async (req, res) => {
    try {
        const { id, userId } = req.params;
        const { name, amount, date, category, memberId } = req.body;
        const expense = await Expense.findOneAndUpdate(
            { _id: id, userId },
            { name, amount, date, category, memberId },
            { new: true }
        );
        if (!expense) {
            return res.status(404).json({ success: false, message: "Expense not found or unauthorized access" });
        }
        res.status(200).json({ success: true, message: "Expense updated successfully!", expense });
    } catch (e) {
        return res.status(500).json({ success: false, message: "Server error", error: e.message });
    }
};

// Delete an expense
const deleteExpense = async (req, res) => {
    try {
        const { id, userId } = req.params;
        const expense = await Expense.findOneAndDelete({ _id: id, userId });
        if (!expense) {
            return res.status(404).json({ success: false, message: "Expense not found or unauthorized access" });
        }
        res.status(200).json({ success: true, message: "Expense deleted successfully!" });
    } catch (e) {
        return res.status(500).json({ success: false, message: "Server error", error: e.message });
    }
}; 

const getExpensesByYearAndMonth = async (req, res) => {
    try {
        const { userId, year, month } = req.params;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);
        const expenses = await Expense.find({
            userId,
            date: {
                $gte: startDate,
                $lte: endDate
            }
        }).populate('memberId');
        res.status(200).json({ success: true, expenses });
    } catch (e) {
        return res.status(500).json({ success: false, message: "Server error", error: e.message });
    }
}; 

const getExpensesByYear = async (req, res) => {
    try {
        const { userId, year } = req.params;
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31, 23, 59, 59);
        const expenses = await Expense.find({
            userId,
            date: {
                $gte: startDate,
                $lte: endDate
            }
        }).populate('memberId');
        res.status(200).json({ success: true, expenses });
    } catch (e) {
        return res.status(500).json({ success: false, message: "Server error", error: e.message });
    }
}; 

module.exports = { createExpense, getExpenses, updateExpense, deleteExpense, getExpensesByYearAndMonth, getExpensesByYear };
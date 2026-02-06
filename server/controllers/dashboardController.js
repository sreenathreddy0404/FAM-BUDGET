const Expense = require('../models/Expense');
const Member = require('../models/FamilyMember');
const mongoose = require('mongoose');

// Get dashboard data
const getDashboardData = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId);
        const now = new Date();

        // Helper: Fetches sum of amount for a date range
        const getTotal = async (from, to) => {
            const agg = await Expense.aggregate([
            { $match: {userId:userId, date: { $gte: from, $lt: to } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
            ]);
            return agg.length ? agg[0].total : 0;
        };

        // Date range definitions
        const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfNextMonth    = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const startOfLastMonth    = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const startOfCurrentYear  = new Date(now.getFullYear(), 0, 1);
        const startOfNextYear     = new Date(now.getFullYear() + 1, 0, 1);
        const startOfLastYear     = new Date(now.getFullYear() - 1, 0, 1);

        // Fetch Totals
        const totalThisMonthExpenses    = await getTotal(startOfCurrentMonth, startOfNextMonth);
        const totalPreviousMonthExpenses = await getTotal(startOfLastMonth, startOfCurrentMonth);
        const totalYearlyExpenses       = await getTotal(startOfCurrentYear, startOfNextYear);
        const totalPreviousYearExpenses = await getTotal(startOfLastYear, startOfCurrentYear);

        // Get Daily Average for current month (Total / days passed so far)
        const daysPassedInMonth = now.getDate();
        const dailyAverage = totalThisMonthExpenses / daysPassedInMonth;

        // Get Monthly Average for current year (Total / months passed so far)
        const monthsPassedInYear = now.getMonth() + 1;
        const monthlyAverage = totalYearlyExpenses / monthsPassedInYear;

        // Get total transactions of this month
        const totalTransactions = await Expense.countDocuments({ 
            userId: userId, 
            date: { $gte: startOfCurrentMonth, $lt: startOfNextMonth } 
        });

        // Get total family members
        const totalMembers = await Member.countDocuments({ userId: userId });

        // Get 5 recent transactions
        const recentExpenses = await Expense.find({ userId: userId })
            .sort({ date: -1 })
            .limit(5)
            .populate('memberId');

        res.json({
            success: true,
            data: {
                "This Month Expenses": totalThisMonthExpenses,
                "Previous Month Expenses": totalPreviousMonthExpenses,
                "This Year Expenses": totalYearlyExpenses,
                "Previous Year Expenses": totalPreviousYearExpenses,
                "Daily Average Expenses": Number(dailyAverage.toFixed(2)),
                "Monthly Average Expenses": Number(monthlyAverage.toFixed(2)),
                "Total Transactions": totalTransactions,
                "Total Members": totalMembers,
                recentExpenses
            }
        });

    } catch (e) {
        res.status(500).json({ success: false, message: "Server error", error: e.message });
    }
};

module.exports = {getDashboardData};
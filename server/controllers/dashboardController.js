const Expense = require('../models/Expense');
const Member = require('../models/Member');

// Get dashboard data
const getDashboardData = async (req, res) => {
    try {
        const userId = req.userId;
        // Get total expenses for the current month
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const totalThisMonthExpenses = await Expense.aggregate([
            { $match: { userId: userId, date: { $gte: startOfMonth } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Get total expenses for the previous month
        const startOfPreviousMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
        const endOfPreviousMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0, 23, 59, 59);
        const totalPreviousMonthExpenses = await Expense.aggregate([
            { $match: { userId: userId, date: { $gte: startOfPreviousMonth, $lt: endOfPreviousMonth } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Get total expenses for the current year
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        const totalYearlyExpenses = await Expense.aggregate([
            { $match: { userId: userId, date: { $gte: startOfYear } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        //Get total expenses for the previous year
        const startOfPreviousYear = new Date(new Date().getFullYear() - 1, 0, 1);
        const totalPreviousYearExpenses = await Expense.aggregate([
            { $match: { userId: userId, date: { $gte: startOfPreviousYear, $lt: startOfYear } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        //Get Daily average expenses for the current month
        const dailyAverageExpenses = await Expense.aggregate([
            { $match: { userId: userId, date: { $gte: startOfMonth } } },
            { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
            { $project: { average: { $divide: ["$total", "$count"] } } }
        ]);

        //Get Monthly average expenses for the current year
        const monthlyAverageExpenses = await Expense.aggregate([
            { $match: { userId: userId, date: { $gte: startOfYear } } },
            { $group: { _id: { month: { $month: "$date" } }, total: { $sum: "$amount" }, count: { $sum: 1 } } },
            { $project: { month: "$_id.month", average: { $divide: ["$total", "$count"] } } }
        ]);

        // Get total transactions of this month
        const totalTransactions = await Expense.countDocuments({
            userId: userId,
            date: { $gte: startOfMonth }
        });

        // Get total family members
        const totalMembers = await Member.countDocuments({ userId: userId });

        //Get 5 recent transactions
        const recentExpenses = await Expense.find({ userId: userId }).sort({ date: -1 }).limit(5).populate('memberId');
        res.json({
            success: true,
            data: {
                "This Month Expenses": totalThisMonthExpenses[0] ? totalThisMonthExpenses[0].total : 0,
                "Previous Month Expenses": totalPreviousMonthExpenses[0] ? totalPreviousMonthExpenses[0].total : 0,
                "This Year Expenses": totalYearlyExpenses[0] ? totalYearlyExpenses[0].total : 0,
                "Previous Year Expenses": totalPreviousYearExpenses[0] ? totalPreviousYearExpenses[0].total : 0,
                "Daily Average Expenses": dailyAverageExpenses[0] ? dailyAverageExpenses[0].average : 0,
                "Monthly Average Expenses": monthlyAverageExpenses,
                "Total Transactions": totalTransactions,
                "Total Members": totalMembers,
                "Recent Expenses": recentExpenses
            }
        });
    } catch (e) {
        res.status(500).json({ success: false, message: "Server error", error: e.message });
    }
};
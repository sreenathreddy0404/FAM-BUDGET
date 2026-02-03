const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Groceries','Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Education', 'Healthcare', 'Other']
    },
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FamilyMember',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps:true});

module.exports = mongoose.model('Expense', expenseSchema);
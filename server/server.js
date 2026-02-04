const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const FamilyMemberRoutes = require('./routes/FamilyMemberRoutes');
const ExpenseRoutes = require('./routes/expenseRoutes');
const connectToDB = require('./configs/db');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

//Connect to Database
connectToDB();

//Middleware to parse JSON bodies
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/family-members',authMiddleware,FamilyMemberRoutes);
app.use('/api/expenses',authMiddleware,ExpenseRoutes);

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
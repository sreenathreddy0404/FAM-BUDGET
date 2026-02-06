const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const FamilyMemberRoutes = require('./routes/FamilyMemberRoutes');
const ExpenseRoutes = require('./routes/expenseRoutes');
const DashboardRoutes = require('./routes/dashboardRoutes');
const connectToDB = require('./configs/db');
const authMiddleware = require('./middlewares/authMiddleware');
const cors = require('cors');

const app = express();

//Connect to Database
connectToDB();

//Middleware to parse JSON bodies
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use('/api/auth',authRoutes);
app.use('/api/family-members',authMiddleware,FamilyMemberRoutes);
app.use('/api/expenses',authMiddleware,ExpenseRoutes);
app.use('/api/dashboard',authMiddleware,DashboardRoutes);

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
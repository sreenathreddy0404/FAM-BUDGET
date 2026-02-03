const express = require('express');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const connectToDB = require('./configs/db');

const app = express();

//Connect to Database
connectToDB();

//Middleware to parse JSON bodies
app.use(express.json());
app.use('/api/auth',authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/expense'));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

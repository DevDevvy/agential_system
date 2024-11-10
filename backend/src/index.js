// src/index.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const agentsRoutes = require('./routes/agentsRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for the frontend origin
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Middleware
app.use(bodyParser.json());

// Use agents routes
app.use('/api', agentsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

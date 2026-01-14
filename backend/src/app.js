const express = require('express');
const cors = require('cors');
const path = require('path');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));

// API Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/tasks', require('./routes/task.routes'));

// Serve frontend static files
const frontendPath = path.join(__dirname, '../../frontend/dist');

// Check if frontend build exists
const fs = require('fs');
if (fs.existsSync(frontendPath)) {
    // Serve static files from frontend/dist
    app.use(express.static(frontendPath));

    // Handle React routing - return index.html for all non-API routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
} else {
    // Basic health check for development (when frontend not built)
    app.get('/', (req, res) => {
        res.json({ message: 'Welcome to Task Management API' });
    });
}

// Error handling middleware
app.use(errorHandler);

module.exports = app;

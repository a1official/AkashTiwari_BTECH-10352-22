const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/tasks', require('./routes/task.routes'));

// Basic health check
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Task Management API' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;

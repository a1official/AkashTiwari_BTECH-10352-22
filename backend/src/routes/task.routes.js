const express = require('express');
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');

const { body } = require('express-validator');

const router = express.Router();

router.use(protect); // Protect all routes in this file

router
    .route('/')
    .get(getTasks)
    .post(
        [
            body('title', 'Title is required').not().isEmpty(),
            body('description', 'Description is required').not().isEmpty(),
            body('due_date', 'Please include a valid due date').isISO8601()
        ],
        createTask
    );

router
    .route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);

module.exports = router;

const Task = require('../models/task.model');
const { validationResult } = require('express-validator');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
    try {
        let query;

        // Copy req.query
        const reqQuery = { ...req.query };

        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit'];

        // Loop over removeFields and delete them from reqQuery
        removeFields.forEach(param => delete reqQuery[param]);

        // Add userId to filter tasks
        reqQuery.userId = req.user.id;

        query = Task.find(reqQuery);

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-created_at');
        }

        const tasks = await query;

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Make sure user owns task
        if (task.userId.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this task'
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
        req.body.userId = req.user.id;

        const task = await Task.create(req.body);

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Make sure user owns task
        if (task.userId.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this task'
            });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Make sure user owns task
        if (task.userId.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to delete this task'
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
};

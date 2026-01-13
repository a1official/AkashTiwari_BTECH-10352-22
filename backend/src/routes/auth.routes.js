const express = require('express');
const { signup, login } = require('../controllers/auth.controller');
const { body } = require('express-validator');

const router = express.Router();

router.post(
    '/signup',
    [
        body('name', 'Name is required').not().isEmpty(),
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    signup
);
router.post('/login', login);

module.exports = router;

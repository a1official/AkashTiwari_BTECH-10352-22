const express = require('express');
const {
    getMe,
    updateUserProfile,
    deleteUser
} = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect); // Protect all routes in this file

router.get('/me', getMe);
router.put('/me', updateUserProfile);
router.delete('/me', deleteUser);

module.exports = router;

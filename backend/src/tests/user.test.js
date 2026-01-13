const mongoose = require('mongoose');
const User = require('../models/user.model');

describe('User Model', () => {
    it('should create a user instance', () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        };
        const user = new User(userData);
        expect(user.name).toBe(userData.name);
        expect(user.email).toBe(userData.email);
    });
});

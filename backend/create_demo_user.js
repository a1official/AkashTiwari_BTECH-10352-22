const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/user.model');

dotenv.config();

const createDemoUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const email = 'demo@example.com';
        const password = 'password123';

        // Remove if exists
        await User.deleteOne({ email });

        await User.create({
            name: 'Demo User',
            email,
            password
        });

        console.log('Demo user created successfully:');
        console.log('Email: demo@example.com');
        console.log('Password: password123');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

createDemoUser();

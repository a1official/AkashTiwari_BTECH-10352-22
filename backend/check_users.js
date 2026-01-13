const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/user.model');

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({}, 'name email');
        console.log('Existing Users in Database:');
        if (users.length === 0) {
            console.log('No users found. Please sign up first.');
        } else {
            users.forEach(u => console.log(`- Name: ${u.name}, Email: ${u.email}`));
        }
        process.exit(0);
    } catch (err) {
        console.error('Error connecting to DB:', err);
        process.exit(1);
    }
};

checkUsers();

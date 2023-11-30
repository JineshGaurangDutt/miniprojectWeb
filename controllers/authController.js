const User = require('../models/User');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
// const generateToken = (user) => {
//     return jwt.sign({ userId: user._id, role: user.role }, 'Your_JWT_Secret', { expiresIn: '1h' });
// };

// User registration
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // return res.status(400).send('User already exists');
            return res.redirect('/');
        }

        // Hash password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with role
        const user = new User({ name, email, password, role });
        await user.save();

        // Redirect to login or other appropriate page
        res.redirect('/common/login');
    } catch (error) {
        // res.status(500).send('Error in registration');
        res.redirect('/');

    }
};

// User login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.redirect('/');
        }

        // // Check password
        const matcher = await bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
                return res.status(400).send('Invalid Credentials');
            }
            else {
                req.user=user;
                if (user.role === 'admin') {
                    res.redirect('/admin/dashboard'); // Adjust this URL as needed
                } else {
                    res.redirect('/user/dashboard'); // Adjust this URL as needed
                }
            }

        });

    } catch (error) {
        res.status(500).send('user does not exist');
    }
};

// User logout
const logout = async (req, res) => {
    // Note: JWT logout is usually handled on the client side by removing the token from the client storage.

    res.redirect('/common/login');
};

module.exports = {
    register,
    login,
    logout
};

const User = require('../models/User');
const Order = require('../models/Order');
const bcrypt = require('bcrypt');

// Access User Dashboard
const dashboard = async (req, res) => {
    try {
        // Assuming user ID is stored in JWT token and extracted via middleware
        const user = req;
        // const user = await User.findById(userId);
        if (!user) {
            return res.redirect('/login');
        }

        res.render('user/userDashboard',{user});
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Get User Profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('user/profile', { user });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Update User Profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, email, password } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update fields
        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.send('Profile updated successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Get User Purchase History
const getPurchaseHistory = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orders = await Order.find({ user: userId }).populate('products.product');

        res.render('user/purchaseHistory', { orders });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

module.exports = {
    dashboard,
    getProfile,
    updateProfile,
    getPurchaseHistory
};

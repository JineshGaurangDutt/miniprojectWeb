const User = require('../models/User');
const Order = require('../models/Order');
const bcrypt = require('bcrypt');
const Product = require('../models/product');

// Access User Dashboard
const dashboard = async (req, res) => {
    try {
        const userId = req.user.id; // Extracting user ID from JWT
        const user = await User.findById(userId);

        if (!user) {
            return res.redirect('/common/login');
        }

        res.render('user/userDashboard', { user });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Get User Profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Extracting user ID from JWT
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
        const userId = req.user.id; // Extracting user ID from JWT
        const { name, email, password } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.name = name;
        user.email = email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.render('user/userDashboard', { user });
    } catch (error) {
        res.status(500).send('Error updating user');
    }
};

// View Available Products
const viewProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('user/viewProducts', { products });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Buy a Product
const buyProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        const order = new Order({
            products: [{
                product: productId,
                quantity: 1
            }],
            totalPrice: product.price
        });

        await order.save();
        res.render('user/viewProducts', { message: "Purchase successful!", products: await Product.find() });
    } catch (error) {
        res.status(500).send('Error processing your purchase');
    }
};

module.exports = {
    dashboard,
    getProfile,
    updateProfile,
    viewProduct,
    buyProduct
};

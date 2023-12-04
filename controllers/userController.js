const User = require('../models/User');
const Order = require('../models/Order');
const bcrypt = require('bcrypt');
const Product = require('../models/product');
// Access User Dashboard
const dashboard = async (req, res) => {
    try {
        // Assuming user ID is stored in JWT token and extracted via middleware
        const userId = req.user;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.redirect('/login');
        }

        res.render('user/userDashboard',{user});
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Get user Profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('user/profile', { user });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Update profile
const updateProfile = async (req, res) => {
    
    try {
        const { name, email, password, role } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.name = name;
        user.email = email;
        user.password = password;
        user.role = role;
        await user.save();
        res.render('user/userDashboard',{user});
    } catch (error) {
        res.status(500).send('Error updating user');
    }
};


// // Get User Purchase History
// const getPurchaseHistory = async (req, res) => {
//     try {
//         const userId = req.user.userId;
//         const orders = await Order.find({ user: userId }).populate('products.product');

//         res.render('user/purchaseHistory', { orders });
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };



// Manage Products
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

        // Assuming the user is logged in and their ID is stored in the session
        // const userId = req.session.userId; // or however you store the user's ID
        // const user = await User.findById(userId);

        // if (!user) {
        //     return res.status(404).send('User not found');
        // }

        const order = new Order({
            products: [{
                product: productId,
                quantity: 1 // This can be modified to handle different quantities
            }],
            totalPrice: product.price
        });

        await order.save();
        res.render('user/viewProducts', {  message: "Purchase successful!", products: await Product.find() });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing your purchase');
    }
};
module.exports = {
    dashboard,
    getProfile,
    updateProfile,
    buyProduct,
    viewProduct,
    // getPurchaseHistory
};

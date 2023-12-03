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

// Get User Profile
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

// const getProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);


//         // Implement logic for dashboard data if needed
//         res.render('user/profile',{user});
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };

// Update profile
const updateProfile = async (req, res) => {
    console.log("hi")
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

// // Update User Profile
// const updateProfile = async (req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { name, email, password } = req.body;
//         const user = await User.findById(req.params.id);

//         if (!user) {
//             return res.status(404).send('User not found');
//         }

//         // Update fields
//         user.name = name || user.name;
//         user.email = email || user.email;

//         if (password) {
//             user.password = await bcrypt.hash(password, 10);
//         }

//         await user.save();
//         res.send('Profile updated successfully');
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };

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
        const { userId, products } = req.body; // products should be an array of { product, quantity }
        let totalPrice = 0;

        // Calculate total price
        for (let item of products) {
            const product = await Product.findById(item.product);
            totalPrice += product.price * item.quantity;
        }

        const order = new Order({
            userId,
            products,
            totalPrice
        });

        await order.save();
        res.render('user/viewProducts', {  message: "Purchase successful!" });
    } catch (error) {
        res.render('user/viewProducts', { error: error.message });
    }
};


module.exports = {
    dashboard,
    getProfile,
    updateProfile,
    buyProduct,
    viewProduct,
    getPurchaseHistory
};

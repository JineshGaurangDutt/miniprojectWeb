const User = require('../models/User');
const Product = require('../models/product');
const Order = require('../models/Order');

// Admin Dashboard
const dashboard = async (req, res) => {
    try {
        // Implement logic for dashboard data if needed
        res.render('admin/adminDashboard');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Manage Users
const manageUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.render('admin/manageUsers', { users });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Add User
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let user = new User({ name, email, password, role });
        await user.save();
        res.redirect('/admin/manageUsers');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
};

// Edit User Page
const editUserPage = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('admin/editUser', { user });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Update User
const editUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.name = name;
        user.email = email;
        user.password = password; // Note: Ensure the User model hashes the password if it's modified
        user.role = role;
        await user.save();
        res.redirect('/admin/manageUsers');
    } catch (error) {
        res.status(500).send('Error updating user');
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin/manageUsers');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
};

// Manage Products
const manageProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('admin/manageProducts', { products });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Add Product Page
const addProductPage = async (req, res) => {
    try {
        res.render('admin/addProduct');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Add Product
const addProduct = async (req, res) => {
    try {
        const { name, price, description, spiciness } = req.body;
        let product = new Product({ name, price, description, spiciness });
        await product.save();
        res.redirect('/admin/manageProducts');
    } catch (error) {
        res.status(500).send('Error adding product');
    }
};

// Edit Product Page
const editProductPage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('admin/editProduct', { product });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Edit Product
const editProduct = async (req, res) => {
    try {
        const { name, price, description, spiciness } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name;
            product.price = price;
            product.description = description;
            product.spiciness = spiciness;
            await product.save();
        }
        res.redirect('/admin/manageProducts');
    } catch (error) {
        res.status(500).send('Error updating product');
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/admin/manageProducts');
    } catch (error) {
        res.status(500).send('Error deleting product');
    }
};

// Generate Sales Report
const salesReport = async (req, res) => {
    try {
        // Fetch all orders
        const orders = await Order.find({}).populate('products.product');

        // Initialize report data
        let totalSales = 0;
        let totalOrders = orders.length;
        let salesByProduct = {};

        // Process each order
        orders.forEach(order => {
            totalSales += order.totalPrice;

            order.products.forEach(item => {
                const productName = item.product.name;
                const salesAmount = item.product.price * item.quantity;

                if (!salesByProduct[productName]) {
                    salesByProduct[productName] = {
                        quantity: 0,
                        sales: 0
                    };
                }

                salesByProduct[productName].quantity += item.quantity;
                salesByProduct[productName].sales += salesAmount;
            });
        });

        // Render the sales report view with aggregated data
        res.render('admin/salesReport', { totalSales, totalOrders, salesByProduct });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Generate User Report
const userReport = async (req, res) => {
    try {
        const users = await User.find({});
        res.render('admin/userReport', { users });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

module.exports = {
    dashboard,
    manageUsers,
    createUser,
    editUser,
    editUserPage,
    deleteUser,
    manageProducts,
    addProductPage,
    addProduct,
    editProduct,
    editProductPage,
    deleteProduct,
    salesReport,
    userReport
};


// const User = require('../models/User');
// const Product = require('../models/product');
// const Order = require('../models/Order');
// const helpers = require('../utils/helpers');
// const bcrypt = require('bcrypt');

// // Admin Dashboard
// const dashboard = async (req, res) => {
//     try {
//         // Implement logic for dashboard data if needed
//         res.render('admin/adminDashboard');
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };

// // Manage Users
// const manageUsers = async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.render('admin/manageUsers', { users });
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };

// // Add User
// const createUser = async (req, res) => {
//     try {
//         const { name, email, password, role } = req.body;
//         let user = new User({ name, email, password, role });
//         await user.save();
//         res.redirect('/admin/manageUsers');
//     } catch (error) {
//         res.status(500).send('Error creating user');
//     }
// };

// // edit user page
// const editUserPage = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);

//         // Implement logic for dashboard data if needed
//         res.render('admin/editUser',{user});
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };


// // Update User
// const editUser = async (req, res) => {
//     try {
        
//         const { name, email, password, role } = req.body;
//         console.log(req.params.id);
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).send('User not found');
//         }
//         user.name = name;
//         user.email = email;
//         user.password = password;
//         user.role = role;
        
//         await user.save();
//         res.redirect('/admin/manageUsers');
//     } catch (error) {
//         res.status(500).send('Error updating user');
//     }
// };

// // Delete User
// const deleteUser = async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.redirect('/admin/manageUsers');
//     } catch (error) {
//         res.status(500).send('Error deleting user');
//     }
// };

// // Manage Products
// const manageProducts = async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.render('admin/manageProducts', { products });
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };

// // add product page
// const addProductPage = async (req, res) => {
//     try {
//         res.render('admin/addProduct');
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };


// // Add Product
// const addProduct = async (req, res) => {
//     try {
//         const { name, price, spiciness, description } = req.body;
//         const newProduct = new Product({ name, price, spiciness, description });
//         await newProduct.save();
//         res.redirect('/admin/manageProducts');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error adding product');
//     }
// };

// // edit product page
// const editProductPage = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         res.render('admin/editProduct',{product});
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };

// // Edit Product
// const editProduct = async (req, res) => {
//     try {
//         const { name, price, spiciness, description } = req.body;
//         const product = await Product.findById(req.params.id);
//         if (name) product.name = name;
//         if (price) product.price = price;
//         if (spiciness) product.spiciness = spiciness;
//         if (description) product.description = description;
//         await product.save();
//         res.redirect('/admin/manageProducts');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error updating product');
//     }
// };


// // Delete Product
// const deleteProduct = async (req, res) => {
//     try {
//         await Product.findByIdAndDelete(req.params.id);
//         res.redirect('/admin/manageProducts');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error deleting product');
//     }
// };

// // Generate Sales Report
// const salesReport = async (req, res) => {
//     try {
//        // Fetch sales data and aggregate it for the report
//         const orders = await Order.find({}
//         );
//         for(let o of orders){
//             o.quantity= o.products.length
//         }
//         res.render('admin/salesReport', { orders });
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };

// // Generate User Report
// const userReport = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.render('admin/userReport', { users });
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };




// module.exports = {
//     dashboard,
//     manageUsers,
//     createUser,
//     editUser,
//     editUserPage,
//     deleteUser,
//     manageProducts,
//     addProductPage,
//     addProduct,
//     editProduct,
//     editProductPage,
//     deleteProduct,
//     salesReport,
//     userReport
// };

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');


// Middleware to check if the user is an admin
router.use(authMiddleware.checkAdmin);
// Admin CRUD operations for users
router.post(
    '/create-user',
    [
      check('name').notEmpty().withMessage('Name is required'),
      check('phone').notEmpty().withMessage('Phone is required'),
      check('email').isEmail().withMessage('Invalid email'),
      check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    adminController.createUser
  );
router.get('/get-users', adminController.getUsers);
router.put('/update-user/:id', adminController.updateUser);
router.delete('/delete-user/:id', adminController.deleteUser);

// Admin CRUD operations for products
router.post(
  '/create-product',
  [
    check('name').notEmpty().withMessage('Product name is required'),
    check('price').isNumeric().withMessage('Price must be a number'),
    check('productID').notEmpty().withMessage('Product ID is required'),
    check('spiciness').notEmpty().withMessage('Spiciness level is required'),
    check('description').notEmpty().withMessage('Description is required'),
  ],
  adminController.createProduct
);
router.get('/get-products', adminController.getProducts);
router.put('/update-product/:id', adminController.updateProduct);
router.delete('/delete-product/:id', adminController.deleteProduct);

module.exports = router;

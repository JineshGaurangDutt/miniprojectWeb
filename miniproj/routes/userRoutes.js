const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware to check if the user is logged in
router.use(authMiddleware.checkUser);

// User CRUD operations for products
router.get('/get-products', userController.getProducts);
router.get('/get-product/:id', userController.getProduct);
router.post('/buy-product/:id', userController.buyProduct);
router.get('/purchase-history', userController.getPurchaseHistory);

module.exports = router;

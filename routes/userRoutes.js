const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/dashboard', userController.dashboard);
router.get('/profile/:id', userController.getProfile);
router.post('/profile/:id', userController.updateProfile);
router.get('/purchaseHistory', userController.getPurchaseHistory);
router.get('/viewProducts', userController.viewProduct);
router.post('/buyProduct', userController.buyProduct);


module.exports = router;

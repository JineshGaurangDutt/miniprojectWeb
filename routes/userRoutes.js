const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/dashboard', userController.dashboard);
router.get('/profile/:id', userController.getProfile);
router.post('/profile', userController.updateProfile);
router.get('/purchaseHistory', userController.getPurchaseHistory);

module.exports = router;

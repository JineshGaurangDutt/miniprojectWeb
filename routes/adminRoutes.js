const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.dashboard);
router.get('/manageUsers', adminController.manageUsers);
router.post('/createUser', adminController.createUser);
router.post('/editUser/:id', adminController.editUser);
router.get('/deleteUser/:id', adminController.deleteUser);
router.get('/manageProducts', adminController.manageProducts);
router.post('/addProduct', adminController.addProduct);
router.post('/editProduct/:id', adminController.editProduct);
router.post('/deleteProduct/:id', adminController.deleteProduct);
router.get('/salesReport', adminController.salesReport);
// router.get('/reports', adminController.showReports);
router.get('/userReport', adminController.userReport);

module.exports = router;

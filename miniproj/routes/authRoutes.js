// authRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const { checkAdmin, checkUser } = require('../middleware/authMiddleware');


// Default route (register page)
router.get('/', (req, res) => {
  res.render('auth/register');
});

// Default route (login page)
router.get('/login', (req, res) => {
res.render('auth/login');
});

// Default route (register page)
router.get('/register', (req, res) => {
res.render('auth/register');
});

// Default route (register page)
router.get('/user-dashboard', (req, res) => {
  res.render('user/dashboard');
  });

  
// // Example of a protected route (requires user login)
// router.get('/dashboard', checkUser, (req, res) => {
//   // Access the authenticated user using req.user
//   const userId = req.user.userId;
//   const role = req.user.role;

//   // Render the dashboard template with user information
//   res.render('user/dashboard', { userId, role });
// });

// // Example of a protected route (requires admin access)
// router.get('/admin-dashboard', checkAdmin, (req, res) => {
//   // Access the authenticated admin using req.user
//   const adminId = req.user.adminId;
//   const role = req.user.role;

//   // Render the admin dashboard template with admin information
//   res.render('admin/dashboard', { adminId, role });
// });

// User registration (for both admin and user)
router.post(
    '/register',
    [
        check('name').notEmpty().withMessage('Name is required'),
        check('phone').notEmpty().withMessage('Phone is required'),
        check('email').isEmail().withMessage('Invalid email'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    authController.register
);

// User login
router.post('/login', authController.loginUser);


// Admin login
router.post('/login-admin', authController.loginAdmin);

module.exports = router;

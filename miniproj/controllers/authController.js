const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const { validationResult } = require('express-validator');

// Common registration logic for both admin and user
exports.register = async (req, res) => {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const { name, phone, email, password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Determine the role based on some criteria (e.g., email domain)
      const isEmailForAdmin = email.endsWith('@restaurant.com');

      if (isEmailForAdmin) {
          // Admin registration
          const admin = new Admin({
              name,
              phone,
              email,
              password: hashedPassword,
          });

          await admin.save();

          res.status(201).json({ message: 'Admin registered successfully' });
      } else {
          // User registration
          const user = new User({
              name,
              phone,
              email,
              password: hashedPassword,
          });

          await user.save();

          res.status(201).json({ message: 'User registered successfully' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
};


// User login
exports.loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id, role: 'user' }, 'your-secret-key', {
          expiresIn: '1h',
      });

      // Redirect to the user dashboard
      res.redirect('user-dashboard');
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
};


// Admin login
exports.loginAdmin = async (req, res) => {
  try {
      const { email, password } = req.body;

      const admin = await Admin.findOne({ email });

      if (!admin) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ adminId: admin._id, role: 'admin' }, 'your-secret-key', {
          expiresIn: '1h',
      });

      // Redirect to the admin dashboard
      res.redirect('admin/dashboard');
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
};
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const path = require('path');
const config = require('./config'); // Ensure you have your database URI and JWT secret here

// Importing route modules
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');

// Importing JWT middleware
const { verifyTokenMiddleware } = require('./utils/auth');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
   
})
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.error("MongoDB connection error: ", err));

// Mustache Templating Engine Setup
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); // Parse cookies for JWT
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);

// Protected Routes
app.use('/user', verifyTokenMiddleware, userRoutes);
app.use('/admin', verifyTokenMiddleware, adminRoutes);
app.use('/product', verifyTokenMiddleware, productRoutes);

// Home Route
app.get('/', (req, res) => {
    res.render('home');
});

// Route to render the login page
app.get('/common/login', (req, res) => {
    res.render('common/login', {
        // Add any necessary data for the template
        title: 'Login'
    });
});

// Route to render the registration page
app.get('/common/register', (req, res) => {
    res.render('common/register', {
        // Add any necessary data for the template
        title: 'Register'
    });
});


// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));

module.exports = app;

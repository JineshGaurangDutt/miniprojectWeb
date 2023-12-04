const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const path = require('path');
const config = require('./config'); // Import the configuration file
const auth = require('./utils/auth')

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
});

// Mustache Templating Engine Setup
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');

// Set up the directory for partials
const partialsPath = path.join(__dirname, 'views', 'partials');
app.set('partials', partialsPath);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
}));
const isAuthenticated = (req,res, next) => {
    if(req.session.user) next();
    else res.redirect("/common/login");

}
// app.use(isAuthenticated);

// Using Routes
app.use('/auth', authRoutes);
app.use('/user', isAuthenticated, userRoutes);
app.use('/admin', isAuthenticated, adminRoutes);
app.use('/product', isAuthenticated, productRoutes);

// Home Route
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/common/login', (req, res) => {
    res.render('common/login');
});

app.get('/common/register', (req, res) => {
    res.render('common/register', {
        // Pass any necessary data for the template
        title: 'Register'
    });
});


// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));

module.exports = app;

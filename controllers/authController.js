const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/auth');

// User Registration
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Create new user (password will be hashed in pre-save hook)
        const user = new User({ name, email, password, role });
        await user.save();

        // Redirect to login page after registration
        res.redirect('/common/login');
    } catch (error) {
        res.status(500).send('Error in registration');
    }
};

// User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('User not found');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate JWT token
        const token = generateToken(user);

        // Set token in HTTP-only cookie
        res.cookie('authToken', token, { httpOnly: true, sameSite: 'Strict' });

        // Redirect based on user role
        if (user.role === 'admin') {
            res.render("admin/adminDashboard", { user, message: "Admin logged in successfully" });
        } else {
            res.render("user/userDashboard", { user, message: "User logged in successfully" });
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
};


// User Logout
const logout = async (req, res) => {
    // Clear the authentication cookie
    res.clearCookie('authToken');
    res.redirect('/common/login');
};

module.exports = {
    register,
    login,
    logout
};





// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const { generateToken } = require('../utils/auth');
// const { verifyToken } = require('../utils/auth');

// // User registration
// const register = async (req, res) => {
//     try {
//         const { name, email, password, role } = req.body;

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             // return res.status(400).send('User already exists');
//             return res.redirect('/');
//         }


//         // Create new user with role
//         const user = new User({ name, email, password, role });
//         await user.save();

//         // Redirect to login or other appropriate page
//         res.redirect('/common/login', { message: "User Registered successfully",} );
//     } catch (error) {
//         // res.status(500).send('Error in registration');
//         res.redirect('/');

//     }
// };

// // User login
// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if user exists
//         const user = await User.findOne({ email });
        
//         if (!user) {
//             return res.redirect('/');
//         }

//         // // Check password
//         const matcher = await bcrypt.compare(password, user.password, (err, result) => {
//             if (!result) {
//                 return res.status(400).send('Invalid Credentials');
//             }
//             else {
                
//                 const token = generateToken(user);
//                 req.session.user={...user, token};
//                 req.session.token = token;

//                 // req.user=user; 
//                 if (user.role === 'admin') {
//                     res.render("admin/adminDashboard", { user: user, message: "User logged in successfully" }); // Adjust this URL as needed
//                 } else {
//                     
//                     res.render("user/userDashboard", { user: user, message: "User logged in successfully" }); // Adjust this URL as needed
//                 }
//             }

//         });

//     } catch (error) {
//         res.status(500).send('user does not exist');
//     }
// };

// // User logout
// const logout = async (req, res) => {
//     // Note: JWT logout is usually handled on the client side by removing the token from the client storage.
//     req.session.destroy((err)=>{
//         if(err) return;
//         res.redirect('/common/login');
//     });
// };

// module.exports = {
//     register,
//     login,
//     logout
// };

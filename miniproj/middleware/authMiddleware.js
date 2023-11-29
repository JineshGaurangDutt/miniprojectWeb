// authMiddleware.js

// Middleware to check if the user is an admin
exports.checkAdmin = (req, res, next) => {

    if (req.user && req.user.role === 'admin') {
      next(); // User is an admin, proceed to the next middleware or route handler
    } else {
      res.status(403).json({ error: 'Unauthorized access' }); // User is not an admin, send forbidden status
    }
  };
  
  // Middleware to check if the user is logged in
  exports.checkUser = (req, res, next) => {
    
    if (req.user) {
      next(); // User is logged in, proceed to the next middleware or route handler
    } else {
      res.status(401).json({ error: 'Unauthorized access' }); // User is not logged in, send unauthorized status
    }
  };
  
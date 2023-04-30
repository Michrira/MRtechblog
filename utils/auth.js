// Define a middleware function named withAuth that takes three parameters: req, res, and next
const withAuth = (req, res, next) => {
  // If the user_id property does not exist in the session object, redirect the user to the login page
  if (!req.session.user_id) {
      res.redirect('/login');
  } else {
      // Otherwise, call the next middleware function in the stack
      next();
  }
};

// Export the withAuth function to be used in other files
module.exports = withAuth;

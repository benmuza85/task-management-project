// src/middleware/authMiddleware.js
module.exports = {
    ensureAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/');
    },
  };
  
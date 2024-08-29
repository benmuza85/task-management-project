// src/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const CLIENT_URL = "http://localhost:3000/"

const router = express.Router();


// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: CLIENT_URL,
    successRedirect: CLIENT_URL,
}),
  (req, res) => {
    res.redirect('/');
  }
);


// Logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect(CLIENT_URL);
});

router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });

module.exports = router;

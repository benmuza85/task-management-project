// src/routes/authRoutes.js
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const CLIENT_URL = process.env.NODE_ENV==='production'?"https://task-management-benson-cda7d51e8621.herokuapp.com/":'http://localhost:3000';

const router = express.Router();

// Local authentication
router.post('/login', (req, res, next)=>{
  passport.authenticate('local', (err, theUser, failureRedirect)=>{
    if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
  }

  if (!theUser) {
      res.status(401).json({msg:'user not found'});
      return;
  }

  // save user in session
  req.login(theUser, (err) => {
      if (err) {
          res.status(500).json({ message: 'Session save went bad.' });
          return;
      }
      res.status(200).json({errors: false, user: theUser});
  });
  })(req, res, next);
});

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json({user});
    });
  } catch (err) {
    res.status(500).json({msg:err});
  }
});


// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: CLIENT_URL,
    successRedirect: CLIENT_URL,
}),
  (req, res) => {
    res.redirect(CLIENT_URL);
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

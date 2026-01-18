const express = require('express');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const router = express.Router();

// Passport Discord Strategy
passport.use(new DiscordStrategy({
  clientID: process.env.1462383337325858838,
  clientSecret: process.env._wfMKcn1q8tpRy2UBX_QgLoIU_L9Lu7f,
  callbackURL: 'http://localhost:3000/auth/discord/callback',
  scope: ['identify', 'email', 'guilds']
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Login route
router.get('/login', passport.authenticate('discord'), (req, res) => {});

// Callback route
router.get('/discord/callback', passport.authenticate('discord', {
  failureRedirect: '/',
  successRedirect: '/dashboard'
}));

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;


const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedin } = require('../lib/auth');

router.get('/signup', (req, res) => {
    res.render('../views/auth/signup.hbs');
})

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.get('/signin', (req, res) => {
    res.render('../views/auth/signin.hbs');
})

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin' ,{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
})

router.get('/logout', (req, res) =>{
    res.render('logout')
    req.logOut();

})

module.exports = router;
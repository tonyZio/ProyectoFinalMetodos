const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/singup', (req, res) =>{
    res.render('../views/auth/singup.hbs')
})

router.post('/singup', passport.authenticate('local.singup', {
    successRedirect: '/profile',
    failureRedirect: '/singup',
    failureFlash: true
}))

router.get('/profile', (req, res) => {
    res.send('Perfin')
})

module.exports = router;
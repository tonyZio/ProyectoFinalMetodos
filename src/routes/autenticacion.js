const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/singup', (req, res) =>{
    res.render('../views/auth/singup.hbs')
})

router.post('/singup', (req, res) =>{
    passport.authenticate('local.singup', {
        sucessRedirect: '/profile',
        failureRedirect: '/singup',
        failureFlash: true
    })
    res.send('Reciebed')
})

router.get('/profile', (req, res) => {
    res.send('Perfin')
})
module.exports = router;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');


passport.use('local.singup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (req, username, password, done) => {
    const newUser = {
        username,
        password
    };

    newUser.password =  await helpers.encryptPassword(password);

    const result = await pool.query('INSERT into teachers SET ?', [newUser]);
    console.log(result);

}));



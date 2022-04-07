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
    newUser.id = result.insertId;
    return done(null, newUser);

}));

passport.serializeUser((usr, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) =>{
    const filas = await pool.query('SELECT * FROM teachers WHERE id = ?', [id]);
    done(null, filas[0]);
})
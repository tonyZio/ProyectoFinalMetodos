const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');


passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
   const rows = await pool.query('SELECT * FROM teachers WHERE username = ?', [username]);
    if(rows.length > 0){
        const teacher = rows[0];
        const validPassword = await helpers.matchPassword(password, teacher.password)
        if(validPassword){
            done(null, teacher);
        } else {
            done(null, false)
        }

    } else {
        return done(null, false)
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    let newUser = {
        username,
        password
    }
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO teachers SET ?', newUser)
    newUser.id = result.insertId;
    return done(null, newUser);

}));

passport.serializeUser((teacher, done) => {
    done(null, teacher.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM teachers WHERE id = ?', [id]);
    done(null, rows[0]);
  });
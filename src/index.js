const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MYSQLSTORE = require('express-mysql-session');
const {database} = require('./keys');

//init
const app = express();

//Settings
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'Partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'sessionsqlnode',
    resave: 'false',
    saveUninitialized: 'false',
    store: new MYSQLSTORE(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Global
app.use((req, res, next) =>{
    app.locals.success = req.flash('success')
    next()
})

//Routes
app.use(require('./routes'))
app.use(require('./routes/autenticacion'))
app.use('/links', require('./routes/links'))

//Public
app.use(express.static(path.join(__dirname, 'public')));
//Start
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});
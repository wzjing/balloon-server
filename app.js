let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let logger = require('morgan');
let sassMiddleware = require('node-sass-middleware');
let favicon = require('serve-favicon');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let workerRouter = require('./routes/workers');
let loginRouter = require('./routes/login');
let registerRouter = require('./routes/register');

// API
let loginAPI = require('./api/login');
let registerAPI = require('./api/register');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/workers', workerRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.use('/api/login', loginAPI);
app.use('/api/register', registerAPI);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

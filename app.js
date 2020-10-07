const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cookeryRouter = require('./routes/cookery');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


if (process.env.perform === 'PRD') {
    app.get('*', (req, res, next) => {
        if (req.headers["x-forwarded-proto"] === "https") {
            return next();
        }
        res.redirect("https://" + req.headers.host + req.url);
    });
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules/bootstrap', express.static(__dirname + '/node_modules/bootstrap'));
app.use('/node_modules/popper.js', express.static(__dirname + '/node_modules/popper.js'));
app.use('/node_modules/jquery', express.static(__dirname + '/node_modules/jquery'));
app.use('/node_modules/animate.css', express.static(__dirname + '/node_modules/animate.css'));
app.use('/node_modules/wowjs', express.static(__dirname + '/node_modules/wowjs'));

app.use('/', indexRouter);

app.use('/users', usersRouter);
app.use('/cookery', cookeryRouter);

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

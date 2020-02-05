var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const uuid = require('uuid');
const cors = require('cors');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// write routes for user here

const users = {};

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    console.log('Received a POST request ... ');
    const newUser = {
        ...req.body,
        id: uuid.v4()
    };
    users[newUser.id] = newUser;
    res.json({
        ...newUser
    });
});

app.delete('/users/:id', (req, res) => {
    const {id} = req.params;

    const user = {
        ...users[id]
    };
    delete users[id];
    res.json(user);
});

app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const user = {
        ...req.body,
        id: id
    };
    users[user.id] = user;
    res.json(user);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

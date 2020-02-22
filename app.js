const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const uuid = require('uuid');
const cors = require('cors');

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');
const entitiesRouter = require('./routes/entities');
const itemsRouter = require('./routes/items');

const app = express();

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


app.use('/users', usersRouter);
app.use('/todos', todosRouter);
app.use('/entities', entitiesRouter);
app.use('/items', itemsRouter);

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

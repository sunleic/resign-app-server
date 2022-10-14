var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 表单规则验证
const joi = require('joi');
// token生成
const {expressjwt} = require('express-jwt');
// token全局配置文件
const config = require('./config');
// 跨域组件
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var productsRouter = require('./routes/products')

var app = express();

// 设置跨域
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json()); // 接受application/json格式的参数
app.use(express.urlencoded({ extended: false })); // 接受x-www-form-urlencoded格式参数
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  token验证
app.use(expressjwt({secret: config.jwtSecretKey, algorithms: ['HS256'], credentialsRequired: true}).unless({path: [/^\/api\/user\/login|register/,/\/api/]}));

// 数据返回中间件
app.use(function(req, res, next) {
  // status 默认值为1，标识失败的状态, 0代表成功
  // err的值可能是错误对象，也可能是错误描述的字符串
  res.cc = function(err, data = {}, status = 1) {
    res.json({
      status,
      message: err instanceof Error ? err.message : err,
      data
    })
  }
  next();
});

app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/app', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 规则验证失败
  if (err instanceof joi.ValidationError) return res.send(err);

  // render the error page
  res.send(err, {}, err.status || 500);
});

module.exports = app;

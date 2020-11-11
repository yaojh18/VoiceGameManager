var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var server = require('http').createServer(app);
var mockRouter = require('./routes/mock')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//import { Token } from './routes/common.js';

var app = express();

//mock
app.use('/mock', mockRouter);
//cookie
app.use(cookieParser());
// view engine setup
app.use(bodyParser.json({
    limit: '1mb'
})); //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({ //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
app.all('*', function(req, res, next) {
    console.log('JWT ' + Token);
    res.header('Authorization', 'JWT ' + Token);
    // 设置请求头为允许跨域
    res.header('Access-Control-Allow-Origin', '*');
    // 设置服务器支持的所有头信息字段
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
    // 设置服务器支持的所有跨域请求的方法
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method.toLowerCase() == 'options') {
        res.send(200); // 让options尝试请求快速结束
    } else {
        next();
    }
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
process.env.PORT = 80;

module.exports = app;
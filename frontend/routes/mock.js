var express = require('express');
var router = express.Router();
var Mock = require('mockjs');
var Random = Mock.Random;

/* GET home page. */
router.get('/', function(req, res, next) {
    // 输出结果
    console.log("success");
    res.send("success");
});

module.exports = router
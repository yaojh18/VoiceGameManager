const axios = require('axios');
var express = require('express');
var urlRegisterPost = "https://VoiceTestGame-Dijkstra.app.secoder.net/api/users/registrtion";
var urlLoginPost = "https://VoiceTestGame-Dijkstra.app.secoder.net/api/users/login";

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
    res.render('register', { 'title': 'Register Page' });
});
router.get('/login', function(req, res, next) {
    res.render('login', {
        'title': 'Login Page'
    });
});
router.get('/manager', function(req, res, next) {
    res.render('main', {
        'title': 'Manager Page'
    });
});

router.post('/register', function(req, res, next) {
    axios
        .post(urlRegisterPost, {
            "user_name": req.body.user,
            "password": req.body.pwd,
            "password2": req.body.pwd2
        })
        .then(function(response) {
            //debug
            console.log(response);
            //
            if (response.data.code == 200) {
                req.session.user = response;
                res.render("main", {
                    title: "Main Page",
                });
            } else {
                res.render("error", {
                    title: "Error Page",
                });
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    var user_name = req.body.user;
    var password = req.body.pwd;
    var password2 = req.body.pwd2;
    res.write({ "username": user_name, "password": password, "password2": password2 });
    console.log("User name = " + user_name + ", password is " + password);
    res.end("yes");
    res.render('/manager', { 'title': 'Welcome to Manager' });
});
router.post('/login', function(req, res, next) {
    axios
        .post(urlLoginPost, {
            "user_name": req.body.user,
            "password": req.body.pwd
        })
        .then(function(response) {
            //debug
            console.log(response);
            //
            if (response.data.code == 200) {
                req.session.user = response;
                res.render("main", {
                    title: "Main Page",
                });
            } else {
                res.render("error", {
                    title: "Error Page",
                });
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    var user_name = req.body.user;
    var password = req.body.pwd;
    res.write({ "username": user_name, "password": password });
    console.log("User name = " + user_name + ", password is " + password);
    res.end("yes");
    res.render('/manager', { 'title': 'Welcome to Manager' });
});



module.exports = router;
const axios = require('axios');
var express = require('express');
var bodyParser = require('body-parser');
var Cookies = require('cookies');
var urlRegisterPost = "https://VoiceTestGame-Dijkstra.app.secoder.net/api/users/registration/";
var urlLoginPost = "https://VoiceTestGame-Dijkstra.app.secoder.net/api/users/login/";
var urlAdd = "https://VoiceTestGame-Dijkstra.app.secoder.net/api/manager/add/";
var urlSearch = "https://VoiceTestGame-Dijkstra.app.secoder.net/api/manager/search/";
var urlEdit = "https://VoiceTestGame-Dijkstra.app.secoder.net/api/manager/edit/";
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
            "username": req.body.user,
            "password": req.body.pwd,
            "password2": req.body.pwd2
        })
        .then(function(response) {
            console.log(response.data.msg);
            console.log(response.data.code);
            if (response.data.code == 200) {
                res.cookie("userinfo", {
                    'username': req.body.user,
                    'password': req.body.pwd
                });
                console.log("after loading userinfo");
                res.render("main", {
                    title: "Main Page",
                    userName: req.body.user
                });
            } else {
                res.render("error", {
                    title: "Error Page",
                });
            }
        })
        .catch(function(error) {
            console.log(error);
            res.render("error");
        });
});
router.post('/login', function(req, res, next) {
    var User = req.body.user;
    var Pwd = req.body.pwd;
    console.log(User);
    console.log(Pwd);
    axios
        .post(urlLoginPost, {
            "username": User,
            "password": Pwd,
        })
        .then(function(response) {
            console.log("success");
            console.log(response.data.msg);
            console.log(response.data.code);
            if (response.data.code == 200) {
                console.log("still working here");
                browser.cookies.set('userInfo', JSON.stringify({　　
                    username: req.body.user,
                    password: req.body.pwd
                }));
                console.log("still working after cookies.set");
                console.log("after loading userinfo");
                console.log("200");
                return res.render("main", {
                    userName: req.body.user
                });
            } else {
                return res.render("error");
            }
        })
        .catch(function(error) {
            console.log(error);
            console.log("error");
            return res.redirect(404, "error");
        });
});
router.post('/manager', function(req, res, next) {
    var url = "";
    var content = "";
    console.log("success");
    console.log(req.body);
    console.log(req.body.option);
    if (req.body.option == "add") {
        console.log("add");
        url = urlAdd;
        content = {
            "title": req.body.title,
            "content": req.body.content,
            "fileaudio": req.body.fileaudio,
            "filevideo": req.body.filevideo
        }
    } else if (req.body.option == "modify") {
        console.log("modify");
        url = urlEdit;
        content = {
            "title": req.body.title,
            "content": req.body.content,
            "fileaudio": req.body.fileaudio,
            "filevideo": req.body.filevideo
        }
    } else if (req.body.option == "query") {
        console.log("query");
        url = urlSearch;
        content = {
            'keyword': req.body.keyword
        }
    }
    console.log(url);
    console.log(content);
    axios
        .post(url, content)
        .then(function(response) {
            console.log("success");
            console.log(response.data.msg);
            console.log(response.data.code);
            if (response.data.code == 200) {
                console.log("200");
                return res.render("main");
            } else {
                return res.render("error");
            }
        })
        .catch(function(error) {
            console.log(error);
            console.log("error");
            return res.render("error");
        });
});


module.exports = router;
module.exports = router;
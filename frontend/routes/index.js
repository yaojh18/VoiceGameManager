const axios = require('axios');
var qs = require('qs');
var FormData = require('FormData');
var express = require('express');
var bodyParser = require('body-parser');
var Cookies = require('cookies');
var cookies = require('cookie-parser');
var Token = "";
var globalUser = "";
var config = {  
    headers: {
        'Authorization': 'JWT' + Token,
        'Content-Type': 'multipart/form-data'
    }
};          
var globalUser = "";
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
    console.log("well, this is not true");
    res.render('main', {
        'title': 'Manager Page',
        user: globalUser
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
            // /console.log(response.data.msg);
            ///console.log(response.data.code);
            if (response.status == 200) {
                /*res.cookie("userinfo", {
                    'username': req.body.user,
                    'password': req.body.pwd
                });*/
                console.log("after loading userinfo");
                globalUser = req.body.user;
                return res.redirect("/manager");
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
            //console.log(response);
            if (response.status == 200) {
                Token = response.data.token
                console.log("still working here");
                console.log("still working after cookies.set");
                console.log("after loading userinfo");
                console.log("200");
                globalUser = User;
                return res.render('main', { 'user': globalUser });
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
//var Content = {}; //new FormData();
router.post('https://VoiceTestGame-Dijkstra.app.secoder.net/api/manager/add/', function(req, res, next) {
    res.redirect("/manager");
});
router.post('/manager', function(req, res, next) {
    var url = "";
    console.log("success!");
    console.log("success");
    //console.log(req.body);
    //console.log(req.body.option);
    if (req.body.option == "add") {
        console.log("add");
        url = urlAdd;
        var Content = new FormData(req.body);
        //Content.append(");
        //console.log(typeof(req.body.audio_path));
        //console.log(typeof(req.body.video_path));
        //Content.append(");
        //Content.append(");
    } else if (req.body.option == "modify") {
        console.log("modify");
        url = urlEdit;
        Content = {
            "title": req.body.title,
            "content": req.body.content,
            "audio_path": req.body.audio_path,
            "video_path": req.body.video_path
        }
    } else if (req.body.option == "query") {
        console.log("query");
        url = urlSearch;
        Content = { 'keyword': req.body.keyword };
    };
    config = {  
        headers: {
            'Authorization': "JWT " + Token,
            'Content-Type': "application/x-www-form-urlencoded"
        }
    };  
    console.log(url);
    console.log(Content.get("title"));
    console.log(Content.get("content"));
    axios
        .post(url, Content, config)
        .then(function(response) {
            //console.log(response.data.code);
            console.log(response.status);
            console.log("success");
            //console.log(response.data.msg);
            //console.log(response.data.code);
            if (response.status == 201) {
                console.log("200");
                return res.render("main", {
                    "user": globalUser
                });
            } else {
                return res.render("error");
            }
        })
        .catch(function(error) {
            console.log(error);
            //console.log(response);
            console.log("error");
            return res.render("error");
        });
});
router.all('*', function(req, res, next) {
    res.header('Authorization', 'JWT ' + Token);
    req.header('Authorization', 'JWT ' + Token);
    next();
});

module.exports = router;
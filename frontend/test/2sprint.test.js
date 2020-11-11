var request = require('supertest');
var express = require('express');
let should = require('should');
var assert = require('assert');

const user = {
    username: 'name',
    password: 'password'
};
var app = require('../app');
const { isAssertionExpression, isReturnStatement } = require('typescript');
var port = process.env.PORT || 3000;
app.set('port', port);
describe('supertest 第一轮测试', function() {

    beforeEach(function() {
        console.log('before every test in every suit');
    });

    it('get 请求 start', function(done) {
        request(app)
            .get('/')
            .set('Cache-control', 'no-cache')
            .expect(200, done);
    });
    it('get 请求 register', function(done) {
        request(app)
            .get('/register')
            .set('Cache-control', 'no-cache')
            .expect(200, done);
    });
    it('get 请求 login', function(done) {
        request(app)
            .get('/login')
            .set('Cache-control', 'no-cache')
            .expect(200)
            .then(() => done(), done);
    });
    it("Post 请求 register failed", function(done) {
        this.timeout(12000);
        request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send({
                username: "admin",
                password: "123456",
                password2: "123457",
            })
            .expect(200)
            .then(() => done(), done);
    });
    it("Post 请求 login failed", function(done) {
        this.timeout(12000);
        request(app)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({
                username: "admin",
                password: "123457",
            })
            .expect(404)
            .then(() => done(), done);
    });



    it("Post 请求 register", function(done) {
        this.timeout(12000);
        request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send({
                username: "admin",
                password: "123456",
                password2: "123456",
                password3: "12345678"
            })
            .expect(200)
            .then(() => done(), done);
    });
});
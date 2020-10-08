var request = require('supertest');
var express = require('express');
let should = require('should');
var assert = require('assert');

const user = {
    username: 'name',
    password: 'password'
};
var app = require('../app');
const { isAssertionExpression } = require('typescript');
var port = process.env.PORT || 3000;
app.set('port', port);
describe('supertest 第二轮测试', function() {

    beforeEach(function() {
        console.log('before every test in every suit');
    });

    it('get 请求 manager', function(done) {
        request(app)
            .get('/manager')
            .set('Cache-control', 'no-cache')
            .expect(200, done);
    });
    it('post 请求 login', function(done) {
        request(app)
            .post('/login')
            .send({
                "user": "usertest",
                "pwd": "pwdtest"
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
    it('post 请求 register', function(done) {
        request(app)
            .post('/register')
            .send({
                "user": "usertest",
                "pwd": "pwdtest",
                "pwd2": "pwd2test"
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    })
});
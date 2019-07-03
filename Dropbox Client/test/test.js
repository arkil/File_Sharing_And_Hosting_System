var express = require('express');
var request = require('request');
var assert = require('assert');
var http = require('http');
var mocha = require('mocha');

it('Test SignIn with Right Credentials', function(done) {
    request.post(
        'http://localhost:3003/SignIn/',
        { form: { userData: { email: 'Mils@gmail.com' , password: 'M54321' }} },
        function (error, response, body) {
            assert.equal(200, response.statusCode);
            done();
        }
    );
});
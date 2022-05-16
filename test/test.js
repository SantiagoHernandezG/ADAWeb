 // PRUEBAS UNITARIAS SOBRE
    //- Crear un nuevo usuario
    //- Eliminar un usuario
    //- Login correcto
    //- Logout correcto

let passport = require('../config/passport.js')
let auth = require('../routes/auth.js')
let app = require('../app.js');
const { request } = require('express');

describe('User', function () {
    describe('#create()', function () {
        it('Should create a user without error', function (done) {
            request(app)
            .get('/auth/google')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
              });
            //http://localhost:3000/auth/google
            //http://localhost:3000/auth/google/callback?code=4/0AX4XfWg-nd0gLMvvRZg1ZUoCfKdxKC0GU0dFk2tt24Lum7Kb0yE0KqB4FTMZ0hgaF7blJw&scope=profile%20https://www.googleapis.com/auth/userinfo.profile
        });
    });
});

describe('Access', function () {
    describe('#Login()', function () {
        it('Should login without error', function (done) {
            request(app)
            .get('/auth/google/callback')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
              });
        });
    });
    describe('#Logout()', function () {
        it('Should logout without error', function (done) {
            request(app)
            .get('/auth/logout')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
              });
        });
    });
});
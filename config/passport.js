const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


//Middleware para autenticar local
/*
passport.use(new LocalStrategy({
    emailR: 'email',
    passwordField: 'password' 
}, (email, password, done) => {
    //Look for user in DB
    const user = await User.findOne({email})
    //validation
    if(!user){
        return done(null, false, {message: 'User not found'})
    }else {
        //Look for match of user password
        user.
    }
}))*/

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) =>{
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try{
            let user = await User.findOne({ googleId: profile.id})
            
            if(user) {
                done(null, user)
            } else {
                user = await User.create(newUser)
                done(null, user)

            }

        } catch (err) {
            console.error(err)

        }
    }))

    passport.serializeUser((user, cb)  => {
        process.nextTick(() => {
          cb(null, user);
        });
      });
      
      passport.deserializeUser((user, cb) => {
        process.nextTick(() => {
          return cb(null, user);
        });
      });

}
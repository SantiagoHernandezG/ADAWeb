const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) =>{
        console.log("profile",profile)
        console.log("email",profile.emails[0].value);
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
            email: profile.emails[0].value
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

    passport.use(
        new LocalStrategy(async (email, password, done) => {
            try {
                const user = await User.findOne({email: email})
                //encripta password y compara
                const validPassword = bcrypt.compareSync(password, user.password)
                if(validPassword)
                    done(null, user)
                else
                    done('Invalid credentials', null)
            } catch (err){
                console.log(err)
                done(err, null)
            }
        })
    )

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
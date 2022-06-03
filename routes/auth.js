const express = require('express')
const passport = require('passport')
const router = express.Router()
let controllerAuth = require('../controllers/auth')

//Auth con Google
router.get("/google", passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'] }))

//Google auth callback
router.get("/google/callback", passport.authenticate('google', { 
    failureRedirect: '/'
 }), (req, res) => {
	 var login = ('exito');
     res.redirect('/eventos')
 })

 //Logout user
 router.get('/logout', (req, res) => {
     req.logout()
     res.redirect('/home')
 })

router.post("/registrarse",controllerAuth.user_post, passport.authenticate('local', { failWithError: true }), (req, res) => {
    // Handle success
    res.redirect('/eventos')
},
(err, req, res, next) => {
    // Handle error
    res.status(400).send({err})
})

router.post("/login", passport.authenticate('local', { failWithError: true }), (req, res) => {
    // Handle success
    res.redirect('/eventos')
},
(err, req, res, next) => {
    // Handle error
    res.status(400).send({err})
})




module.exports = router
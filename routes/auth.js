const express = require('express')
const passport = require('passport')
const router = express.Router()
const {logIn, logout, signUp} = require('../controllers/users')

//Auth con Google
router.get("/google", passport.authenticate('google', { scope: ['profile'] }))

//Google auth callback
router.get("/google/callback", passport.authenticate('google', { 
    failureRedirect: '/'
 }), (req, res) => {
	 var login = ('exito');
     res.redirect('/eventos')
 })

 router.post('/signup', signUp)
 router.post('/signin', logIn)
 //Logout user
 router.get('/logout', (req, res) => {
     req.logout()
     res.redirect('/')
 })

 



module.exports = router
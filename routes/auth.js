const express = require('express')
const passport = require('passport')
const router = express.Router()

//Auth con Google
router.get("/google", passport.authenticate('google', { scope: ['profile'] }))

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




module.exports = router
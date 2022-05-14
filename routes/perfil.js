const express = require('express')
const router = express.Router()

const authCheck = (req, res, next) => {
	console.log("Cookie sesion", req.user)
    if(!req.user)
        res.redirect('/');
    else
        next();
};


router.get("/", authCheck ,function (req, res) {
	res.render('perfil', { user: req.user })
	
})




module.exports = router
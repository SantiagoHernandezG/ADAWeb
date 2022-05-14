const express = require('express')
const router = express.Router()

router.get("/", function (req, res) {
	res.render('eventos',  { user: req.user })
})
router.get("/evento", function (req, res) {
	res.render('eventoDetail',  { user: req.user })
})


module.exports = router
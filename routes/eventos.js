const express = require('express')
const router = express.Router()

router.get("/", function (req, res) {
	res.render('eventos')
})
router.get("/evento", function (req, res) {
	res.render('eventoDetail')
})


module.exports = router
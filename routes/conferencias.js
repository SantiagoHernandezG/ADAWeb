const express = require('express')
const router = express.Router()

router.get("/", function (req, res) {
	res.render('conferencias')
})
router.get("/conferencia", function (req, res) {
	res.render('conferenciaDetail')
})

module.exports = router;
const express = require('express')
const router = express.Router()

router.get("/", function (req, res) {
	res.render('conferencias')
})
router.get("/conferencia", function (req, res) {
	res.render('conferenciaDetail')
})
// Data Picker Initialization
$('.datepicker').datepicker({
	inline: true
  });

module.exports = router;
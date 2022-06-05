const express = require('express')
const router = express.Router()
let controllerBecarixs = require('../controllers/becarixs')

router.get("/", controllerBecarixs.becarixs_get)

module.exports = router

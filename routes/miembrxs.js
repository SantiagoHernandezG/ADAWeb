const express = require('express')
const router = express.Router()
let controllerMiembrxs = require('../controllers/miembrxs')

router.get("/", controllerMiembrxs.miembrxs_get)

module.exports = router
const express = require('express')
const router = express.Router()
let controllerNosotrxs = require('../controllers/nosotrxs')

router.get("/", controllerNosotrxs.nosotrxs_get)

module.exports = router
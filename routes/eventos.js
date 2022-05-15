const express = require('express')
const router = express.Router()
let controllerEventos = require('../controllers/eventos')
let bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false})


router.get("/", controllerEventos.eventos_get)

router.get("/evento", controllerEventos.evento_get)
router.post("/evento", urlencodedParser, controllerEventos.evento_post)

module.exports = router
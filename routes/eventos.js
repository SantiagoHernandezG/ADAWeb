const express = require('express')
const router = express.Router()
let controllerEventos = require('../controllers/eventos')

router.get("/", controllerEventos.eventos_get)

router.get("/evento", controllerEventos.evento_get)


module.exports = router
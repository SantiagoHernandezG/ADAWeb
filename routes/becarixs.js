const express = require('express')
const router = express.Router()

router.get("/", controllerEventos.eventos_get)

module.exports = router

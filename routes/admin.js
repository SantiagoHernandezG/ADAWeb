const express = require('express')
const router = express.Router()
let controllerMenuAdminEventos = require('../controllers/menuAdmin/eventos')


router.get("/eventos", controllerMenuAdminEventos.eventos_get)


module.exports = router
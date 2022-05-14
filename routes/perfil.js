const express = require('express')
const router = express.Router()
let perfilController = require('../controllers/usuario/perfil')

router.get("/", perfilController.auth_check, perfilController.perfil_get)


module.exports = router
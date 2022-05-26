const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'public/eventos/img' })
let controllerEventos = require('../controllers/eventos')
let bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false})


router.get("/", controllerEventos.eventos_get)

// router.get("/evento", controllerEventos.evento_get)
router.get('/:eventName', controllerEventos.evento_get)
router.post("/evento", upload.single('imageEvent'), controllerEventos.evento_post)
router.post("/delete", controllerEventos.evento_delete_post)
router.post("/registrar", controllerEventos.evento_registrar_post)

module.exports = router
let express = require('express')
let router = express.Router()
let eventoController = require('../../controllers/api/eventos')


router.get("/", eventoController.eventos_list)
router.post("/eventos/create", eventoController.eventos_create)
router.post("/eventos/delete", eventoController.eventos_delete)

module.exports = router

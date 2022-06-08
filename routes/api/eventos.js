let express = require('express')
let router = express.Router()
let eventoController = require('../../controllers/api/eventos')


router.get("/", eventoController.eventos_list)
router.post("/eventos/create", eventoController.evento_create)
router.post("/eventos/delete", eventoController.evento_delete)
router.post("/eventos/update", eventoController.evento_update)

module.exports = router

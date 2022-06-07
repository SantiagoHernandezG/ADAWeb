const express = require('express')
const router = express.Router()
let controllerBecarixs = require('../controllers/becarixs')


router.get("/", controllerBecarixs.becarixs_get)
router.post("/deleteBecarix", controllerBecarixs.becarix_delete_post)
router.post("/correos", controllerBecarixs.becarixs_correos_post)
router.post("/registrar",controllerBecarixs.becarix_post)

module.exports = router

const express = require('express')
const router = express.Router()
let controllerNosotrxs = require('../controllers/nosotrxs')
let bodyParser = require('body-parser')

router.get("/", controllerNosotrxs.nosotrxs_get)
router.post("/wordcloud", controllerNosotrxs.Wordcloud_post)
module.exports = router
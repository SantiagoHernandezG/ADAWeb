const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
    res.render('index', { login: 'falso' })
  });

  router.get("/index", function (req, res) {
    res.render('index')
  })
  

  module.exports = router
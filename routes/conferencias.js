const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'public/conferencias/img' })
let controllerConferencias = require('../controllers/conferencias')
let bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false})

const authCheck = (req, res, next) => {
	console.log("Cookie sesion", req.user)
    if(!req.user)
        res.redirect('/');
    else
        next();
};

router.get("/", controllerConferencias.conferencias_get)
router.get('/:nombre' ,  controllerConferencias.conferencia_get)
router.post("/conferencia", upload.single('imageEvent'), controllerConferencias.conferencia_post)


module.exports = router
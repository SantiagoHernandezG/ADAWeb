const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
var path = require('path');
const app = express();
const bodyParser = require("body-parser");

const authCheck = (req, res, next) => {
	console.log("Cookie sesion", req.user)
    if(!req.user)
        res.redirect('/');
    else
        next();
};

app.use(bodyParser.urlencoded({ extender: true }));
app.use(express.static(path.join(__dirname, 'public')));

router.get("/", function (req, res) {
	res.render('conferencias', { alta: '' , user: req.user })
})

router.get("/conferencia", function (req, res) {
	res.render('conferenciaDetail',  { user: req.user })
})
/* Data Picker Initialization
$('.datepicker').datepicker({
	inline: true
  });*/

//Schema para trabajador
const ConferenciaSchema = {
	nombre: String,
	nombrePresentador: String,
	fecha: Date,
	contacto: String,
	fotoEvento: String,
	descripcion: String,
}
const conferencia = mongoose.model('conferencias', ConferenciaSchema);
//Altas evento
app.post("/altaConferencia", function (req, res) {
	console.log("LLefgue aqui");
	/*var cipher = crypto.createCipher(algorithm, key); 
	var codigo = req.body.codigo;
	console.log(codigo);*/

	let newConferencia = new conferencia({
		nombre: req.body.nombre,
		nombrePresentador: req.body.nombrePresentador,
		fecha: req.body.trip-start,
		contacto: req.body.email,
		promocional: req.body.promocional,
		descripcion: req.body.descripcion		
	});

	try{
	res.render('conferencias', { alta: 'true' })
	newConferencia.save();
	console.log("Alta de conferencia exitosa");
	}
	catch (error) {
		res.render('conferencias', { alta: 'false' })
		console.error(error);
		console.log("Alta no exitosa");
	}
})


module.exports = router;
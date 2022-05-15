const Conferencia = require('../models/conferencias/conferencias')

exports.conferencias_get = function (req, res) {
    Conferencia.find({}, function (err, conferencias) {
        if (err) console.log(err)
        console.log(conferencias.length)
        res.render('./conferencias/conferencias',  { user: req.user, conferencias: conferencias})
    })
}

exports.conferencia_get = function (req, res) {
	const { nombre } = req.params;
	console.log(nombre);
	Conferencia.findOne({ nombre: nombre }, function (err, conferencias) {
		if (err){
			console.log(err)
		}
		else {
		console.log("Conferencia encontrada: " + conferencias); // Success
		res.render('./conferencias/conferenciaDetail',  { user: req.user, conferencias: conferencias})
		}
	})
}


//Altas Conferencia
exports.conferencia_post =  function (req, res) {
	Conferencia.find({}, function (err, conferencias) {

	const newConferencia = {
		nombre: req.body.nombre,
		nombrePresentador: req.body.nombrePresentador,
		fecha: req.body.fecha,
		contacto: req.body.email,
		imageConferencia: req.file.filename,
		descripcion: req.body.descripcion		
	}
	console.log(newConferencia)
    try{
        let conferencia = Conferencia.create(newConferencia)
        done(null, conferencia)
    } catch (err){
        console.log(err)
    }
	res.render('./conferencias/conferencias',  { user: req.user, conferencias: conferencias})
})
}

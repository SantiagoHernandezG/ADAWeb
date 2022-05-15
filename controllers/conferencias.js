const Conferencia = require('../models/conferencias/conferencias')

exports.conferencias_get = function (req, res) {
    Conferencia.find({}, function (err, Conferencias) {
        if (err) console.log(err)
        console.log(Conferencias.length)
        res.render('./conferencias/conferencias',  { user: req.user})
    })
}
/* conferencias: conferencias para el get d elas demas */
exports.conferencia_get = function (req, res) {
	res.render('./conferencias/conferenciaDetail',  { user: req.user })
}


//Altas Conferencia
exports.conferencia_post =  function (req, res) {

	let newConferencia = {
		nombre: req.body.nombre,
		nombrePresentador: req.body.nombrePresentador,
		fecha: req.body.trip-start,
		contacto: req.body.email,
		promocional: req.body.promocional,
		imageEvent: req.file.filename,
		descripcion: req.body.descripcion		
	}
	console.log(newConferencia)
    try{
        let conferencia = Conferencia.create(newConferencia)
        done(null, conferencia)
    } catch (err){
        console.log(err)
    }
	res.render('./conferencias/conferenciaDetail',  { user: req.user })
}

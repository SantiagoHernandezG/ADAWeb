const Conferencia = require('../models/conferencias/conferencias')

exports.conferencias_get = function (req, res) {
    Conferencia.find({}, function (err, conferencias) {
        if (err) console.log(err)
        console.log(conferencias.length)
        res.render('./conferencias/conferencias',  { user: req.user})
    })
}
/* ,conferencias: conferencias, ver si es para el redner de abajo o arriba  */
exports.conferencia_get = function (req, res) {
	res.render('./conferencias/conferenciaDetail',  { user: req.user })
}


//Altas Conferencia
exports.conferencia_post =  function (req, res) {

	const newConferencia = {
		nombre: req.body.nombre,
		nombrePresentador: req.body.nombrePresentador,
		fecha: req.body.trip-start,
		contacto: req.body.email,
		promocional: req.body.promocional,
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
	res.render('./conferencias/conferenciaDetail',  { user: req.user })
}

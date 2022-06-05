const Conferencia = require('../models/conferencias/conferencias')

exports.conferencias_get = function (req, res) {
    Conferencia.find({}, function (err, conferencias) {
        if (err) console.log(err)
        console.log(conferencias.length)
        res.render('./conferencias/conferencias',  { user: req.user, conferencias: conferencias})
    })
}

exports.conferencia_get = function (req, res) {
	const { id } = req.params;
	console.log(id);
	Conferencia.findOne({ id: id }, function (err, conferencias) {
		if (err){
			console.log(err)
		}
		else {
		console.log("Conferencia encontrada: " + conferencias); // Success
		res.render('./conferencias/conferenciaDetail',  { user: req.user, conferencias: conferencias})
		}
	})
}


//Altas Conferencia admin
exports.conferencia_post =  function (req, res) {
	Conferencia.find({}, function (err, conferencias) {

	const newConferencia = {
		nombre: req.body.nombre,
		nombrePresentador: req.body.nombrePresentador,
		fecha: req.body.fecha,
		contacto: req.body.email,
		imageConferencia: req.file.filename,
		descripcion: req.body.descripcion,
		comentarios: [],		
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
/*
app.post('/comentar/:nombre/', upload.any(), async function(req, res, next) {
	const { nombre } = req.params;
	console.log('Nombre de la conferencia a editar: ' + nombre);
	 await Conferencia.findByIdAndUpdate(nombre, { 
		$set: {
		comentarios: req.body.comentario }},
		  function (err, docs) {
			if (err) {
				console.log(err)
			}
			else {
				console.log("Conferencia editada : ", docs);
				// newTrabajador.save();
			}
		})
		res.render('./conferencias/conferencias',  { user: req.user, conferencias: conferencias})
})
*/
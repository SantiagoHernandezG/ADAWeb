
const Conferencia = require('../models/conferencias/conferencias')

exports.conferencias_get = function (req, res) {
	Conferencia.find({}, function (err, conferencias) {
		if (err) console.log(err)
		console.log(conferencias.length)
		res.render('./conferencias/conferencias', { user: req.user, conferencias: conferencias })
	})
}

exports.conferencia_get = function (req, res) {
	const { id } = req.params;
	//console.log('Id por params: ' + req.params);
	//console.log('Id de la conferencia por to string: ' + req.params.toString());
	Conferencia.findById(id, function (err, conferencias) {
		if (err) {
			console.log(err)
		}
		else {
			console.log("Conferencia encontrada: " + conferencias); // Success
			console.log("Id conferencia: ", id);
			res.render('./conferencias/conferenciaDetail', { user: req.user, conferencias: conferencias })
		}
	})
}


//Altas Conferencia admin
exports.conferencia_post = async (req, res) =>{
	const newConferencia = {
		nombre: req.body.nombre,
		nombrePresentador: req.body.nombrePresentador,
		fecha: req.body.fecha,
		contacto: req.body.email,
		imageConferencia: req.file.filename,
		descripcion: req.body.descripcion,
		link: req.body.link,
		comentarios: [],
	}
	console.log(newConferencia)
	try {
		let conferencia = await Conferencia.create(newConferencia)
		Conferencia.find({}, function (err, conferencias) {
			res.render('./conferencias/conferencias', { user: req.user, conferencias: conferencias })
		})
	} catch (err) {
		console.log(err)
	}
}
//Adjuntar comentarios a las conferencias
exports.conferencia_comentario_post = async function (req, res) {
	const { id } = req.params;
	const filter = {_id: id};
	const update = {comentarios: req.body.comentario};
	console.log('Id de la conferencia a editar: ' + id);
    let newConferencia = await Conferencia.updateOne(
		{_id: id},
		{$push: {comentarios: req.user.displayName.substring(0, req.user.displayName.indexOf(' ')) + ' | ' + req.body.comentario }},
	);
	try {	
	newConferencia = await Character.findOne(filter);
	} catch (err) {
		console.log(err)
	}
	Conferencia.findById(id, function (err, conferencias) {
		if (err) {
			console.log(err)
		}
		else {
			//Success
			res.render('./conferencias/conferenciaDetail', { user: req.user, conferencias: conferencias })
		}
	})
}

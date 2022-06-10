const mongoose = require('mongoose')


//Schema para Conferencias
const ConferenciaSchema = new mongoose.Schema({
	nombre: String,
	nombrePresentador: String,
	fecha: Date,
	contacto: String,
	imageConferencia: {
		type: String,
	},
	descripcion: String,
	link: String,
	comentarios: [String],
})
module.exports = mongoose.model('Conferencia', ConferenciaSchema);




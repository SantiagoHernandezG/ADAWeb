const mongoose = require('mongoose')


//Schema para Conferencias
const ConferenciaSchema = {
	nombre: String,
	nombrePresentador: String,
	fecha: Date,
	contacto: String,
	imageConferencia: {
		type: String,
	},
	descripcion: String,
}
module.exports = mongoose.model('Conferencia', ConferenciaSchema);




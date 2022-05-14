const mongoose = require('mongoose')

//Schema para eventos
const EventoSchema = new mongoose.Schema (
	{
	nombre: {
		type: String,
		required: true
	},
	nombrePresentador: {
		type:String,
		required: false
	},
	fecha: {
		type: Date,
		required: true,
	},
	contacto: {

	},
	
	fotoEvento: String,
	descripcion: String,
}
) 


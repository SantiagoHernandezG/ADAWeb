const mongoose = require('mongoose')


//Schema para registro de usuarios
const RegistroUsuarioSchema = new mongoose.Schema ({
	idEvent: {
		type: String,
		required: true
	},
	name: {
		type:String,
		required: true
	},
	email: {
		type:String,
		required: true
	},
	registrationAt: {
        type: Date,
        default: Date.now
    }
	
}) 

module.exports = mongoose.model('registro-evento-user', RegistroUsuarioSchema)

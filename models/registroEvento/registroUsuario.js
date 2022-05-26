const mongoose = require('mongoose')


//Schema para registro de usuarios
const RegistroUsuarioSchema = new mongoose.Schema ({
	idEvent: {
		type: String,
		required: true
	},
	nameUser: {
		type:String,
		required: true
	},
	emailUser: {
		type:String,
		required: true
	},
	registrationAt: {
        type: Date,
        default: Date.now
    }
	
}) 

module.exports = mongoose.model('RegistoEvento', RegistroUsuarioSchema)

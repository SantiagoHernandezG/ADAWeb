const mongoose = require('mongoose')

//Schema para registro de miembro
const RegistroMiembroSchema = new mongoose.Schema ({
	idEvent: {
		type: String,
		required: true
	},
	nameMember: {
		type:String,
		required: true
	},
	idMember: {
		type:String,
		required: true
	},
	registrationAt: {
        type: Date,
        default: Date.now
    }	
}) 

module.exports = mongoose.model('registro-evento-member', RegistroMiembroSchema)
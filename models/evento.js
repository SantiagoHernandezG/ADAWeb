const mongoose = require('mongoose')


//Schema para eventos
const EventoSchema = new mongoose.Schema ({
	nameEvent: {
		type: String,
		required: true
	},
	nameSpeaker: {
		type:String,
		required: false
	},
	dateEvent: {
		type: Date,
		required: true,
	},
	contactEvent: {
		type:String,
		required: true,
	},
	descriptionEvent: {
		type: String,
		required: true,
	},
	timeEvent: {
		type:String
	},
	imageEvent: {
		type: String,
	},
	placeEvent:{
		type: String,
		required: true,
	},
	createdAt: {
        type: Date,
        default: Date.now
    },
	creatorName: {
		type: String,
		required: true
	},
	creatorId: {
		type: String,
		required: true
	}
	
}) 

module.exports = mongoose.model('Evento', EventoSchema)


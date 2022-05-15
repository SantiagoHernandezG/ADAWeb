
const multer = require('multer')

const eventoModel = require('../models/eventos/evento')


exports.eventos_get = function (req, res) {
	res.render('./eventos/eventos',  { user: req.user })
}

exports.evento_get = function (req, res) {
	res.render('./eventos/eventoDetail',  { user: req.user })
}

exports.evento_post =  function (req, res) {
    // console.log(req.body)
    const newEvent = {
        nameEvent: req.body.nameEvent,
        nameSpeaker: req.body.nameSpeaker,
        dateEvent: req.body.dateEvent,
        contactEvent: req.body.contactEvent,
        descriptionEvent: req.body.descriptionEvent,
        timeEvent: req.body.timeEvent,
        // imageEvent:
 
    }
    console.log(newEvent)
    try{
        let event = eventoModel.create(newEvent)
        done(null, event)

    } catch (err){
        console.log(err)

    }

	res.render('./eventos/eventoDetail',  { user: req.user })
}
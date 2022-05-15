const Evento = require('../models/eventos/evento')

exports.eventos_get = function (req, res) {
    Evento.find({}, function (err, eventos) {
        if (err) console.log(err)
        console.log(eventos.length)
        res.render('./eventos/eventos',  { user: req.user, eventos: eventos })
    })
}

exports.evento_get = function (req, res) {
	res.render('./eventos/eventoDetail',  { user: req.user })
}

exports.evento_post =  function (req, res) {
    const newEvent = {
        nameEvent: req.body.nameEvent,
        nameSpeaker: req.body.nameSpeaker,
        dateEvent: req.body.dateEvent,
        contactEvent: req.body.contactEvent,
        descriptionEvent: req.body.descriptionEvent,
        timeEvent: req.body.timeEvent,
        imageEvent: req.file.filename
 
    }
    console.log(newEvent)
    try{
        let event = Evento.create(newEvent)
        done(null, event)
    } catch (err){
        console.log(err)
    }
	res.render('./eventos/eventoDetail',  { user: req.user })
}
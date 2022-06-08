let Evento = require('../../models/evento')

exports.eventos_list = async function(req, res){
    try{
        let eventos = await Evento.find({})
        res.status(200).json({
            eventos: eventos
        })
    } catch(err) {
        console.log(err)
        //500 internal server error
        res.status(500).send('Error fetching events')
    }  
}

exports.evento_create = async function(req, res){
   const newEvent = {
        nameEvent: req.body.nameEvent,
        nameSpeaker: req.body.nameSpeaker,
        dateEvent: req.body.dateEvent,
        contactEvent: req.body.contactEvent,
        descriptionEvent: req.body.descriptionEvent,
        timeEvent: req.body.timeEvent,
        placeEvent: req.body.placeEvent,
        //le estoy mandando lo de creator pero...
        creatorName: req.body.creatorName,
        creatorId: req.body.creatorId
    }
    try {
        let event = await Evento.create(newEvent)
        //201 crear algo en la base de datos
        res.status(201).end()
    } catch(err) {
        console.log(err)
        //400 Bad request
        res.status(400).send('The event data is not valid')
    }
}

exports.evento_delete = async function(req, res){
    try{
        await Evento.findByIdAndDelete(req.body.idEvent)
        res.send("The event has been deleted")
    } catch(err) {
        console.log(err)
        //400 Bad request
        res.status(400).send('The event was not deleted')

    }
}

exports.evento_update = async function(req, res){
    const updateEvent = {
        nameEvent: req.body.nameEvent,
        nameSpeaker: req.body.nameSpeaker,
        dateEvent: req.body.dateEvent,
        contactEvent: req.body.contactEvent,
        descriptionEvent: req.body.descriptionEvent,
        timeEvent: req.body.timeEvent,
        placeEvent: req.body.placeEvent,
        updatedByName: req.body.updatedByName,
        updatedById: req.body.updatedById,  
    }
    try{
        await Evento.findByIdAndUpdate(req.body.idEvent, updateEvent)
        res.send("The event has been updated")
    } catch(err) {
        console.log(err)
        res.status(400).send('The event was not updated')

    }


}
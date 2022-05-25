const Evento = require('../models/evento')

exports.eventos_get = function  (req, res) {
    Evento.find({}, function (err, eventos) {
        if (err) console.log(err)
        res.render('./eventos/eventos',  { user: req.user, eventos: eventos })
    })
}

exports.evento_get = async (req, res)  => {
   const  {eventName } = req.params;
   try{
      let evento = await Evento.findById(eventName)
    //   console.log("Evento encontrado",evento)
      res.render('./eventos/eventoDetail',  { user: req.user, evento: evento})

   } catch (err){
    console.log(err)
   }
}

exports.evento_post =  async (req, res) => {
    const newEvent = {
        nameEvent: req.body.nameEvent,
        nameSpeaker: req.body.nameSpeaker,
        dateEvent: req.body.dateEvent,
        contactEvent: req.body.contactEvent,
        descriptionEvent: req.body.descriptionEvent,
        timeEvent: req.body.timeEvent,
        imageEvent: req.file.filename,
        placeEvent: req.body.placeEvent,
        creatorName: req.user.displayName,
        creatorId: req.user._id
 
    }
    try{
        let event = await Evento.create(newEvent)
        res.render('./eventos/eventoDetail',  { user: req.user, evento: event })
    } catch (err){
        console.log(err)
    }
	
}

exports.evento_delete_post = async (req, res) => {
    const eventId = req.body.buttonDelete
    try{
        await Evento.findByIdAndRemove(eventId)
        res.redirect("/eventos")

    }catch (err){
        console.log(err)
    }

}

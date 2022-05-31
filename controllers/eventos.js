const Evento = require('../models/evento')
const RegistroEventoMember = require('../models/registroEvento/registroMember')
const RegistroEventoUser = require('../models/registroEvento/registroUsuario')
const mailer = require('./apis/mailer')

exports.eventos_get = function  (req, res) {
    Evento.find({}, function (err, eventos) {
        if (err) console.log(err)
        res.render('./eventos/eventos',  { user: req.user, eventos: eventos, registro: false })
    })
}

exports.evento_get = async (req, res)  => {
   const  {eventName } = req.params;
   let participantes = false;
   try{
      let evento = await Evento.findById(eventName)
      if(req.user){
          if(req.user.position == "admin"){
              console.log("admin")
          }
      }
    //   console.log("Evento encontrado",evento)
      res.render('./eventos/eventoDetail',  { user: req.user, evento: evento, registro: false, participantes: participantes})

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
        res.render('./eventos/eventoDetail',  { user: req.user, evento: event, registro: false })
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

exports.evento_registrar_post = async(req, res) => {
    let evento;
    let subject;
    let text;
    let to;
    let registrado;
    let newRegistro;
    try{
        evento = await Evento.findById(req.body.idEvent)
        if(req.user){
            registrado = await RegistroEventoMember.findOne({idMember: req.user._id, idEvent: req.body.idEvent})
            newRegistro = {
                idEvent: req.body.idEvent,
                name: req.body.nameMember,
                idMember: req.body.idMember,
                email : req.body.emailMember,

            }
            text = `Gracias ${req.user.displayName} por registrarte en el evento ${evento.nameEvent}. Estamos muy emocionados de recibirte.`
            to = req.user.email

        }else{
            registrado = await RegistroEventoUser.findOne({idEvent: req.body.idEvent, nameUser: req.body.nameUser, emailUser: req.body.emailUser})
            newRegistro = {
                idEvent: req.body.idEvent,
                name: req.body.nameUser,
                email: req.body.emailUser,
            }
            text = `¡Gracias ${req.body.nameUser} por registrarte en el evento ${evento.nameEvent}! Estamos muy emocionados por recibirte.`
            to = req.body.emailUser
            
        }
        subject = `Confirmación de registro al evento ${evento.nameEvent}`
        text +=  ` El evento se llevará a cabo el día ${evento.dateEvent.toLocaleDateString(undefined, {timeZone: 'UTC', dateStyle: 'long'})} a las 
        ${evento.timeEvent} hrs en ${evento.placeEvent}. La descripción del evento es la siguiente: ${evento.descriptionEvent}. Cualquier duda o aclaración
        no dudes en contactarte con ${evento.contactEvent}. ¡Saludos!
        `
        if(!(registrado == null)){
            res.render('./eventos/eventoDetail',  { user: req.user, evento: evento, registro: 'registrado'})
        }else{
            req.user ? await RegistroEventoMember.create(newRegistro) : await RegistroEventoUser.create(newRegistro)
            mailer.sendMail(to, subject, text).then(result => console.log("email sent...", result))
            .catch(error => console.log(error.message))
            res.render('./eventos/eventoDetail',  { user: req.user, evento: evento, registro: 'exitoso'})
        }
        
    } catch (err){
       res.render('./eventos/eventoDetail',  { user: req.user, evento: evento, registro: 'error'})
    }
}

exports.evento_update_post = async (req, res) => {
    const updateEvent = {
        nameEvent: req.body.nameEvent,
        nameSpeaker: req.body.nameSpeaker,
        dateEvent: req.body.dateEvent,
        contactEvent: req.body.contactEvent,
        descriptionEvent: req.body.descriptionEvent,
        timeEvent: req.body.timeEvent,
        placeEvent: req.body.placeEvent,
        updatedByName: req.user.displayName,
        updatedById: req.user._id,
        
    }
    let idEvent = req.body.idEvent
    console.log(idEvent)
    try {
        await Evento.findByIdAndUpdate(req.body.idEvent, updateEvent)
        let evento = await Evento.findById(req.body.idEvent)

        console.log("evento encontrado", evento)
        res.render('./eventos/eventoDetail',  { user: req.user, evento: evento, registro: false})
    } catch (err) {
        console.log(err)

    }

}

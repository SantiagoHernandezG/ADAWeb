const Evento = require('../models/evento')
const RegistroEventoMember = require('../models/registroEvento/registroMember')
const RegistroEventoUser = require('../models/registroEvento/registroUsuario')

exports.eventos_get = function  (req, res) {
    Evento.find({}, function (err, eventos) {
        if (err) console.log(err)
        res.render('./eventos/eventos',  { user: req.user, eventos: eventos, registro: false })
    })
}

exports.evento_get = async (req, res)  => {
   const  {eventName } = req.params;
   try{
      let evento = await Evento.findById(eventName)
    //   console.log("Evento encontrado",evento)
      res.render('./eventos/eventoDetail',  { user: req.user, evento: evento, registro: false})

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

exports.evento_registrar_post = async(req, res) => {
    
    let evento;
    try{
        let registrado;
        let newRegistro;
        if(req.user){
            registrado = await RegistroEventoMember.findOne({idMember: req.user._id, idEvent: req.body.idEvent})
            newRegistro = {
                idEvent: req.body.idEvent,
                nameMember: req.body.nameMember,
                idMember: req.body.idMember,
            }

        }else{
            registrado = await RegistroEventoUser.findOne({idEvent: req.body.idEvent, nameUser: req.body.nameUser, emailUser: req.body.emailUser})
            newRegistro = {
                idEvent: req.body.idEvent,
                nameUser: req.body.nameUser,
                emailUser: req.body.emailUser,
            }
            console.log("id",req.body.idEvent)
        }
        evento = await Evento.findById(req.body.idEvent)
        console.log("evento", evento)
        
        if(registrado){
            res.render('./eventos/eventoDetail',  { user: req.user, evento: evento, registro: 'registrado'})
        }else{
            req.user ? await RegistroEventoMember.create(newRegistro) : await RegistroEventoUser.create(newRegistro)
            res.render('./eventos/eventoDetail',  { user: req.user, evento: evento, registro: 'exitoso'})
        }
        
    } catch (err){
       res.render('./eventos/eventoDetail',  { user: req.user, evento: evento, registro: 'error'})
    }

 



}

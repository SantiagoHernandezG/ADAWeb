const Evento = require('../models/evento')
const RegistroEventoMember = require('../models/registroEvento/registroMember')
const RegistroEventoUser = require('../models/registroEvento/registroUsuario')
const mailer = require('./apis/mailer')
const User = require('../models/User')

exports.eventos_get = function  (req, res) {
    Evento.find({}, function (err, eventos) {
        if (err) console.log(err)
        res.render('./eventos/eventos',  { user: req.user, eventos: eventos, registro: false })
    })
}

const getMembersAndUsers = async function ( result, idEvent, user){
    try{
        result.evento = await Evento.findById(idEvent)
        if(user){
            if(user.position == "admin"){
                result.members = []
                 
                const membersEvent = await RegistroEventoMember.find({idEvent: idEvent})
                for(let i = 0 ; i < membersEvent.length; i++){
                    const member = await User.findById(membersEvent[i].idMember)
                     result.members.push(member) 
                }
                result.users = await RegistroEventoUser.find({idEvent:idEvent }) 
            }
        }else{
            result.members = false;
            result.users = false;
        }
    }catch (err){
        console.log(err)
    }  
}

exports.evento_get = async (req, res)  => {
   const  {eventName } = req.params;
   
   try{
       let result = {members: undefined, users: undefined, evento: undefined}
        await getMembersAndUsers(result, eventName, req.user)
        res.render('./eventos/eventoDetail',  { user: req.user, evento: result.evento, registro: false, members: result.members, users: result.users })
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

        res.render('./eventos/eventoDetail',  { user: req.user, evento: event, registro: false , members: false, users: false})
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
        let result = {members: undefined, users: undefined, evento: undefined}
        await getMembersAndUsers(result, req.body.idEvent, req.user)
        // evento = await Evento.findById(req.body.idEvent)
        evento = result.evento
        if(req.user){
            registrado = await RegistroEventoMember.findOne({idMember: req.user._id, idEvent: req.body.idEvent})
            newRegistro = {
                idEvent: req.body.idEvent,
                idMember: req.body.idMember,
                email: req.body.email
            }
            text = `Gracias ${req.user.displayName} por registrarte en el evento ${evento.nameEvent}. Estamos muy emocionados de recibirte.`
            to = req.user.email

        }else{
            registrado = await RegistroEventoUser.findOne({idEvent: req.body.idEvent, nameUser: req.body.nameUser, emailUser: req.body.emailUser})
            newRegistro = {
                idEvent: req.body.idEvent,
                nameUser: req.body.nameUser,
                emailUser: req.body.emailUser,
            }
            text = `¡Gracias ${req.body.nameUser} por registrarte en el evento ${evento.nameEvent}! Estamos muy emocionados por recibirte.`
            to = req.body.emailUser
            
        }
        subject = `Confirmación de registro al evento ${evento.nameEvent}`
        text +=  ` El evento se llevará a cabo el día ${evento.dateEvent.toLocaleDateString(undefined, {timeZone: 'UTC', dateStyle: 'long'})} a las 
        ${evento.timeEvent} hrs en ${evento.placeEvent}. La descripción del evento es la siguiente: ${evento.descriptionEvent}. Cualquier duda o aclaración
        no dudes en contactarte con ${evento.contactEvent}. ¡Saludos!
        `
        
        if(registrado){
            res.render('./eventos/eventoDetail',  { user: req.user, evento: evento, registro: 'registrado', members: result.members, users: result.users})
        }else{
            req.user ? await RegistroEventoMember.create(newRegistro) : await RegistroEventoUser.create(newRegistro)
            mailer.sendMail(to, subject, text).then(result => console.log("email sent...", result))
            .catch(error => console.log(error.message))
            res.render('./eventos/eventoDetail',  { user: req.user, evento: evento, registro: 'exitoso', members: result.members, users: result.users})
        }
        
    } catch (err){
       res.render('./eventos/eventoDetail',  { user: req.user, evento: evento, registro: 'error', members: result.members, users: result.users})
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
    try {
        await Evento.findByIdAndUpdate(req.body.idEvent, updateEvent)
        let result = {members: undefined, users: undefined, evento: undefined}
        await getMembersAndUsers(result, req.body.idEvent, req.user)
        res.render('./eventos/eventoDetail',  { user: req.user, evento: result.evento, registro: false, members: result.members, users: result.users})
    } catch (err) {
        console.log(err)

    }
}

exports.evento_correo_participantes_post = (req, res) => {

    console.log(req.body)
    const mails = req.body.emailUser.split(',')
    console.log(mails)
    mailer.sendMail(req.body.emailUser, req.body.asunto, req.body.messageText).then(result => console.log("email sent...", result))
    res.end()
}


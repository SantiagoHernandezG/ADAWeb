const Evento = require('../../models/evento')

exports.eventos_get = function  (req, res) {
    Evento.find({}, function (err, eventos) {
        if (err) console.log(err)
        res.render('./menuAdmin/eventos',  { user: req.user, eventos: eventos })
    })
}
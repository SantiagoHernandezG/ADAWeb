exports.eventos_get = function (req, res) {
	res.render('./eventos/eventos',  { user: req.user })
}

exports.evento_get = function (req, res) {
	res.render('./eventos/eventoDetail',  { user: req.user })
}
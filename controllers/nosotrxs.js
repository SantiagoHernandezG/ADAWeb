exports.nosotrxs_get = function (req, res) {
	res.render('nosotrxs', { user: req.user })
}

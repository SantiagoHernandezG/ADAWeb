
exports.auth_check = (req, res, next) => {
	console.log("Cookie sesion", req.user)
    if(!req.user)
        res.redirect('/');
    else
        next();
};

exports.perfil_get =  function(req, res) {
    res.render('perfil', { user: req.user })

}


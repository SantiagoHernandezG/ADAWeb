//Schema para trabajador
const EventoSchema = {
	nombre: String,
	nombrePresentador: String,
	fecha: date,
	contacto: String,
	fotoEvento: String,
	descripcion: String,
}
//Altas evento
app.post("/evento", function (req, res) {
	
	var cipher = crypto.createCipher(algorithm, key); 
	var codigo = req.body.codigo;
	console.log(codigo);

	let newTrabajador = new trabajador({
		nombre: req.body.Nombre,
		apellido: req.body.Apellido,
		correo: req.body.Email,
		contrasena: cipher.update(req.body.contrasenia, 'utf8', 'hex') + cipher.final('hex'),
		tipo: req.body.Profesion
	});
	res.render('Eventos', { alta: 'true' })
	newTrabajador.save();
	console.log("Alta de evento exitosa");
}
	
	else{
		res.render('Registro', { alta: 'false' })
	}
})
//Uso de librerias para ejecutar express js y poder leer req.body de los inputs
const express = require("express");
const dotenv = require("dotenv");
var path = require('path');
var cookieParser = require('cookie-parser')

var indexRouter = require('./routes/index')
var eventosRouter = require('./routes/eventos')
var conferenciasRouter = require('./routes/conferencias')
var nosotrxsRouter = require('./routes/nosotrxs')
var perfilRouter = require('./routes/perfil')

const app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));

const ejs = require('ejs');
app.set('view engine', 'ejs');

// var bodyParser = require("body-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var assert = require('assert');
var fs = require('fs');
require('dotenv/config');
dotenv.config({path: './config/config.env'})
//app.use(bodyParser.urlencoded({ extender: true }));

//Monogoose para usar base de datos
const mongoose = require("mongoose");
//Conexion a base de datos en MongoDB a traves de URL del cluster
mongoose.connect("mongodb+srv://Demian:57008345@cluster0.twupy.mongodb.net/ADA?retryWrites=true&w=majority", { useNewUrlParser: true })


//app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));


const PORT = process.env.PORT || 5000



// const UsuarioSchema = {
// 	nombre: String,
// 	correo: String,
// 	contrasena: String
// }

//Define las configuraciones de rutas que se van a usar para cada ruta
app.use('/', indexRouter)
app.use('/conferencias', conferenciasRouter)
app.use('/eventos', eventosRouter)
app.use('/nosotrxs', nosotrxsRouter)
app.use('/perfil', perfilRouter)

/* Redireccionamiento de las demas vistas (Modulos del sistema)*/





//Inicio de servidor en puerto default
app.listen(
	PORT,
	console.log(`Servidor corriendo en el modo de: ${process.env.NODE_ENV} en el puerto ${PORT}`)
)
//Schema para los usuarios

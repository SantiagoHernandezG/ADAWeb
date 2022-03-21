//Uso de librerias para ejecutar express js y poder leer req.body de los inputs
const express = require("express");
const dotenv = require("dotenv");
var path = require('path');
const app = express();
var bodyParser = require("body-parser");
const ejs = require('ejs');
app.set('view engine', 'ejs');
var assert = require('assert');
var fs = require('fs');
require('dotenv/config');
dotenv.config({path: './config/config.env'})
app.use(bodyParser.urlencoded({ extender: true }));
//Monogoose para usar base de datos
const mongoose = require("mongoose");
//Conexion a base de datos en MongoDB a traves de URL del cluster
mongoose.connect("mongodb+srv://Demian:57008345@cluster0.twupy.mongodb.net/ADA?retryWrites=true&w=majority", { useNewUrlParser: true })


app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));


const PORT = process.env.PORT || 5000

//Inicio de servidor en puerto default
app.listen(
	PORT,
	console.log(`Servidor corriendo en el modo de: ${process.env.NODE_ENV} en el peurto ${PORT}`)
)
//Schema para los usuarios
const UsuarioSchema = {
	nombre: String,
	correo: String,
	contrasena: String
}

//Ir a pagina de inicio
app.get("/", function (req, res) {
	res.render('index')
	
})
/* Redireccionamiento de las demas vistas (Modulos del sistema)*/
app.get("/perfil", function (req, res) {
	res.render('perfil')
	
})
app.get("/conferencias", function (req, res) {
	res.render('conferencias')
})
app.get("/eventos", function (req, res) {
	res.render('eventos')
})
app.get("/nosotrxs", function (req, res) {
	res.render('nosotrxs')
})

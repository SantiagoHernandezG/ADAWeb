//Uso de librerias para ejecutar express js y poder leer req.body de los inputs
const express = require("express");
var path = require('path');
const app = express();
var bodyParser = require("body-parser");
const ejs = require('ejs');
app.set('view engine', 'ejs');
var assert = require('assert');
var fs = require('fs');
require('dotenv/config');
app.use(bodyParser.urlencoded({ extender: true }));


app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

//Inicio de servidor en puerto default
app.listen(3000, function () {
	console.log("Servidor corriendo en el puerto 3000");
    
})
//Ir a pagina de inicio
app.get("/", function (req, res) {
	res.render('index')
	
})
/* Redireccionamiento de las demas vistas*/
app.get("/instructivo", function (req, res) {
	res.render('instructivo')
	
})
app.get("/metodologia", function (req, res) {
	res.render('metodologia')
})
app.get("/matriz", function (req, res) {
	res.render('matriz')
})
app.get("/calculos", function (req, res) {
	res.render('calculos')
})

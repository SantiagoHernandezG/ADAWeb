//Uso de librerias para ejecutar express js y poder leer req.body de los inputs
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: './config/.env'})
var path = require('path');
var cookieParser = require('cookie-parser')

var indexRouter = require('./routes/index')
var eventosRouter = require('./routes/eventos')
var conferenciasRouter = require('./routes/conferencias')
var nosotrxsRouter = require('./routes/nosotrxs')
var perfilRouter = require('./routes/perfil')
var authRouter = require('./routes/auth')
var homeRouter = require('./routes/home')

const connectDB = require('./database/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
// const session = require('express-session')
const cookieSession = require('cookie-session')

//Conexion a base de datos en MongoDB a traves de URL del cluster
 connectDB()

 //Passport config
 require('./config/passport')(passport)

 
const app = express();

//Morgan
if(process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'))
}


//Sessions
/* app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
})) */
app.use(cookieSession({
	maxAge: 24 * 3600 * 1000,
	keys: ['keyboard cat']
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())


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
app.use('/auth', authRouter)
app.use('/logout', authRouter)
app.use('/home', homeRouter)


//Inicio de servidor en puerto default
app.listen(
	PORT,
	console.log(`Servidor corriendo en el modo de: ${process.env.NODE_ENV} en el puerto ${PORT}`)
)
//Schema para los usuarios

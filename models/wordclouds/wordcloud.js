const mongoose = require('mongoose')


//Schema para Wordclouds
const WordcloudSchema = new mongoose.Schema({
	descripcion: String,
	usuario:String,
})
module.exports = mongoose.model('Wordcloud', WordcloudSchema);

const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image:{
        nameImage: {
            type: String,
            required: true
        },
        imageData: {
            data: Buffer,
            contentType: String
        }
    }
})

module.exports = mongoose.model('Image', ImageSchema)
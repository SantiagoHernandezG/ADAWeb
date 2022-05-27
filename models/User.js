const mongoose = require('mongoose')
//import bcrypt from 'bcrypt'

const UserSchema  = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    firstName: {
        type: String,
        required: [true, 'El nombre es obligatorio']    },
    lastName: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio']
     },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.method.toString = function(){
    return `googleId: ${this.googleId}, displayName: ${this.displayName}, 
    firstName: ${this.firstName}, lastName: ${this.lastName}, image: ${this.image}, createdAt: ${this.createdAt}`
}

/*UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}
*/
UserSchema.statics.allUsers = function(cb){
    return this.find({}, cb)
}
module.exports = mongoose.model('User', UserSchema)
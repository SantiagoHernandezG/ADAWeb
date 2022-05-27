const mongoose = require('mongoose')
//import bcrypt from 'bcrypt'

const UserSchemaLoc  = new mongoose.Schema({
    displayName: {
        type: String,
    },
    firstName: {
        type: String,   
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
     },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


/*UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}
*/
UserSchemaLoc.statics.allUsers = function(cb){
    return this.find({}, cb)
}
module.exports = mongoose.model('UserLocal', UserSchemaLoc)
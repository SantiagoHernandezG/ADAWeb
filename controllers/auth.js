
const User = require('../models/User')

const bcrypt = require('bcrypt')



exports.user_post = async (req, res, next) => {
    let salt = 10
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(salt), null)
    const member ={
        displayName: req.body.displayName,
        email: req.body.username,
        password: hash
    }
    try{
        await User.create(member)
        console.log("hola")
        next()
    } catch (err){
        console.log(err)
        res.end()
    }
}



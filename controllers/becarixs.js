const User = require('../models/User')
const mailer = require('./apis/mailer')

exports.becarixs_get = async function  (req, res) {
    try{
       let becarixs = await User.find({position: "becarix"})
        res.render('./becarixs/becarixs',  { user: req.user, becarixs: becarixs })
    } catch (err){
        console.log(err)
    }
}

exports.becarix_delete_post = async function (req, res) {
    try{
        await User.findByIdAndRemove(req.body.becarixId)
        res.redirect("/becarixs")
    } catch (err){
        console.log(err)
    } 
}

exports.becarixs_correos_post = (req, res) => {
    console.log(req.body.emailUser)
    console.log(req.body.asunto)
    console.log(req.body.messageText)
     mailer.sendMail(req.body.emailUser, req.body.asunto, req.body.messageText).then(result => console.log("email sent...", result))
    res.redirect("/becarixs")

}
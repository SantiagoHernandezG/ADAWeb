const User = require('../models/User')

exports.becarixs_get = async function  (req, res) {
    console.log("hola becarixs")
    try{
       let becarixs = await User.find({position: "becarix"})
        res.render('./becarixs/becarixs',  { user: req.user, becarixs: becarixs })
    } catch (err){
        console.log(err)
    }
}

exports.becarix_delete_post = async function (req, res) {
    console.log("hola ", req.body.becarixId)
    try{
        await User.findByIdAndRemove(req.body.becarixId)
        res.redirect("/becarixs")

    } catch (err){
        console.log(err)

    }
    
}
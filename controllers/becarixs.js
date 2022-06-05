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
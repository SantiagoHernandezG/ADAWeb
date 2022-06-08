const User = require('../models/User')

exports.miembrxs_get = async function  (req, res) {
    try{
        let miembrxs = await User.find({position: "member"})
        res.render('./miembrxs/miembrxs',  { user: req.user, miembrxs: miembrxs })
    } catch (err) {
        console.log(err)
    }
}
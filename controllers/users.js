const usersCtrl = {};
const User = require('../models/UserLocal')

usersCtrl.signUp = async (req, res) => {
    const errors = []
    const {name, lastName, email, password} = req.body

    const emailUser = await User.findOne({email: email})
    if(emailUser){
        console.log("ERROR: email already in use")
        res.redirect('/eventos')
    }else {
        const newUser = new User({name, lastName, email, password})
        await newUser.save()
        res.redirect('/eventos')
    }
}

usersCtrl.logIn = (req, res) => {
    res.send('logIn')
}

usersCtrl.logOut = (req, res) => {
    res.send('logOut')
}

module.exports = usersCtrl